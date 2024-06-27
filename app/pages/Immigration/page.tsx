import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedImmigration from './FeaturedImmigration'

export const metadata: Metadata = {
    title: 'iTruth News Immigration - Latest Updates, Policies, and Insights',
    description: 'Stay informed with iTruth News Immigration - your reliable source for the latest updates on immigration policies, insightful analyses, and in-depth coverage. Explore comprehensive reports, timely updates, and accurate insights into various aspects of immigration. Your go-to platform for staying updated on immigration news.',
    keywords: 'immigration news, latest immigration updates, immigration policies, insightful analyses, in-depth coverage, timely updates, accurate insights'
}



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedImmigration/>
</SkeletonTheme>
<Footer/>
</>
)
}