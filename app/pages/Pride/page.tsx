import AdminHeader from "@/app/components/AdminHeader";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { Metadata } from "next";
import { SkeletonTheme } from "react-loading-skeleton";
import FeaturedPride from "./FeaturedPride";




export const metadata : Metadata = {
    title: 'iTruth News - Pride, LGBTQ+ News, and Stories',
    description: 'Celebrate Pride with iTruth News - your reliable source for updates on Pride Month events, LGBTQ+ news, and inspiring stories. Explore in-depth analyses, timely coverage, and accurate insights on LGBTQ+ issues and celebrations. Your go-to platform for staying informed and celebrating diversity and inclusion.',
    keywords: 'Pride Month, LGBTQ+ news, Pride events, in-depth analyses, timely coverage, accurate insights, LGBTQ+ stories, diversity, inclusion'
  }

  export default function page() {
    return (
    <>
    <AdminHeader/>
    <Navbar/>
    <SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
    <FeaturedPride/>
    </SkeletonTheme>
    <Footer/>
    </>
    )
    }
    
