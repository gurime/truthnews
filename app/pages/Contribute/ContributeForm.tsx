'use client';

import React, { useState, useCallback } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { BeatLoader } from 'react-spinners';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Stripe has not been initialized');
            return;
        }

        setProcessing(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Card element not found');
            setProcessing(false);
            return;
        }

        try {
            console.log('Sending payment request:', { amount: 2000 });
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 2000 }),  // Replace with the actual amount
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Error response:', response.status, errorBody);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const { clientSecret } = await response.json();

            if (!clientSecret) {
                throw new Error('No client secret received from the server');
            }

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                throw stripeError;
            } else if (paymentIntent?.status === 'succeeded') {
                setPaymentSuccess(true);
                setTimeout(() => setPaymentSuccess(false), 3000); 
            } else {
                throw new Error(`Unexpected payment intent status: ${paymentIntent?.status}`);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setError('An error occurred during payment processing. Please try again.');
        } finally {
            setProcessing(false);
        }
    }, [stripe, elements]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="formbox">
                <div className="payment-title">
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>Payment Method</p>
                    <p>🔒 Secure Transaction</p>
                </div>

                <p style={{ textAlign: 'center' }} aria-live="assertive">
                    {paymentSuccess ? 'Thank you for your donation!' : ''}
                </p>

                {!paymentSuccess ? (
                    <>
                        <CardElement />
                        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                        <button type="submit" disabled={!stripe || processing}>
                            {processing ? <BeatLoader color={"#ffffff"} loading={processing} size={10} /> : 'Pay $20'}
                        </button>
                    </>
                ) : (
                    <p style={{ textAlign: 'center' }}>Thank you for your donation!</p>
                )}
            </div>
        </form>
    );
};

export default CheckoutForm;
