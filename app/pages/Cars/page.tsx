import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedCars from './FaeturedCars'
export const metadata: Metadata = {
    title: 'iTruth News Cars & Trucks - Latest News, Reviews, and Insights',
    description: 'Stay updated with iTruth News Cars & Trucks - your trusted source for the latest automotive news, expert reviews, and in-depth analysis of cars and trucks. Explore comprehensive reports, industry updates, and accurate insights into vehicle models, technologies, and trends. Your go-to platform for staying informed about the world of automobiles.',
    keywords: 'car news, truck news, automotive reviews, vehicle reviews, car technology, truck technology, automotive trends, vehicle industry insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedCars/>
</SkeletonTheme>
<Footer/>
</>
)
}