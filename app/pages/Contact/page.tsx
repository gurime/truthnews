
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import React from 'react'
import ContactForm from './Contact'



export const metadata: Metadata = {
title: 'iTruth News - Contact',
description: 'Connect with iTruth News for seamless communication. Reach out effortlessly to our team, inquire about partnerships, or share your feedback. Your bridge to establishing a direct line with iTruth News, ensuring your queries are met with prompt and attentive responses.',
keywords: 'contact, communication, partnerships, feedback, direct line, prompt responses, attentive support'
}


  

export default function Contact() {
return (
<>
<Navbar/>
<ContactForm/>
<Footer/>
</>
)
}