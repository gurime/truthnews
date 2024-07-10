'use client'
import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'

import { v4 as uuidv4 } from 'uuid';


// Assuming adimg is imported correctly
import adimg from '../../images/adimg.jpeg'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const PaymentForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
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
        const { data } = await axios.post('/api/adcheckout/', { amount: 2000 }, {
          headers: { 'Content-Type': 'application/json' }
        });
      
        const { clientSecret } = data;
        if (!clientSecret) {
          throw new Error('No client secret received from the server');
        }
      
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement }
        });
      
        if (stripeError) {
          setError(stripeError.message || 'An error occurred during payment processing');
        } else if (paymentIntent?.status === 'succeeded') {
          setPaymentSuccess(true);
          
          // Generate a unique token
          const accessToken = uuidv4();
          
          // Store the token in localStorage with an expiration time
          const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour from now
          localStorage.setItem('articleSubmissionToken', JSON.stringify({
            token: accessToken,
            expiration: expirationTime
          }));
          
          // Redirect to the article submission page with the token
          router.push(`/pages/AdvertiseAdmin?token=${accessToken}`);
        } else {
          setError(`Unexpected payment intent status: ${paymentIntent?.status}`);
        }
      } catch (error) {
        console.error('Payment error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setProcessing(false);
      }
    }, [stripe, elements, router]);
const handleChange = (event: { complete: boolean }) => {
setIsCardComplete(event.complete)
}

  return (
<div className="advertise-form">
<div className="form-header">
<h3>Sponsored Work</h3>
</div>

<div className="adbox">
<Image src={adimg} alt="Advertisement" />
</div>

<div className="form-subheader"></div>
      
<p className="price">$20 for 1 week</p>
<p className="description">
Get your work to the front of the page.<br/>
Itruth News will feature your work on the front page of our<br/>
website for a fee.
</p>

<form className='formbox' onSubmit={handleSubmit}>
<div className="payment-title">
<p>Payment Method</p>
<p>🔒Secure Transaction</p>
</div>

<CardElement
options={{
style: {
base: {
fontSize: '16px',
color: '#424770',
'::placeholder': { color: '#aab7c4' },
},
invalid: { color: '#9e2146' },
},
}}
onChange={handleChange}
/>
<button type="submit" disabled={!stripe || processing || !setIsCardComplete}>
{processing ? <BeatLoader color={"#ffffff"} loading={processing} size={10} /> : 'Pay $10'}
</button>  
{paymentSuccess && <p className="success-message">Thank you for your donation!</p>}
{error && <div className="error-message" role="alert">{error}</div>}
</form>
</div>
  )
}

const AdvertiseForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
)

export default AdvertiseForm

function setIsCardComplete(complete: boolean) {
    throw new Error('Function not implemented.')
}
