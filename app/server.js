const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('sk_test_YourSecretKey'); // Use your actual secret key

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).send({ error: 'Invalid amount' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message || 'An error occurred while processing your request' });
    }
});
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
