import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import React from 'react'
import AdvertiseForm from './AdvertiseForm'


export const metadata: Metadata = {
    title: 'iTruth News - Advertise',
    description: 'Promote your work effectively with iTruth News. Explore tailored advertising solutions, reaching a diverse audience with precision. Your gateway to showcasing your offerings, backed by accurate insights and timely exposure opportunities.',
    keywords: 'advertise, advertising solutions, diverse audience, precision marketing, showcase offerings, accurate insights, exposure opportunities'
  }

export default function page() {
return (
<>
<Navbar/>
<AdvertiseForm/>
<Footer/>
</>
)
}
