import AdminHeader from '@/app/components/AdminHeader';
import React from 'react'
import { Metadata } from 'next';
import AdminForm from './AdminForm';


export const metadata: Metadata = {
  title: 'iTruth News - Admin',
  
};



export default function page() {
return (
<>
<AdminHeader/>
<AdminForm/>
</>
)
}