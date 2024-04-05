import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import FeaturedDashboard from './FeaturedMusic'
import { SkeletonTheme } from 'react-loading-skeleton'

export const metadata: Metadata = {
    title: 'iTruth Music - Latest Music Releases, Artist News, and Reviews',
    description: 'Stay tuned with iTruth Music - your reliable source for the latest music releases, artist news, and reviews. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of music genres. Your go-to platform for staying ahead in the dynamic world of music.',
    keywords: 'music news, latest music releases, artist news, music reviews, in-depth analyses, timely coverage, accurate insights, music genres, music trends'
  }
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedDashboard/>
</SkeletonTheme>
<Footer/>
</>
)
}
