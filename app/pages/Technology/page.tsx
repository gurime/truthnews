import AdminHeader from '@/app/components/AdminHeader'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
    title: 'iTruth Technology - Latest Tech Updates, Innovations, and Insights',
    description: 'Stay informed with iTruth Technology - your reliable source for the latest tech updates, innovations, and insights. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of technology topics. Your go-to platform for staying ahead in the rapidly evolving world of technology.',
    keywords: 'technology news, latest tech updates, tech innovations, in-depth analyses, timely coverage, accurate insights, emerging technologies, tech trends'
  }
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<Footer/>
</>
)
}
