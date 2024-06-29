import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedScandals from './FeaturedScandals'

export const metadata: Metadata = {
    title: 'iTruth News Scandals - Latest Scandal Reports, Analyses, and Insights',
    description: 'Stay informed with iTruth News Scandals - your reliable source for the latest scandal reports, analyses, and in-depth insights. Explore comprehensive coverage, timely updates, and accurate insights across various aspects of scandals. Your go-to platform for staying updated on the latest scandals and controversies.',
    keywords: 'scandal news, latest scandal reports, scandal analyses, in-depth coverage, timely updates, accurate insights, controversies, breaking scandals'
}




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedScandals/>
</SkeletonTheme>
<Footer/>
</>
)
}