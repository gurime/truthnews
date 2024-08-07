'use client';

import React, { useState, useCallback } from 'react';
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
import { BeatLoader } from 'react-spinners';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import axios from 'axios';
import adimg from '../../images/it.png'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = () => {
const stripe = useStripe();
const elements = useElements();
const [error, setError] = useState<string | null>(null);
const [processing, setProcessing] = useState(false);
const [paymentSuccess, setPaymentSuccess] = useState(false);
const [isCardComplete, setIsCardComplete] = useState(false);
const [selectedAmount, setSelectedAmount] = useState(2000); // Default to $20 (in cents)

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
<div className="contribute-box">
<div className='contribute-leftbox'>
<Image src={adimg} alt="iTruth News" width={200} height={100} />
<form onSubmit={handleSubmit}>
<div className="formbox">
<div className="payment-title">
<p style={{ fontSize: '20px', fontWeight: '600' }}>Payment Method</p>
<p>🔒 Secure Transaction</p>
</div>

<div className="amount-selector">
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
onClick={() => setSelectedAmount(7500)}
className={selectedAmount === 7500 ? 'selected' : ''}>
$75
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

<div className='contribute-rightbox'>
<h1>Support iTruth News</h1>
<p className='payment-title'>
At iTruth News, we strive to bring you accurate, unbiased, and up-to-date news from around the world. Your support helps us maintain our commitment to quality journalism. Consider making a contribution to help us continue providing the news that matters to you.
</p>

<p className='payment-title'><strong>Why Support Us?</strong></p>
<ul style={{ lineHeight: '2' }}>
<li>Stay informed with reliable news coverage</li>
<li>Help us keep journalism independent</li>
<li>Enable us to expand our coverage and reach</li>
</ul>
<p className='payment-title'>
Your contribution makes a big difference. Thank you for supporting iTruth News.
</p>
</div>
</div>
</>
);
};

const CheckoutPage = () => (
<Elements stripe={stripePromise}>
<CheckoutForm />
</Elements>
);

export default CheckoutPage;