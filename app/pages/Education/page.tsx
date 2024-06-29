import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedEducation from './FeaturedEducation'
export const metadata: Metadata = {
    title: 'iTruth News Education - Latest Trends, Insights, and Analysis',
    description: 'Stay informed with iTruth News Education - your reliable source for the latest trends, insightful analyses, and in-depth coverage of education news. Explore comprehensive reports, timely updates, and accurate insights into various aspects of the education world. Your go-to platform for staying updated on education news.',
    keywords: 'education news, latest education trends, education insights, in-depth coverage, timely updates, accurate insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedEducation/>
</SkeletonTheme>
<Footer/>
</>
)
}