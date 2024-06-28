import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedVideoGames from './FeaturedVideoGames'

const metadata: Metadata = {
    title: 'iTruth News Video Games - Latest Trends, Insights, and Analysis',
    description: 'Stay informed with iTruth News Video Games - your reliable source for the latest trends, insightful analyses, and in-depth coverage of video game news. Explore comprehensive reports, timely updates, and accurate insights into various aspects of the gaming world. Your go-to platform for staying updated on video game news.',
    keywords: 'video game news, latest gaming trends, gaming insights, in-depth coverage, timely updates, accurate insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
<FeaturedVideoGames/>
</SkeletonTheme>
<Footer/>
</>
)
}