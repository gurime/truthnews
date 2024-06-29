import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedEurope from './FeaturedEurope'

export const metadata: Metadata = {
    title: 'iTruth News Europe - Latest Scandal Reports, Analyses, and Insights',
    description: 'Stay informed with iTruth News Europe - your reliable source for the latest scandal reports, analyses, and in-depth insights about Europe. Explore comprehensive coverage, timely updates, and accurate insights across various aspects of scandals in Europe. Your go-to platform for staying updated on the latest scandals and controversies in Europe.',
    keywords: 'Europe scandal news, latest Europe scandal reports, Europe scandal analyses, in-depth coverage Europe, timely updates Europe, accurate insights Europe, Europe controversies, breaking Europe scandals'
}




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedEurope/>
</SkeletonTheme>
<Footer/>
</>
)
}