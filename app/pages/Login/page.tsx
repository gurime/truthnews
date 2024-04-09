import { Metadata } from 'next';
import React from 'react'
import LoginForm from './LoginForm';
import AdminHeader from '@/app/components/AdminHeader';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

export const Loginmeta: Metadata = {
title: 'iTruth News - Login',
description: 'Login to iTruth News - your reliable source for breaking news updates and the latest headlines. Stay informed with in-depth analyses, timely coverage, and accurate insights across a wide range of topics.',
keywords: 'iTruth News, login, breaking news, latest news headlines, news updates, in-depth analyses, timely coverage, accurate insights'
};
  
export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<LoginForm/>
<Footer/>
</>
)
}
