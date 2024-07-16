const express = require('express');
const { createCheckout, webhookControl } = require('../controllers/stripeController');

const router = express.Router();

router.post("/create-checkout-session", express.json(), createCheckout);

const stripe = require('stripe')(process.env.STRIPE_KEY);

// router.get('/payments', async (req, res) => {
//     const payments = await stripe.paymentIntents.list({
//         limit: 1,
//     });
//     console.log('paymeents', payments.data);

//     res.send({ data: payments.data });
// })

router.get('/invoices', express.json(), async (req, res) => {
    const items = await stripe.checkout.sessions.listLineItems(
        'cs_test_b1ief5HUdWW7CrnuSYscQRrMLdphegl5y1g57zWtYZXKiPNBd3vEu94Dwp'
    )
    console.log('line items:: ', items);
    res.send({ line_items: items });
})




router.post('/webhook', express.raw({ type: 'application/json' }), webhookControl);

module.exports = router;