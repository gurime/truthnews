import React from 'react'
import { getArticle } from '../lib';
import AdminHeader from '@/app/components/AdminHeader';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Goback from '@/app/components/goback';
import Goup from '@/app/components/goup';
import CommentForm from '@/app/components/CommentForm';
import VoteComponent from '@/app/components/RateButton';
import Newsletter from '@/app/components/NewsLetter';
import RelatedArticles from '@/app/components/RelatedArticles';
import Script from 'next/script';
import ArticleContribute from '@/app/components/ArticleContribute';
import AdComponent from '@/app/components/AdComponent';



export async function generateMetadata({ params }: { params: { id: string } }): Promise<{ title: string }> {
const articleId: string = params.id;
try {
const articleDetails: any | null = await getArticle(articleId);
if (articleDetails) {
return {
title: `iTruth News | ${articleDetails.title || 'Page Not Found'}`,
};
} else {
return {
title: 'iTruth News | Page Not Found',
};
}
} catch (error) {
return {
title: 'iTruth News | Page Not Found',
};
}
}



export default async function DetailsPage({ params }: { params: { id: string } }): Promise<JSX.Element> {
const articleId: string = params.id;
// Fetch article details
const post: any | null = await getArticle(articleId);

if (!post) {
return <div>Article not found</div>;
}
const lastUpdatedDate: Date | null = post.timestamp && post.timestamp.toDate();
const formattedDate: string | null = lastUpdatedDate && `${lastUpdatedDate.toLocaleString('en-US', 
{ timeZone: 'America/New_York', day: 'numeric', month: 'long', year: 'numeric' })}, 
${lastUpdatedDate.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true })}`;

return (
<>
<Script
async
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0757101243908749"
crossOrigin="anonymous"
/>
<AdminHeader />
<Navbar />
<div className='mass-container'>
<div className="article-container">
<div className="main-content">
<div className="backbtn-box">
<h1>{post.title}</h1>
<Goback />
</div>
<div className="imgbox">
<img className="cover_image" src={post.coverimage} alt="Property Cover" />
</div>
<div className="authflex">
<p>{post.catorgory}</p>
<h3 className="card-category" style={{ display: 'flex', alignItems: 'center', fontWeight: 300 }}>
<span className='iphone-500px'>{post.owner}</span> 
<div style={{ border: 'solid 1px', height: '30px', margin: '0 10px' }}></div>
<img className="authbox" src={post.authpic} style={{ maxWidth: '100%', height: '80px', borderRadius: '7px' }} />
</h3>
</div>
<p className="flexdate">{formattedDate}</p>
<div className="body-content">
<div className="advertisement">
<AdComponent articleId={articleId} />
</div>

<p>{post.content}</p>

{/* <ArticleContribute articleId={articleId}/> */}
<p style={{ whiteSpace: 'pre-line' }}>{post.bodycontent}</p>
<p>{post.endcontent}</p>
</div>
<div className="advertisement">
<AdComponent articleId={articleId} />
</div>

<hr />
<h2 style={{ textAlign: 'center' }}>Cast Your Vote</h2>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<VoteComponent articleId={articleId} />
</div>
<CommentForm articleId={articleId} />
<div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1rem' }}>
<Goup />
</div>
</div>
</div>
<div className="sidebar">
<RelatedArticles currentArticleId={articleId}  />
<Newsletter articleId={articleId}/>
</div>
</div>
<Footer />
     


</>
);
}