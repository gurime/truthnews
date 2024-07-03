'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'
import Skeleton from 'react-loading-skeleton'
import { IoChatboxSharp } from 'react-icons/io5'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
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
commentsCount: number; 
voteCount: number;
downCount:number
}



async function getCommentsCount(articleId: string): Promise<number> {
try {
const db = getFirestore();
const commentsRef = collection(db, 'comments');
const queryRef = query(commentsRef, where('articleId', '==', articleId));
const querySnapshot = await getDocs(queryRef);
return querySnapshot.size;
} catch (error) {
return 0;
}
}
async function getVoteCount(articleId: string): Promise<number> {
try {
const db = getFirestore();
const commentsRef = collection(db, 'upvotes');
const queryRef = query(commentsRef, where('articleId', '==', articleId));
const querySnapshot = await getDocs(queryRef);
return querySnapshot.size;
} catch (error) {
return 0;
}
}
async function getdownVoteCount(articleId: string): Promise<number> {
try {
const db = getFirestore();
const commentsRef = collection(db, 'downvotes');
const queryRef = query(commentsRef, where('articleId', '==', articleId));
const querySnapshot = await getDocs(queryRef);
return querySnapshot.size;
} catch (error) {
return 0;
}
}
function updateComment(postId: string, editedContent: string) {
throw new Error('Function not implemented.');
}


async function getArticles(): Promise<Article[]> {
try {
const querySnapshot = await getDocs(collection(db, "Headline Dashboard"));
const data: Article[] = [];

for (const doc of querySnapshot.docs) {
const articleData = doc.data();
const commentsCount = await getCommentsCount(doc.id);
const voteCount = await getVoteCount(doc.id); // Get the vote count
const downCount = await getdownVoteCount(doc.id); // Get the vote count

data.push({
id: doc.id,
title: articleData.title || "",
content: articleData.content || "",
bodycontent: articleData.bodycontent || "",
endcontent: articleData.endcontent || "",
userId: articleData.userId || "",
coverimage: articleData.coverimage || "",
catorgory: articleData.catorgory || "",
authpic: articleData.authpic || "",
owner: articleData.owner || "",
timestamp: articleData.timestamp || "",
propertyType: articleData.propertyType || "",
commentsCount: commentsCount,
voteCount: voteCount,
downCount: downCount 
});
}
return data;
} catch (error) {
console.error("Error fetching articles:", error);
throw error;
}
}

export default function HeadlineDashboard() {
const [IsAdmin, setIsAdmin] = useState<boolean>(false)
const [fetchError, setFetchError] = useState<null | string>(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState<any[]>([]);
const [isSignedIn, setIsSignedIn] = useState(false);
const [comments, setComments] = useState<any[]>([]);
const [votes, setVotes] = useState<any[]>([]);
const [downvotes, setdownVotes] = useState<any[]>([]);
const [errorMessage, setErrorMessage] = useState('');
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingComment, setEditingComment] = useState<any>(null);
const [commentsCount, setCommentsCount] = useState(0);
const [unauthorizedModalOpen, setUnauthorizedModalOpen ] = useState<boolean>(false)
const commentsRef = useRef<HTMLDivElement>(null);
  
const fetchComments = async (articleId: string) => {
try {
const db = getFirestore();
const commentsRef = collection(db, 'Headline Dashboard');
const queryRef = 
query(commentsRef, 
where('articleId', '==', articleId), 
orderBy('timestamp', 'desc'));
const querySnapshot = await getDocs(queryRef);
const newComments = querySnapshot.docs.map((doc) => {
const commentData = doc.data();
return { id: doc.id, ...commentData, timestamp: commentData.timestamp.toDate() };});
const commentsCount = newComments.length;
const votes = newComments.length;
const downvotes = newComments.length;
setCommentsCount(commentsCount); 
setVotes((prevVotes) => [...prevVotes, votes]); 
setdownVotes((preVotes) => [...preVotes, downvotes]);
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
let combinedListings;
if (currentUser) {
const userArticles = articles.filter((article) => article.userId === currentUser.uid);
const otherArticles = articles.filter((article) => article.userId !== currentUser.uid);
combinedListings = userArticles.concat(otherArticles);
} else {
combinedListings = articles;
}
      
// Limit the combined listings to 6 articles
const limitedArticles = combinedListings.slice(0, 6);
setUseArticle(limitedArticles);
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


  


return (
<>
<>
<div className='grid-container'>
{loading ? (
<>
{Array.from({ length: 3 }, (_, index) => (
<div key={index} className="card">
<Skeleton height={200} />
<Skeleton height={30} style={{ marginTop: '10px' }} />
<div className="authflex">
<Skeleton height={20} width={100} style={{ marginTop: '10px' }} />
<div className="authpic-block">
<Skeleton height={20} width={150} style={{ marginTop: '10px' }} />
<Skeleton
height={40}
width={40}
style={{ marginTop: '10px', borderRadius: '50%' }}/>
</div>
</div>
<Skeleton height={60} style={{ marginTop: '10px' }} />
<Skeleton height={40} width={120} style={{ marginTop: '10px' }} />
<Skeleton height={20} width={100} style={{ marginTop:'10px' }} />
</div>
))}
</>
) : fetchError ? (
<p>Error: {fetchError}</p>
) : (
useArticle.map((post) => (
<React.Fragment key={post.id}>
<div className="card">
<img src={post.coverimage} alt="" />
<h2 className="card-title">{post.title}</h2>
<div className="authflex">
<p>{post.catorgory}</p>
<div className="authpic-block">
<h3 className="card-catogory sm-text">{post.owner}</h3>
<img
style={{ width: '40px', height: '40px' }}
className="authpic"
src={post.authpic}
alt=""/>
</div>
</div>
<div>
<p className="card-content">{post.content && post.content.slice(0, 200)}...</p>
</div>
<div style={{
display:'flex',
alignItems:'center',
justifyContent:'space-between'
}}>
<Link href={`/pages/Articles/${post.id}`} className="hero-btn">
Read More
</Link>
<p className='sm-text'>
{post.timestamp &&
`${post.timestamp
.toDate()
.toLocaleDateString('en-US', {
month: 'long',
day: 'numeric',
year: 'numeric',
})}, ${post.timestamp
.toDate()
.toLocaleTimeString('en-US', {
hour: 'numeric',
minute: 'numeric',
})}`}
</p>
</div>
<div style={{
display:'flex',
alignItems:'center',
justifyContent:'space-evenly'
}}>
  <div><IoChatboxSharp />
<span style={{padding:'0 5px'}}>{post.commentsCount}</span></div>

<div><FaThumbsUp/>
<span style={{ padding: '0 5px' }}>{post.voteCount}</span></div>
<div><FaThumbsDown/>
<span style={{ padding: '0 5px' }}>{post.downCount}</span></div>

</div>

    
</div>
</React.Fragment>
))
)}
</div>
</>

</>
)
}
