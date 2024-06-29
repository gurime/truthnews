import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedFashion from './FeaturedFashion'

export const metadata: Metadata = {
    title: 'iTruth News Fashion - Latest Trends, Insights, and Analysis',
    description: 'Stay informed with iTruth News Fashion - your reliable source for the latest trends, insightful analyses, and in-depth coverage of fashion news. Explore comprehensive reports, timely updates, and accurate insights into various aspects of the fashion world. Your go-to platform for staying updated on fashion news.',
    keywords: 'fashion news, latest fashion trends, fashion insights, in-depth coverage, timely updates, accurate insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedFashion/>
</SkeletonTheme>
<Footer/>
</>
)
}