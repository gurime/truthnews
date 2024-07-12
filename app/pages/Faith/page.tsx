import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedFaith from './FeaturedFaith'
export const metadata: Metadata = {
    title: 'iTruth News Faith & Religion - Inspiration, Spiritual Growth, and Community Support',
    description: 'Explore iTruth News Faith & Religion section for the latest updates on spiritual growth, inspirational content, and community support. Discover expert advice, meaningful articles, and resources for deepening your faith and building a supportive religious community. Find strategies for personal spiritual development, faith-based activities for families, and ways to connect with others who share your beliefs.',
    keywords: 'faith and religion, spiritual growth, religious community support, inspirational faith articles, faith-based activities, personal spiritual development, religious resources, faith-based community'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedFaith/>
</SkeletonTheme>
<Footer/>
</>
)
}