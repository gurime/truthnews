import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedFamily from './FeaturedFamily'
export const metadata: Metadata = {
    title: 'iTruth News Family & Friends - Fitness, Well-being, and Tips for a Healthy Lifestyle Together',
    description: 'Discover iTruth News Family & Friends section for the latest updates on fitness, well-being, and tips for maintaining a healthy lifestyle with your loved ones. Get expert advice, comprehensive guides, and product reviews on fitness and wellness that you can share with family and friends. Explore strategies for achieving your fitness goals together and staying informed about the best practices for a balanced and healthy life.',
    keywords: 'family fitness, friends well-being, healthy lifestyle tips, fitness advice for families, wellness for friends, group exercise routines, fitness product reviews, health and well-being together'
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedFamily/>
</SkeletonTheme>
<Footer/>
</>
)
}