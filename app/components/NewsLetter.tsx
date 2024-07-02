'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {BeatLoader} from 'react-spinners'
interface NewsletterProps {
    articleId: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ articleId }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // You can add any necessary logic here if needed
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        const auth = getAuth();
        if (!auth.currentUser) {
            setErrorMessage('Please sign in to subscribe');
            return;
        }

        try {
            setIsLoading(true);
            const db = getFirestore();
            await addDoc(collection(db, 'newsletter'), {
                timestamp: new Date(),
                userEmail: email,
                articleId: articleId,
            });

            setEmail('');
            setSuccessMessage('Thank you for subscribing!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage((error as Error).message || 'Error submitting form. Please try again.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="newsletter-signup">
            <h3>iTruthNews letter</h3>
            <form onSubmit={handleSubmit} className='formbox'>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 0', marginBottom: '10px' }}
                    autoFocus
                />
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px 0', backgroundColor: '#333', color: '#fff', border: 'none' }}
                    disabled={isLoading}
                >
                    {isLoading ? <BeatLoader color='blue' /> : 'Subscribe'}
                </button> 
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Newsletter;