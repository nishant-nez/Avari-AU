const { reject } = require("bcrypt/promises");
const pool = require("../config/db");
const queries = require("../config/queries");
const { rows } = require("pg/lib/defaults");
const sendMail = require("../config/sendMail");

const stripe = require('stripe')(process.env.STRIPE_KEY);


//@desc Create Stripe Checkout Page
//@route POST /api/checkout/create-checkout-session
//@access public
const createCheckout = async (req, res) => {
    const { rows } = await pool.query(queries.getDeliveryFee);
    const deliveryFee = rows[0].delivery_fee;
    const line_items = req.body.cart.map((item) => {
        const imageUrl = `${ process.env.BACKEND_URL }/${ item.image }`;
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [imageUrl],
                    description: item.description,
                    metadata: {
                        id: item.id,
                        unit: item.unit,
                        vendor_id: item.vendor.id,
                    }
                },
                unit_amount: parseInt(item.price * 100),
            },
            quantity: item.amount,
        };
    });

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['AU'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: (deliveryFee * 100) || 1000,
                        currency: 'usd',
                    },
                    display_name: 'Standard shipping',
                }
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        mode: 'payment',
        success_url: `${ process.env.FRONTEND_URL }/checkout-success`,
        cancel_url: `${ process.env.FRONTEND_URL }/checkout-cancel`,
    });

    res.send({ url: session.url })
};




const webhookControl = async (req, res) => {
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
        console.log('Error constructing Stripe event:', error);
        return res.status(400).json({ success: false, message: error.message });
    }

    if (event.type === 'checkout.session.completed') {
        const sessionId = event.data.object.id;

        try {
            const items = await stripe.checkout.sessions.listLineItems(sessionId);

            const stripe_id = sessionId;
            const amount_subtotal = parseFloat(event.data.object.amount_subtotal) / 100;
            const amount_total = parseFloat(event.data.object.amount_total) / 100;
            const city = event.data.object.customer_details.address.city;
            const country = event.data.object.customer_details.address.country;
            const address_line_1 = event.data.object.customer_details.address.line1;
            const address_line_2 = event.data.object.customer_details.address.line2;
            const postal_code = event.data.object.customer_details.address.postal_code;
            const state = event.data.object.customer_details.address.state;
            const name = event.data.object.customer_details.name;
            const email = event.data.object.customer_details.email;
            const phone = event.data.object.customer_details.phone;
            const currency = event.data.object.currency;
            const shipping_cost = parseFloat(event.data.object.shipping_cost.amount_subtotal) / 100;
            const status = 'To be delivered';

            pool.query(
                queries.addOrder,
                [stripe_id, amount_subtotal, amount_total, city, country, address_line_1, address_line_2, postal_code, state, name, email, phone, currency, shipping_cost, status],
                async (error, results) => {
                    if (error) {
                        console.log('Error adding order to database:', error);
                        return res.status(500).json({ message: "Internal server error" });
                    }

                    if (!results || !results.rows || results.rows.length === 0) {
                        console.log('No order was added to the database.');
                        return res.status(500).json({ message: "Failed to add order to database" });
                    }

                    const order_id = results.rows[0].id;

                    const itemInsertPromises = items.data.map((item) => {
                        const quantity = item.quantity;
                        const price = parseFloat(item.price.unit_amount) / 100;
                        const name = item.description;

                        return new Promise((resolve, reject) => {
                            pool.query(
                                queries.getProductByPriceName,
                                [price, name],
                                (error, results) => {
                                    if (error) return reject(error);

                                    if (!results || !results.rows || results.rows.length === 0) {
                                        console.log(`No product found for price: ${ price }, name: ${ name }`);
                                        return reject(new Error(`Product not found for price: ${ price }, name: ${ name }`));
                                    }

                                    const product_id = results.rows[0].id;

                                    pool.query(
                                        queries.addOrderItem,
                                        [order_id, product_id, quantity],
                                        (error, results) => {
                                            if (error) return reject(error);

                                            pool.query(
                                                queries.reduceStock,
                                                [quantity, product_id],
                                                (error, results) => {
                                                    if (error) return reject(error);
                                                    resolve();
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        });
                    });

                    try {
                        await Promise.all(itemInsertPromises);

                        pool.query(queries.getOrderById, [order_id], (error, results) => {
                            if (error) {
                                console.error('Error retrieving order by ID:', error);
                                return res.status(500).json({ message: "Internal server error" });
                            }

                            if (!results || !results.rows || results.rows.length === 0) {
                                console.log(`Order not found with ID: ${ order_id }`);
                                return res.status(500).json({ message: `Order not found with ID: ${ order_id }` });
                            }

                            const order = results.rows[0];

                            // send emails
                            sendMail(order);

                            res.json({ success: true });
                        });
                    } catch (error) {
                        console.error('Error in adding to order_items table', error);
                        res.status(500).json({ message: "Internal server error" });
                    }
                }
            );
        } catch (error) {
            console.error('Error processing checkout session:', error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.json({ success: true });
    }
};





module.exports = { createCheckout, webhookControl };