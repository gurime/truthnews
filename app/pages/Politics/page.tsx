import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import FeaturedPolitics from './FeaturedPolitics'
import { SkeletonTheme } from 'react-loading-skeleton'
export const metadata: Metadata = {
    title: 'iTruth Politics - Latest Political News, Analysis, and Commentary',
    description: 'Stay informed with iTruth Politics - your reliable source for the latest political news, analysis, and commentary. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of political topics. Your go-to platform for staying ahead in the ever-changing landscape of politics.',
    keywords: 'political news, latest political updates, political analysis, political commentary, in-depth analyses, timely coverage, accurate insights, current affairs, political trends'
  }
  

export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
<FeaturedPolitics/>
</SkeletonTheme>
<Footer/>
</>
)
}
