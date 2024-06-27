import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedBusiness from './FeaturedBuisness'
import { Metadata } from 'next'

const metadata: Metadata = {
    title: 'iTruth News Business - Latest Trends, Insights, and Analysis',
    description: 'Stay informed with iTruth News Business - your reliable source for the latest trends, insightful analyses, and in-depth coverage of business news. Explore comprehensive reports, timely updates, and accurate insights into various aspects of the business world. Your go-to platform for staying updated on business news.',
    keywords: 'business news, latest business trends, business insights, in-depth coverage, timely updates, accurate insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedBusiness/>
</SkeletonTheme>
<Footer/>
</>
)
}