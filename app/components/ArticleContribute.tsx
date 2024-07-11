"use client";

import React, { useState, useCallback } from 'react';
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
import { BeatLoader } from 'react-spinners';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

interface ArticleContributeProps {
    articleId: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ArticleContributeForm: React.FC<ArticleContributeProps> = ({ articleId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(1000); // Default to $20 (in cents)

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
            const { data } = await axios.post('/api/checkout/', {
                amount: selectedAmount  // Use the selected amount
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const { clientSecret } = data;
            if (!clientSecret) {
                throw new Error('No client secret received from the server');
            }

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message || 'An error occurred during payment processing');
            } else if (paymentIntent?.status === 'succeeded') {
                setPaymentSuccess(true);
                setTimeout(() => setPaymentSuccess(false), 3000);
            } else {
                setError(`Unexpected payment intent status: ${paymentIntent?.status}`);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setProcessing(false);
        }
    }, [stripe, elements, selectedAmount]);

    const handleChange = (event: { complete: boolean | ((prevState: boolean) => boolean); }) => {
        setIsCardComplete(event.complete);
    };

return (
<>
<div style={{
border: "solid 1px",

}}>
<h1 style={{
borderBottom:'solid 1px',
padding:'0 1rem',
background:'#007bff',
color:'#fff'
}}>Support iTruth News</h1>

<div style={{
    padding:'2rem'
}}>At iTruth News, we believe that fiercely independent journalism shapes a fairer world. Without the influence of a billionaire owner, we report rigorously on world events, free from manipulation or external pressures.
Trustworthy information is essential for understanding the people, power, and politics shaping our world.

However, to continue this vital work, we rely on the generosity of readers who can support us financially. <b>Please consider a one-time donation to support our vital work. Thank you.</b></div>


<div className="contribute-box">
<div className='contribute-leftbox'>
<form onSubmit={handleSubmit}>
<div className="formbox">
<div className="payment-title">
<p style={{ fontSize: '20px', fontWeight: '600' }}>Payment Method</p>
<p>🔒 Secure Transaction</p>
</div>

<div className="amount-selector">
<button 
type="button" 
onClick={() => setSelectedAmount(1000)}
className={selectedAmount === 1000 ? 'selected' : ''}>
$10
</button>
<button 
type="button" 
onClick={() => setSelectedAmount(2000)}
className={selectedAmount === 2000 ? 'selected' : ''}>
$20
</button>
<button 
type="button" 
onClick={() => setSelectedAmount(5000)}
className={selectedAmount === 5000 ? 'selected' : ''}>
$50
</button>
<button 
type="button" 
onClick={() => setSelectedAmount(6000)}
className={selectedAmount === 6000 ? 'selected' : ''}>
$60
</button>

<button 
type="button" 
onClick={() => setSelectedAmount(18000)}
className={selectedAmount === 18000 ? 'selected' : ''}>
$180
</button>

<button 
type="button" 
onClick={() => setSelectedAmount(24000)}
className={selectedAmount === 24000 ? 'selected' : ''}>
$240
</button>
</div>

<CardElement
options={{
style: {
base: {
fontSize: '16px',
color: '#424770',
'::placeholder': {
color: '#aab7c4',
},
},
invalid: {
color: '#9e2146',
},
},
}}
onChange={handleChange}/>

<button style={{backgroundColor:'#007bff'}} type="submit" disabled={!stripe || processing || !isCardComplete}>
{processing ? <BeatLoader color={"#ffffff"} loading={processing} size={10} /> : `Pay $${selectedAmount / 100}`}
</button>  

<p style={{ textAlign: 'center' }} aria-live="assertive">
{paymentSuccess ? 'Thank you for your Support!' : ''}
</p> 

<div role="alert" aria-live="assertive">
{error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
</div>
</div>
</form>
</div>
</div>
</div>
</>
)
}

const ArticleContribute: React.FC<ArticleContributeProps> = ({ articleId }) => (
<Elements stripe={stripePromise}>
<ArticleContributeForm articleId={articleId} />
</Elements>
);

export default ArticleContribute;
