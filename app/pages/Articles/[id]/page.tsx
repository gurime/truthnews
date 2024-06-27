import React from 'react'
import { getArticle } from '../lib';
import AdminHeader from '@/app/components/AdminHeader';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Goback from '@/app/components/goback';
import Goup from '@/app/components/goup';
import CommentForm from '@/app/components/CommentForm';
import VoteComponent from '@/app/components/RateButton';



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
    const sanitizedPost: any = JSON.parse(JSON.stringify(post));
    const sanitiPost: any = JSON.parse(JSON.stringify(post));

    if (!post) {
        return <div>Article not found</div>;
    }
const lastUpdatedDate: Date | null = post.timestamp && post.timestamp.toDate();
const formattedDate: string | null = lastUpdatedDate && `${lastUpdatedDate.toLocaleString('en-US', 
{ timeZone: 'America/New_York', day: 'numeric', month: 'long', year: 'numeric' })}, 
${lastUpdatedDate.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true })}`;

return (
<>
<AdminHeader/>
<Navbar />
<div   className="article-container">
<div className="backbtn-box">
<h1>{post.title}</h1>
<Goback/>
</div>
<div className="imgbox">
<img className="cover_image" src={post.coverimage} alt="Property Cover" />
</div>



<div className="authflex">
<p>{post.catorgory}</p>

<h3
style={{
display: 'flex',
placeItems: 'center',
fontWeight: '300',
}}
className="card-category">
{post.owner}
<div
style={{
border: 'solid 1px',
height: '30px',
margin: '0 10px 0 10px',
}}
></div>
<img 
className='authbox' 
src={post.authpic} 
style={{ maxWidth: '100%', height: '80px',borderRadius:'7px' }} />
</h3>
</div>
<p className='flexdate'>
 {formattedDate}
</p>

<div className="body-content">
AD
<p>{post.content}</p>
AD
<p style={{whiteSpace: 'pre-line'
}}>{post.bodycontent}</p>
AD
<p>{post.endcontent}</p>


</div>
<hr />
<h2 style={{textAlign:'center'}}>Cast Your Vote</h2>
<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<VoteComponent articleId={articleId} />
</div>


<CommentForm articleId={articleId}/>
<div
style={{
display: 'flex',
justifyContent: 'flex-end',
placeItems: 'center',
marginBottom: '1rem',
}}
>
<Goup/>
</div>
</div>
<Footer/>



</>
);
}