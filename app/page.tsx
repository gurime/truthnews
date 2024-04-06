import { Metadata } from "next";


import AdminHeader from "./components/AdminHeader";
import FeaturedDashboard from "./pages/FeaturedDashboard/page";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { SkeletonTheme } from "react-loading-skeleton";
import HeadlineDashboard from "./pages/FeaturedDashboard/HeadlineDashboard";


export const metadata : Metadata = {
  title: 'iTruth News - Breaking News Updates, Latest News Headlines',
  description: 'Stay informed with iTruth News - your reliable source for breaking news updates and the latest headlines. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of topics. Your go-to platform for staying ahead in a rapidly evolving world.',
  keywords: 'breaking news, latest news headlines, news updates, in-depth analyses, timely coverage, accurate insights, current events, global news'
}


export default function Home() {

return (
<>

<AdminHeader/>
<Navbar/>  

<SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
<FeaturedDashboard/>

<div style={{
borderTop:'solid 1px red'
}}>
<h1>Headline News</h1>
</div>
<HeadlineDashboard/>


<div style={{
borderTop:'solid 1px blue'
}}>
<h1>Opinion News</h1>
</div>

</SkeletonTheme>


<Footer/>  
</>
);
}
