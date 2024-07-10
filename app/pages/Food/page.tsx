import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedFood from './FeaturedFood'
export const metadata: Metadata = {
    title: 'iTruth News Food & Drinks - Latest Trends, Reviews, and Insights',
    description: 'Stay informed with iTruth News Food & Drinks - your reliable source for the latest culinary trends, expert reviews, and in-depth coverage of the food and beverage world. Explore comprehensive reports, timely updates, and accurate insights into restaurants, recipes, beverages, and more. Your go-to platform for staying updated on food and drink news.',
    keywords: 'food news, latest culinary trends, food reviews, drink reviews, restaurant reviews, food recipes, beverage trends, food and drink insights'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedFood/>
</SkeletonTheme>
<Footer/>
</>
)
}