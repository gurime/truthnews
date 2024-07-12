import React from 'react'
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import AdminHeader from '@/app/components/AdminHeader'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Metadata } from 'next'
import FeaturedFitness from './FeaturedFitness'
export const metadata: Metadata = {
    title: 'iTruth News Fitness & Well-being - Latest Advice, Reviews, and Insights for a Healthy Lifestyle',
    description: 'Stay updated with iTruth News Fitness & Well-being - your trusted source for the latest news, expert advice, and in-depth reviews on fitness, wellness, and healthy living. Explore comprehensive guides, fitness product reviews, workout tips, and strategies for maintaining a balanced and healthy lifestyle. Your go-to platform for staying informed about the best practices for achieving your fitness and well-being goals.',
    keywords: 'fitness news, well-being tips, workout advice, fitness product reviews, healthy living, wellness trends, exercise routines, fitness goals, health and wellness'
};




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">

<FeaturedFitness/>
</SkeletonTheme>
<Footer/>
</>
)
}