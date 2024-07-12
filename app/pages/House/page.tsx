import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedHouse from './FeaturedHouse'
export const metadata: Metadata = {
    title: 'iTruth News Homes & Houses - Latest News, Reviews, and Insights',
    description: 'Stay updated with iTruth News Homes & Houses - your trusted source for the latest news, expert reviews, and in-depth analysis of homes, houses, and real estate. Explore comprehensive reports, industry updates, and accurate insights into home designs, property trends, and real estate markets. Your go-to platform for staying informed about the world of homes and houses.',
    keywords: 'home news, house news, real estate reviews, property reviews, home design, housing trends, real estate market, property insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedHouse/>
</SkeletonTheme>
<Footer/>
</>
)
}