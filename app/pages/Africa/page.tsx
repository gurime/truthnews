import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import FeaturedAfrica from './FeaturedAfrica'

export const metadata: Metadata = {
    title: 'iTruth News Africa - Latest Scandal Reports, Analyses, and Insights',
    description: 'Stay informed with iTruth News Africa - your reliable source for the latest scandal reports, analyses, and in-depth insights about Africa. Explore comprehensive coverage, timely updates, and accurate insights across various aspects of scandals in Africa. Your go-to platform for staying updated on the latest scandals and controversies in Africa.',
    keywords: 'Africa scandal news, latest Africa scandal reports, Africa scandal analyses, in-depth coverage Africa, timely updates Africa, accurate insights Africa, Africa controversies, breaking Africa scandals'
}




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedAfrica/>
</SkeletonTheme>
<Footer/>
</>
)
}