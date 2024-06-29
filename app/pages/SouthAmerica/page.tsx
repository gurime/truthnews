import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedSouthAmerica from './FeaturedSouthAmerica'

export const metadata: Metadata = {
    title: 'iTruth News South America - Latest Scandal Reports, Analyses, and Insights',
    description: 'Stay informed with iTruth News South America - your reliable source for the latest scandal reports, analyses, and in-depth insights about South America. Explore comprehensive coverage, timely updates, and accurate insights across various aspects of scandals in South America. Your go-to platform for staying updated on the latest scandals and controversies in South America.',
    keywords: 'South America scandal news, latest South America scandal reports, South America scandal analyses, in-depth coverage South America, timely updates South America, accurate insights South America, South America controversies, breaking South America scandals'
}




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedSouthAmerica/>
</SkeletonTheme>
<Footer/>
</>
)
}