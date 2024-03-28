import AdminHeader from '@/app/components/AdminHeader'
import React from 'react'
import LoginForm from './LoginForm'


export const metadata = {
    title: 'itruth News - AdminLogin',
    description: 'Discover your dream home with Gracious Crossing, where elegance meets comfort. Explore a variety of exquisite properties and find the perfect place to call home.',
    keywords: ['real estate', 'homes for sale', 'property listings', 'luxury homes', 'homebuying'],
    author: 'Phillip bailey',
    
  };


export default function page() {
return (
<>
<AdminHeader/>
<LoginForm/>
</>
)
}