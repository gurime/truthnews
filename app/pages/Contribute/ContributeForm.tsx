'use client'
import React, { useState } from 'react'
import contributeimg from '../../images/it.png'
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51La7zXAVGcVLfLzDnQXoCCuCoH526pDehI2lzLc23OXSSBiC8NRfHhCtC6l8sbu2CN0jXTzaHqVB884Hq2Frbi2L00uuHZ26te');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
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
            const response = await fetch('http://localhost:4000/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 2000 }), // Amount in cents ($20.00)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            if (!data.clientSecret) {
                throw new Error('No client secret received from the server');
            }
    
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });
    
            if (error) {
                throw error;
            } else if (paymentIntent.status === 'succeeded') {
                console.log('Payment successful!', paymentIntent);
            } else {
                throw new Error(`Unexpected payment intent status: ${paymentIntent.status}`);
            }
        } catch  {
            console.error('Payment error:');
            setError('An unknown error occurred');
        } finally {
            setProcessing(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='formbox'>
                <div className="payment-title">
                    <p style={{fontSize:'20px',fontWeight:'600'}}>Payment Method</p>
                    <p>🔒 Secure Transaction</p>
                </div>

                <CardElement />
                {error && <div >{error}
                    </div>}

                <button type="submit" disabled={!stripe || processing}>
                    Pay $20
                </button>
            </div>
        </form>
    );
}

export default function ContributeForm() {
    return (
        <div className='contribute-box'>
            <div className='contribute-leftbox'>
                <img src={contributeimg.src} alt="" />

                <div style={{
                    display: 'grid',
                    placeContent: 'center'
                }}>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>

            <div className='contribute-rightbox'>
                <h1> Support iTruthNews <br/> 
                in the fight for   <br/> 
                honest news </h1>
                <p style={{lineHeight:'1.8',fontSize:'15px',borderTop:'solid 1px gray'}}>  
                It's never been more critical to have high-quality, independent news that is inviting to everyone. <br/>
                To keep reporting in 2050, we'll need $1.05 million in funding.<br/> 
                Please consider donating to support iTruthNews.
                </p>
            </div>
        </div>
    )
}
