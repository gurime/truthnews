import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'


export const metadata: Metadata = {
    title: 'iTruth Sports - Latest Sports News, Analysis, and Highlights',
    description: 'Stay updated with iTruth Sports - your reliable source for the latest sports news, analysis, and highlights. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of sports. Your go-to platform for staying ahead in the dynamic world of sports.',
    keywords: 'sports news, latest sports updates, sports analysis, sports highlights, in-depth analyses, timely coverage, accurate insights, sports events, sports trends'
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
