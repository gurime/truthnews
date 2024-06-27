import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedSports from './FeaturedSports'


export const metadata: Metadata = {
    title: 'iTruth News Sports - Latest Sports News, Analysis, and Highlights',
    description: 'Stay updated with iTruth Sports - your reliable source for the latest sports news, analysis, and highlights. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of sports. Your go-to platform for staying ahead in the dynamic world of sports.',
    keywords: 'sports news, latest sports updates, sports analysis, sports highlights, in-depth analyses, timely coverage, accurate insights, sports events, sports trends'
  }
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedSports/>
</SkeletonTheme>
<Footer/>
</>
)
}
