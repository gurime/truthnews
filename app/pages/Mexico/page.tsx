import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedMexico from './FeaturedMexico'

export const metadata: Metadata = {
    title: 'iTruth News Mexico - Latest Scandal Reports, Analyses, and Insights',
    description: 'Stay informed with iTruth News Mexico - your reliable source for the latest scandal reports, analyses, and in-depth insights about Mexico. Explore comprehensive coverage, timely updates, and accurate insights across various aspects of scandals in Mexico. Your go-to platform for staying updated on the latest scandals and controversies in Mexico.',
    keywords: 'Mexico scandal news, latest Mexico scandal reports, Mexico scandal analyses, in-depth coverage Mexico, timely updates Mexico, accurate insights Mexico, Mexico controversies, breaking Mexico scandals'
}




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedMexico/>
</SkeletonTheme>
<Footer/>
</>
)
}