import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedPets from './FeaturedPets'
export const metadata: Metadata = {
    title: 'iTruth News Pets & Tips - Latest Advice, Reviews, and Insights for Pet Owners',
    description: 'Stay updated with iTruth News Pets & Tips - your trusted source for the latest news, expert advice, and in-depth reviews on pet care, training, and health. Explore comprehensive guides, pet product reviews, and useful tips for pet owners. Your go-to platform for staying informed about the best practices for keeping your pets happy and healthy.',
    keywords: 'pet news, pet care tips, pet product reviews, pet training advice, pet health, pet trends, pet owner tips, pet products, pet care'
};




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedPets/>
</SkeletonTheme>
<Footer/>
</>
)
}