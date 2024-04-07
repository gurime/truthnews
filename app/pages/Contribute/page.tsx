import { Metadata } from "next";
import React from 'react'
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { SkeletonTheme } from "react-loading-skeleton";
import AdminHeader from "@/app/components/AdminHeader";


export const metadata: Metadata = {
    title: 'Support iTruth News - Contribute to Exceptional Journalism',
    description: 'iTruth News is dedicated to delivering breaking news updates, latest headlines, in-depth analyses, and timely coverage across a wide range of topics. Your financial contribution helps us continue our mission of providing accurate and insightful reporting. Support exceptional journalism by contributing to iTruth News today.',
    keywords: 'contribute to news, support journalism, financial contribution, exceptional journalism, accurate reporting, insightful reporting, breaking news updates, latest news headlines, in-depth analyses, timely coverage'
   }


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
</SkeletonTheme>
<Footer/>
</>
)
}
