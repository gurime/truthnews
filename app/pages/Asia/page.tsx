import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedAsia from './FeaturedAsia'

export const metadata: Metadata = {
    title: 'iTruth News Asia - Latest Scandal Reports, Analyses, and Insights',
    description: 'Stay informed with iTruth News Asia - your reliable source for the latest scandal reports, analyses, and in-depth insights about Asia. Explore comprehensive coverage, timely updates, and accurate insights across various aspects of scandals in Asia. Your go-to platform for staying updated on the latest scandals and controversies in Asia.',
    keywords: 'Asia scandal news, latest Asia scandal reports, Asia scandal analyses, in-depth coverage Asia, timely updates Asia, accurate insights Asia, Asia controversies, breaking Asia scandals'
}




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedAsia/>
</SkeletonTheme>
<Footer/>
</>
)
}