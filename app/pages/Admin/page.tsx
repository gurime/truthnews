import AdminHeader from '@/app/components/AdminHeader';
import React from 'react'
import { Metadata } from 'next';
import AdminForm from './AdminForm';


export const metadata: Metadata = {
  title: 'iTruth News - Admin Login',
  description: 'Stay updated with iTruth News, where truth meets clarity. Explore our comprehensive coverage of current events and dive deep into insightful analysis.',
  keywords: ['news', 'current events', 'journalism', 'truth', 'analysis'],
};



export default function page() {
return (
<>
<AdminHeader/>
<AdminForm/>
</>
)
}