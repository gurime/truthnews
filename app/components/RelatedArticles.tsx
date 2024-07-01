'use client';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore';
import Link from 'next/link';

interface RelatedArticlesProps {
  currentArticleId: string;
  catorgory: string;
}

interface Article {
  id: string;
  title: string;
  catorgory: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId, catorgory }) => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      const db = getFirestore();
      const articlesRef = collection(db, 'articles');

      // Fetch articles from the same category
      const sameCategoryQuery = query(
        articlesRef,
        where('catorgory', '==', catorgory),
        where('id', '!=', currentArticleId),
        orderBy('id'),
        orderBy('timestamp', 'desc'),
        limit(3)
      );

      let querySnapshot = await getDocs(sameCategoryQuery);
      let articles: Article[] = [];

      querySnapshot.forEach((doc) => {
        articles.push({
          id: doc.id,
          title: doc.data().title,
          catorgory: doc.data().catorgory
        });
      });

      // If we don't have enough articles from the same category, fetch from other categories
      if (articles.length < 3) {
        const otherCategoriesQuery = query(
          articlesRef,
          where('catorgory', '!=', catorgory),
          orderBy('catorgory'),
          orderBy('timestamp', 'desc'),
          limit(3 - articles.length)
        );

        querySnapshot = await getDocs(otherCategoriesQuery);
        querySnapshot.forEach((doc) => {
          if (doc.id !== currentArticleId) {
            articles.push({
              id: doc.id,
              title: doc.data().title,
              catorgory: doc.data().catorgory
            });
          }
        });
      }

      setRelatedArticles(articles);
    };

    fetchRelatedArticles();
  }, [currentArticleId, catorgory]);

  return (
    <div className="related-articles">
      <h3>Related Articles</h3>
      <ul>
        {relatedArticles.map((article) => (
          <li key={article.id}>
            <Link href={`/article/${article.id}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedArticles;