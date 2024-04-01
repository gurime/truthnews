import AdminHeader from '@/app/components/AdminHeader'
import React from 'react'
import LoginForm from './LoginForm'


export const metadata = {
    title: 'itruth News - Admin Login',
   
    
  };


export default function page() {
return (
<>
<AdminHeader/>
<LoginForm/>
</>
)
}