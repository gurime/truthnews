'use client';
import React, { useEffect, useState } from 'react';
import { getFirestore, collectionGroup, getDocs, limit, query, DocumentData, Query, startAfter, collection } from 'firebase/firestore';
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
// Create an array of promises for each collection query
const queryPromises = collectionNames.map(collectionName => {
const q = query(
collection(db, collectionName),
limit(3) // Adjust this number based on your needs
);
return getDocs(q);
});
  
// Execute all queries concurrently
const querySnapshots = await Promise.all(queryPromises);
// Process the results
querySnapshots.forEach(querySnapshot => {
querySnapshot.forEach(doc => {
articles.push({
id: doc.id,
title: doc.data().title,
catorgory: doc.data().catorgory,
coverimage: doc.data().coverimage
});
});
});
  
// Randomly select 3 articles from the results
setRelatedArticles(selectRandomArticles(articles, 3));
} catch (error) {
console.error("Error fetching related articles:", error);
// Handle the error appropriately
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
<span>{article.title.slice(0, 50)}...</span>
</Link>
</li>
))}
</ul>
</div>
);
};

export default RelatedArticles;
