import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedTerrorism from './FeaturedTerrorism'

export const metadata: Metadata = {
    title: 'iTruth News Terrorism - Latest Trends, Insights, and Analysis',
    description: 'Stay informed with iTruth News Terrorism - your reliable source for the latest trends, insightful analyses, and in-depth coverage of terrorism-related news. Explore comprehensive reports, timely updates, and accurate insights into various aspects of terrorism. Your go-to platform for staying updated on terrorism news.',
    keywords: 'terrorism news, latest terrorism trends, terrorism insights, in-depth coverage, timely updates, accurate insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedTerrorism/>
</SkeletonTheme>
<Footer/>
</>
)
}