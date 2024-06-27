import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedEconomy from './FeaturedEconomy'

export const metadata: Metadata = {
    title: 'iTruth News Economy - Latest Economic Reports, Analyses, and Insights',
    description: 'Stay informed with iTruth News Economy - your reliable source for the latest economic reports, analyses, and in-depth insights. Explore comprehensive coverage, timely updates, and accurate insights across various aspects of the economy. Your go-to platform for staying updated in the field of economic news.',
    keywords: 'economy news, latest economic reports, economic analyses, in-depth coverage, timely updates, accurate insights, economic trends'
}



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedEconomy/>
</SkeletonTheme>
<Footer/>
</>
)
}