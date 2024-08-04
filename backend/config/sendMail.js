const nodemailer = require('nodemailer');

const signature = `
<p>
    <b>Gromi</b><br>
    Australia<br>
</p>
`

const generateTable = (order) => {
    const productRows = order.products.map(product => `
            <tr>
                <td>${ product.name }</td>
                <td>${ product.description }</td>
                <td>$${ product.price }</td>
                <td>${ product.unit }</td>
                <td>${ product.quantity }</td>
                <td>${ product.vendor.name }</td>
            </tr>
        `).join('');

    return `
            <h3>Order ID: ${ order.id }</h3>
            <p><strong>Customer Name:</strong> ${ order.name }</p>
            <p><strong>Email:</strong> ${ order.email }</p>
            <p><strong>Address:</strong> ${ order.address_line_1 }, ${ order.city }, ${ order.state }, ${ order.postal_code }, ${ order.country }</p>
            <p><strong>Total Subtotal:</strong> $${ order.amount_subtotal }</p>
            <p><strong>Shipping Cost:</strong> $${ order.shipping_cost }</p>
            <p><strong>Total Amount:</strong> $${ order.amount_total }</p>
            <p><strong>Status:</strong> ${ order.status }</p><br>
            <h4>Order Details:</h4><br>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Vendor</th>
                    </tr>
                </thead>
                <tbody>
                    ${ productRows }
                </tbody>
            </table>
            <p>Order placed on ${ new Date(order.created_at).toISOString().slice(0, 16).replace('T', ' ') }</p>
            <br>
            ${ signature }
        `;
};

const generateVendorTable = (order, vendorId) => {
    const filteredProducts = order.products.filter(product => product.vendor.id === vendorId);

    if (filteredProducts.length === 0) {
        return '';
    }

    const productRows = filteredProducts.map(product => `
            <tr>
                <td>${ product.name }</td>
                <td>${ product.description }</td>
                <td>$${ product.price }</td>
                <td>${ product.unit }</td>
                <td>${ product.quantity }</td>
            </tr>
        `).join('');

    return `
            <p><strong>Customer Name:</strong> ${ order.name }</p>
            <p><strong>Email:</strong> ${ order.email }</p>
            <p><strong>Address:</strong> ${ order.address_line_1 }, ${ order.city }, ${ order.state }, ${ order.postal_code }, ${ order.country }</p>
            <p><strong>Status:</strong> ${ order.status }</p><br>
            <h4>Order Details:</h4><br>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    ${ productRows }
                </tbody>
            </table>
            <p>Order placed on ${ new Date(order.created_at).toISOString().slice(0, 16).replace('T', ' ') }</p>
            <br>
            ${ signature }
        `;
};

const sendMail = (data, callback) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Send to admin
    const adminMailOptions = {
        from: `Gromi <${ process.env.EMAIL_ALIAS }>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Order Placed',
        html: '<p>Admin,</p><br/>' + generateTable(data)
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
        if (error) {
            console.log(error);
            // callback(error, null);
        } else {
            console.log("Admin Email sent: ", info.response);
            // callback(null, info.response);
        }
    });

    // send to customer
    const customerMailOptions = {
        from: `Gromi <${ process.env.EMAIL_ALIAS }>`,
        to: data.email,
        subject: 'New Order Placed',
        html: `<p>Dear ${ data.name },</p><br/>` + generateTable(data)
    };

    transporter.sendMail(customerMailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Customer Email sent: ", info.response);
        }
    });


    // Send to vendors
    const vendorEmails = {};

    data.products.forEach(product => {
        const vendorId = product.vendor.id;
        const vendorEmail = product.vendor.email;

        if (!vendorEmails[vendorId]) {
            vendorEmails[vendorId] = {
                email: vendorEmail,
                order: data
            };
        }
    });

    for (const vendorId in vendorEmails) {
        const vendorData = vendorEmails[vendorId];
        const vendorOrderContent = generateVendorTable(vendorData.order, Number(vendorId));

        const vendorMailOptions = {
            from: `Gromi <${ process.env.EMAIL_ALIAS }>`,
            // development
            // to: vendorData.email,
            // to: process.env.ADMIN_EMAIL,
            to: process.env.NODE_ENV === 'production' ? process.env.ADMIN_EMAIL : vendorData.email,
            subject: 'New Order Placed From Your Store',
            html: `<p>Dear ${ vendorData.name },</p><br/>` + vendorOrderContent
        };

        transporter.sendMail(vendorMailOptions, (error, info) => {
            if (error) {
                console.log(`Error sending email to vendor ${ vendorId }: `, error);
            } else {
                console.log(`Vendor Email sent to ${ vendorData.email }: `, info.response);
            }
        });

        // callback(null, 'email sent');
    }

    return
};

module.exports = sendMail;
