import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedUN from './FeaturedUN'

export const metadata: Metadata = {
    title: 'iTruth News United Nations - Latest Trends, Insights, and Analysis',
    description: 'Stay informed with iTruth News United Nations - your reliable source for the latest trends, insightful analyses, and in-depth coverage of UN news. Explore comprehensive reports, timely updates, and accurate insights into various aspects of the United Nations. Your go-to platform for staying updated on UN news.',
    keywords: 'United Nations news, latest UN trends, UN insights, in-depth coverage, timely updates, accurate insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedUN/>
</SkeletonTheme>
<Footer/>
</>
)
}