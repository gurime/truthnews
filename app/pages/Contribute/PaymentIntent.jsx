import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-08-01',  // Ensure you have the correct Stripe API version
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { amount } = req.body;

            if (typeof amount !== 'number') {
                return res.status(400).json({ error: 'Amount must be a number' });
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',  // Change to the desired currency
                payment_method_types: ['card'],
            });

            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
            res.status(500).json({ error: 'An error occurred while creating the PaymentIntent' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}