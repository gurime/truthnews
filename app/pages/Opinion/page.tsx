import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import FeaturedOpinion from './FeaturedOpinion'
import { SkeletonTheme } from 'react-loading-skeleton'


export const metadata: Metadata = {
    title: 'iTruth News Opinion - Thoughtful Perspectives and Commentary on Current Affairs',
    description: 'Explore iTruth Opinion for thoughtful perspectives and commentary on current affairs. Delve into insightful analyses, diverse viewpoints, and thought-provoking discussions on a wide range of topics. Your go-to platform for gaining deeper insights and fostering constructive dialogue.',
    keywords: 'opinion pieces, current affairs commentary, insightful analyses, diverse viewpoints, thought-provoking discussions, opinion articles, thought leadership'
  }
  

export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
<FeaturedOpinion/>
</SkeletonTheme>
<Footer/>
</>
)
}
