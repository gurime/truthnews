'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { MdOutlineSecurityUpdate } from 'react-icons/md';
import AdminEdit from '../AdminEdit/AdminEdit';
import { IoCloseSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid'; // If you need to generate unique IDs

interface Article {
    userId: string;
    propertyType:string;
    id: string;
    title: string;
    content: string;
    bodycontent: string;
    endcontent: string;
    coverimage: string; 
    catorgory: string;
    authpic : string;
    owner: string;
    timestamp: string;
  }

  function updateComment(postId: string, editedContent: string) {
    throw new Error('Function not implemented.');
  }
  
  function checkIfUserIsAdmin(user: User) {
    throw new Error('Function not implemented.');
  }
  
  async function getArticles(): Promise<Article[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "Featured U.N. (United Nations)"));
      const data: Article[] = [];
  
      querySnapshot.forEach((doc) => {
        const articleData = doc.data();
        data.push({
          id: doc.id,
          title: articleData.title || '', 
          content: articleData.content || '', 
          bodycontent: articleData.bodycontent || '',
          endcontent: articleData.endcontent || '',
          userId: articleData.userId || '',
          coverimage: articleData.coverimage || '',
          catorgory: articleData.catorgory || '',
          authpic: articleData.authpic || '',
          owner: articleData.owner || '',
          timestamp: articleData.timestamp || '',
          propertyType:articleData.propertyType || ''
        });
      });
  
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error; // Rethrow the error for handling in the component
    }
  }
  

export default function FeaturedUN() {
  const [IsAdmin, setIsAdmin] = useState<boolean>(false)
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  const [useArticle, setUseArticle] = useState<any[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<any>(null);
  const [unauthorizedModalOpen, setUnauthorizedModalOpen ] = useState<boolean>(false)
  const router = useRouter();
  const commentsRef = useRef<HTMLDivElement>(null);

  const fetchComments = async (articleId: string) => {
    try {
      const db = getFirestore();
      const commentsRef = collection(db, 'Featured U.N. (United Nations)');
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

  async function checkIfUserIsAdmin(user: User): Promise<boolean> {
    const db = getFirestore();
    const adminUserDocRef = doc(db, 'adminusers', user.uid);
  
    try {
      const adminUserDoc = await getDoc(adminUserDocRef);
      return adminUserDoc.exists();
    } catch (error) {
      console.error('Error checking admin user:', error);
      return false; // Return false in case of an error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getArticles();
        const currentUser = getAuth().currentUser;
        if (currentUser) {
          const userArticles = articles.filter((article) => article.userId === currentUser.uid);
          const otherArticles = articles.filter((article) => article.userId !== currentUser.uid);
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

    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const isUserAdmin = checkIfUserIsAdmin(user); // Implement this function based on your authentication system
        setIsAdmin(await isUserAdmin);
      } else {
        setIsAdmin(false);
      }
      const checkAuthState = (user: any) => {
        setIsSignedIn(!!user);
      };
    });

    fetchData();

    return () => {
      unsubscribe();
    };
  }, []); 
  const editPost = async (postId: string, userId: string, isAdmin: boolean) => {
    const listingToEdit = useArticle.find((listing) => listing.id === postId);
  
    if (listingToEdit) {
      const isAuthenticated = await userIsAuthenticated();
  
      if (isAdmin) {
        // Admin can edit any post
        setEditingComment(listingToEdit);
        setEditModalOpen(true);
      } else if (isAuthenticated) {
        const auth = getAuth();
        const currentUser = auth.currentUser;
  
        if (currentUser && currentUser.uid === listingToEdit.userId) {
          // Regular user can edit their own post
          setEditingComment(listingToEdit);
          setEditModalOpen(true);
        } else {
          // Show modal or error message for unauthorized access
          setUnauthorizedModalOpen(true);
        }
      } else {
        // User is not authenticated
        // Show modal or error message for unauthorized access
        setUnauthorizedModalOpen(true);
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
      updateComment(postId, editedContent);

      setUseArticle((prevArticles) =>
        prevArticles.map((article) =>
          article.id === postId ? { ...article, content: editedContent, bodycontent: editedContent, endcontent: editedContent } : article
        )
      );

      setEditModalOpen(false); 

    } catch (error) {
      setErrorMessage('Error saving Listing. Please try again.');
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
<React.Fragment key={post.id || uuidv4()}>
<div ref={commentsRef} className="hero-info">
<h1 className="hero-title">{post.title}</h1>
<div className="authflex">
<p>{post.catorgory}</p>
<div className="authpic-block">
<h3 className="card-catogory">{post.owner}</h3>
<img
style={{ width: '80px', height: '100px' }}
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
<div style={{position:'relative'}}>
<button
  onClick={(e) => {
    e.preventDefault();
    editPost(post.id, post.userId, IsAdmin); // Pass isAdmin as a new argument
  }}
  style={{
    position: 'absolute',
    right: '0',
    top: '-50px',
    borderRadius: '50%',
    border: 'none',
    padding: '1rem 20px',
    backgroundColor: '#2072ed',
    color: '#fff',
    cursor: 'pointer',
  }}
>
  <MdOutlineSecurityUpdate style={{ fontSize: '24px' }} />
</button>

{unauthorizedModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setUnauthorizedModalOpen(false)}>
      <IoCloseSharp style={{cursor:'pointer'}} />

      </span>
      <p>This functionality is only available for administrators.</p>
    </div>
  </div>
)}
</div>

</div>
</React.Fragment>
))
)}
</div>
{editModalOpen && (<AdminEdit comment={editingComment} onSave={handleEditModalSave} onCancel={() => setEditModalOpen(false)}/>)}

    </>
  );
}

