'use client';
import React, { useLayoutEffect, useState } from 'react';
import { getFirestore, getDocs, limit, query, collection } from 'firebase/firestore';
import Link from 'next/link';
import collectionNames from './collectionNames';
import { v4 as uuidv4 } from 'uuid';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface RelatedArticlesProps {
  currentArticleId: string;
}

interface Article {
  id: string;
  title: string;
  catorgory: string;
  coverimage: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = () => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectRandomArticles = (articles: Article[], number: number): Article[] => {
    const shuffled = [...articles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, number);
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

  return (
    <div className="related-articles" style={{ minHeight: '300px' }}>
    <h3>Trending Articles</h3>
    <ul>
      {isLoading ? (
        <SkeletonTheme baseColor="grey" highlightColor="#e6e6e6">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="article-skeleton">
              <Skeleton height={100} width={100} />
              <Skeleton height={20} width={200} style={{ marginTop: '10px' }} />
            </li>
          ))}
        </SkeletonTheme>
      ) : (
        relatedArticles.map((article) => (
          <li key={article.id || uuidv4()}>
            <Link href={`/pages/Articles/${article.id}`}>
              <img src={article.coverimage} alt={article.title} />
              <span>{article.title.slice(0, 50)}...</span>
            </Link>
          </li>
        ))
      )}
    </ul>
  </div>
  );
};

export default RelatedArticles;