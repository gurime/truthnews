import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedCrime from './FeaturedCrime'

export const metadata: Metadata = {
    title: 'iTruth News Crime - Latest Crime Reports, Investigations, and Analyses',
    description: 'Stay informed with iTruth News Crime - your reliable source for the latest crime reports, investigations, and in-depth analyses. Explore comprehensive coverage, timely updates, and accurate insights across various types of crime. Your go-to platform for staying updated in the field of crime news.',
    keywords: 'crime news, latest crime reports, investigations, crime analyses, in-depth coverage, timely updates, accurate insights, crime trends'
}

  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedCrime/>
</SkeletonTheme>
<Footer/>
</>
)
}