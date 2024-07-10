'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { getFirestore, getDocs, limit, query, collection } from 'firebase/firestore';
import Link from 'next/link';
import collectionNames from '../../components/collectionNames';
import { v4 as uuidv4 } from 'uuid';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image'

import adimg from '../../images/adimg.jpeg'

interface RelatedArticlesProps {
  currentArticleId: string;
}

interface Article {
  id: string;
  title: string;
  catorgory: string;
  coverimage: string;
}


export default function AdvertiseForm() {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uuid = useRef(uuidv4());

  const selectRandomArticles = (articles: Article[], number: number): Article[] => {
    const length = Math.min(articles.length, number);
    const shuffled = [...articles];
    
    for (let i = 0; i < length; i++) {
      const j = i + Math.floor(Math.random() * (shuffled.length - i));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, length);
  };

  useLayoutEffect(() => {
    const fetchRelatedArticles = async () => {
      const db = getFirestore();
      let articles: Article[] = [];

      try {
        const queryPromises = collectionNames.map(collectionName => {
          const q = query(collection(db, collectionName), limit(3));
          return getDocs(q);
        });

        const querySnapshots = await Promise.all(queryPromises);
        querySnapshots.forEach(querySnapshot => {
          querySnapshot.forEach(doc => {
            articles.push({
              id: doc.id,
              title: doc.data().title as string,
              catorgory: doc.data().catorgory as string,
              coverimage: doc.data().coverimage as string
            });
          });
        });

        setRelatedArticles(selectRandomArticles(articles, 3));
      } catch (error) {
        console.error("Error fetching related articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedArticles();
  }, []);

  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f9f9f9',
      maxWidth: '1200px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  
    adbox: {
      marginBottom: '30px',
    },
   
    content: {
      padding: '20px', // Add styles for the content if needed
    },
  
    introText: {
      marginBottom: '30px',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    relatedArticles: {
      marginTop: '30px',
    },
    articleList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    articleItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    articleImage: {
      width: '100px',
      height: '60px',
      marginRight: '15px',
      objectFit: 'cover' as 'cover', 
    },
    skeletonItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    skeletonText: {
      marginTop: '10px',
    },
  };
  
return (
<>
<div className="advertise-form" style={styles.container}>
  

<div className="adbox" style={styles.adbox}>
<Image src={adimg} alt="Advertisement" layout="responsive" width={1200} height={600} />
</div>
<div className="content" style={styles.content}>
<div style={styles.introText}>
<p>
iTruth News aims to provide comprehensive coverage of key issues and events. Our platform delivers reliable, non-partisan, and objective reporting, focusing on the intricate dynamics of politics, business, and international affairs. In an environment saturated with various agendas, iTruth News stands out by offering a clear, unbiased perspective.
</p>
<p>
Our mission is to connect influential figures, define critical issues, and shape the discourse among decision-makers. Stay informed with iTruth News for the latest insights and developments that matter to those who shape policy and public opinion.
</p>
<p>
<strong>iTruth News is the perfect choice for your advertising message. For further information, contact Phillip Bailey at 555-555-5555.</strong>
</p>
</div>

<div className="related-articles" style={styles.relatedArticles}>
<h3>Trending Articles</h3>
<ul style={styles.articleList}>
{isLoading ? (
<SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
{Array.from({ length: 3 }).map((_, index) => (
<li key={index} className="article-skeleton" style={styles.skeletonItem}>
<Skeleton height={100} width={100} />
<Skeleton height={20} width={200} style={styles.skeletonText} />
</li>
))}
</SkeletonTheme>
) : (
relatedArticles.map((article) => (
<li key={article.id || uuid.current} style={styles.articleItem}>
<Link href={`/pages/Articles/${article.id}`}>
           
<img src={article.coverimage} alt={article.title} style={styles.articleImage} />
<span>{article.title.slice(0, 50)}...</span>
             
</Link>
</li>
))
)}
</ul>
</div>
</div>
</div>
</>
)
}


