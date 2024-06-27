import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedMilitary from './FeaturedMilitary'

export const metadata: Metadata = {
    title: 'iTruth Military News - Latest Military Updates, Defense News, and Analysis',
    description: 'Stay informed with iTruth Military News - your reliable source for the latest military updates, defense news, and analysis. Explore in-depth reports, timely coverage, and accurate insights across global military affairs. Your go-to platform for staying ahead in the dynamic world of military and defense.',
    keywords: 'military news, latest military updates, defense news, military analysis, in-depth reports, timely coverage, accurate insights, global military affairs, defense trends'
}
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
<FeaturedMilitary/>
</SkeletonTheme>
<Footer/>
</>
)
}
