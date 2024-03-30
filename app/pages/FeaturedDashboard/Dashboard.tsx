'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';

interface Article {
    id: string;
    title: string;
    content: string;
    // Add other properties as needed
  }
  
  async function getArticles(orderBy: string): Promise<Article[]> {
    const querySnapshot = await getDocs(collection(db, "Featured Dashboard"));
    const data: Article[] = [];
  
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
  
    return data;
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
        const data = await getArticles('');
        const user = auth.currentUser; // Retrieve the current user
  
        if (user) {
          // Filter the listings to show only those belonging to the current user
          const userArticles = data.filter((article) => article.userId === user.uid);
          // Combine the user's listings with other listings
          const combinedListings = userArticles.concat(data.filter((article) => article.userId !== user.uid));
          setUseArticle(combinedListings);
        } else {
          // Handle the case when there is no authenticated user
          setUseArticle(data);
        }
  
        // Store user's listings separately if needed
        // setUserListings(userArticles);
      } catch (error) {
        setFetchError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    const checkAuthState = async (user: any) => {
      setIsSignedIn(!!user);
      if (user) {
        fetchData();
      }
    };
  
    const unsubscribe = auth.onAuthStateChanged(checkAuthState);
  
    return () => {
      unsubscribe();
    };
  }, []);

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
{fetchError ? (
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
alt=""/>
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
}}>
<Link href={`/Articles/${post.id}`} className="hero-btn">
Read More
</Link>
{post.timestamp && post.timestamp.toDate().toLocaleString()}</div>
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
