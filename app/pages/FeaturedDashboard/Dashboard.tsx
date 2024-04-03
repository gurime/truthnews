'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface Article {
    userId: string;
    id: string;
    title: string;
    content: string;
    coverimage: string; 
    catorgory: string;
    authpic : string;
    owner: string;
    timestamp: string;
  }
  
  async function getArticles(): Promise<Article[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "Featured Dashboard"));
      const data: Article[] = [];
  
      querySnapshot.forEach((doc) => {
        const articleData = doc.data();
        data.push({
          id: doc.id,
          title: articleData.title || '', // Ensure title is not undefined
          content: articleData.content || '', // Ensure content is not undefined
          userId: articleData.userId || '',
          coverimage: articleData.coverimage || '',
          catorgory: articleData.catorgory || '',
          authpic: articleData.authpic || '',
          owner: articleData.owner || '',
          timestamp: articleData.timestamp || ''
        });
      });
  
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error; // Rethrow the error for handling in the component
    }
  }
  

export default function Dashboard() {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  const [useArticle, setUseArticle] = useState<any[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<any>(null);
  const router = useRouter();
  const commentsRef = useRef<HTMLDivElement>(null);

  const fetchComments = async (articleId: string) => {
    try {
      const db = getFirestore();
      const commentsRef = collection(db, 'Featured Dashboard');
      const queryRef = query(commentsRef, where('articleId', '==', articleId), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(queryRef);
      const newComments = querySnapshot.docs.map((doc) => {
        const commentData = doc.data();
        return { id: doc.id, ...commentData, timestamp: commentData.timestamp.toDate() };
      });
      setComments(newComments);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Error fetching Listing. Please try again.');
      setLoading(false);
    }
  };

  const userIsAuthenticated = async () => {
    return new Promise<boolean>((resolve) => {
      const authInstance = getAuth();
      onAuthStateChanged(authInstance, (user) => {
        const isAuthenticated = !!user;
        resolve(isAuthenticated);
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getArticles(); // Call getArticles without any arguments
        const currentUser = auth.currentUser;
  
        if (currentUser) {
          // Filter articles based on user ID
          const userArticles = articles.filter(article => article.userId === currentUser.uid);
          const otherArticles = articles.filter(article => article.userId !== currentUser.uid);
          const combinedListings = userArticles.concat(otherArticles);
          setUseArticle(combinedListings);
        } else {
          setUseArticle(articles);
        }
      } catch (error) {
        setFetchError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    const unsubscribe = auth.onAuthStateChanged(user => {
      checkAuthState(user);
      fetchData(); // Call fetchData directly inside onAuthStateChanged
    });
  
    const checkAuthState = (user: any) => {
      setIsSignedIn(!!user);
    };
  
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs only once on component mount
  

  const editPost = (postId: string, userId: string) => {
    const listingToEdit = useArticle.find((listing) => listing.id === postId);

    if (listingToEdit) {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser && currentUser.uid === listingToEdit.userId) {
        setEditingComment(listingToEdit);
        setEditModalOpen(true);
      } else {
        setErrorMessage('Unauthorized to edit this Listing.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } else {
      setErrorMessage('Listing not found');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleEditModalSave = async (postId: string, editedContent: string) => {
    try {
      // await updateComment(postId, editedContent);

      setUseArticle((prevArticles) =>
        prevArticles.map((article) =>
          article.id === postId ? { ...article, content: editedContent } : article
        )
      );

      setEditModalOpen(false); // Close the modal after updating
    } catch (error) {
      setErrorMessage('Error saving Listing. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const deletePost = async (postId: string, userId: string) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const isAuthenticated = await userIsAuthenticated();
      if (currentUser) {
        if (currentUser.uid === userId) {
          const db = getFirestore();
          const commentDoc = await getDoc(doc(db, 'Featured Dashboard', postId));
          if (commentDoc.exists()) {
            await deleteDoc(doc(db, 'Featured Dashboard', postId));
            setUseArticle((prevArticles) =>
              prevArticles.filter((article) => article.id !== postId)
            );
            setSuccessMessage('Listing deleted successfully');
            setTimeout(() => {
              setSuccessMessage('');
            }, 3000);
          } else {
            setErrorMessage('Listing not found');
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
          }
        } else {
          setErrorMessage('Unauthorized to delete this Listing.');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      }
    } catch (error) {
      setErrorMessage('Error deleting Listing. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };





  return (
    <>
<div className="hero">
  {loading ? (
    // Render Skeleton components while loading
    <>
<div className="hero-info">
<Skeleton  /> {/* Hero Title */}
<div className="authflex">
<Skeleton /> {/* Category */}
<div className="authpic-block">
<Skeleton  /> {/* Author Name */}
<Skeleton  /> {/* Author Picture */}
</div>
</div>
<Skeleton/> {/* Content Preview */}
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
<Skeleton  /> {/* Read More Button */}
<Skeleton /> {/* Timestamp */}
</div>
</div>
<div className="heroimg-box">
<Skeleton width={210} height={118} /> {/* Hero Image */}
</div></>
  ) : fetchError ? (
    <p>Error: {fetchError}</p>
  ) : (
useArticle.map((post) => (
<React.Fragment key={post.id}>
<div className="hero-info">
<h1 className="hero-title">{post.title}</h1>
<div className="authflex">
<p>{post.catorgory}</p>
<div className="authpic-block">
<h3 className="card-catogory">{post.owner}</h3>
<img
style={{ width: '40px', height: '40px' }}
className="authpic"
src={post.authpic}
alt=""
/>
</div>
</div>
<p className="hero-description">
{post.content && post.content.slice(0, 200)}...
</p>
<div
style={{
display: 'flex',
placeItems: 'center',
justifyContent: 'space-between',
}}
>
<Link href={`/pages/Articles/${post.id}`} className="hero-btn">
Read More
</Link>
<p>{post.timestamp && `${post.timestamp.toDate().toLocaleDateString('en-US', {
    month: 'long',
    day:'numeric',
    year: 'numeric',
  })}, ${post.timestamp.toDate().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })}`}</p>

</div>
</div>
<div className="heroimg-box">
<img src={post.coverimage} alt="Hero Image" />
</div>
</React.Fragment>
))
)}
</div>

    </>
  );
}
