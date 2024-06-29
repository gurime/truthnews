import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedEntertainment from './FeaturedEntertainment'

export const metadata: Metadata = {
    title: 'iTruth News Entertainment - Latest Trends, Insights, and Analysis',
    description: 'Stay informed with iTruth News Entertainment - your reliable source for the latest trends, insightful analyses, and in-depth coverage of entertainment news. Explore comprehensive reports, timely updates, and accurate insights into various aspects of the entertainment world. Your go-to platform for staying updated on entertainment news.',
    keywords: 'entertainment news, latest entertainment trends, entertainment insights, in-depth coverage, timely updates, accurate insights'
};


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedEntertainment/>
</SkeletonTheme>
<Footer/>
</>
)
}