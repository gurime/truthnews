import React from 'react'
import Success from './Success'
import { Metadata } from 'next'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'


export const metadata: Metadata = {
    title: 'iTruth News - Success',
    description: 'Your message has been successfully sent to iTruth News. Connect with us for seamless communication. Whether you have inquiries about partnerships or want to share your feedback, our team is here to help. Expect prompt and attentive responses as we strive to address your queries efficiently.',
    keywords: 'contact success, communication, partnerships, feedback, prompt responses, attentive support'
  }
  





export default function page() {
return (
<>
<Navbar/>
<Success/>
<Footer/>
</>
)
}