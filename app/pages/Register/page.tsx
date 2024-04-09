import { Metadata } from 'next';
import React from 'react'
import AdminHeader from '@/app/components/AdminHeader';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import RegisterForm from './RegisterForm';

export const meta: Metadata = {
    title: 'iTruth News - Register',
    description: 'Sign up for iTruth News - your reliable source for breaking news updates and the latest headlines. Stay informed with in-depth analyses, timely coverage, and accurate insights across a wide range of topics.',
    keywords: 'iTruth News, register, breaking news, latest news headlines, news updates, in-depth analyses, timely coverage, accurate insights'
  };
  



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<RegisterForm/>
<Footer/>
</>
)
}
