'use client';
import React, { useEffect, useState } from 'react';
import { getFirestore, collectionGroup, getDocs, limit, query, DocumentData, Query, startAfter } from 'firebase/firestore';
import Link from 'next/link';
import collectionNames from './collectionNames';

interface RelatedArticlesProps {
  currentArticleId: string;
  catorgory: string;
}

interface Article {
  id: string;
  title: string;
  catorgory: string;
  coverimage: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({  }) => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const selectRandomArticles = (articles: Article[], number: number): Article[] => {
    const shuffled = [...articles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, number);
  };
  
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      const db = getFirestore();
      let articles: Article[] = [];
  
      try {
        for (const collectionName of collectionNames) {
          let lastDoc = null;
          const batchSize = 10;
  
          while (articles.length < 30) {
            let q: Query<DocumentData> = query(
              collectionGroup(db, collectionName),
              limit(batchSize)
            );
            
            if (lastDoc) {
              q = query(q, startAfter(lastDoc));
            }
  
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) break;
  
            querySnapshot.forEach((doc) => {
              articles.push({
                id: doc.id,
                title: doc.data().title,
                catorgory: doc.data().catorgory,
                coverimage: doc.data().coverimage
              });
            });
  
            lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          }
        }
  
        setRelatedArticles(selectRandomArticles(articles, 3));
      } catch (error) {
        console.error("Error fetching related articles:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    };
  
    fetchRelatedArticles();
}, [collectionNames]);
  

  return (
<div className="related-articles">
  <h3>Trending Articles</h3>
  <ul>
    {relatedArticles.map((article) => (
      <li key={article.id}>
        <Link href={`/pages/Articles/${article.id}`}>
      
            <img src={article.coverimage} alt={article.title} />
            <span>{article.title.slice(0, 50)}</span>
      
        </Link>
      </li>
    ))}
  </ul>
</div>
  );
};

export default RelatedArticles;
