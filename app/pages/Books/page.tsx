import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedBooks from './FeaturedBooks'
export const metadata: Metadata = {
    title: 'iTruth News Books & Literature - Reviews, Recommendations, and Literary Insights',
    description: 'Explore iTruth News Books & Literature section for the latest book reviews, reading recommendations, and literary insights. Discover expert analyses, engaging book discussions, and resources for book lovers. Find reviews of new releases, classic literature, and hidden gems, along with recommendations for expanding your reading list and deepening your appreciation for literature.',
    keywords: 'book reviews, literature analysis, reading recommendations, new book releases, classic literature, book discussions, literary insights, reading list, book lovers'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedBooks/>
</SkeletonTheme>
<Footer/>
</>
)
}