
 'use client'
 import React, { useEffect, useState } from 'react'
 import { auth } from '../firebase/firebase'
 import { addDoc, collection, query, where, onSnapshot, getDocs, getFirestore } from 'firebase/firestore'
 import { User } from 'firebase/auth'
 import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
 
 interface VoteComponentProps {
   articleId: string
 }
 
 const VoteComponent: React.FC<VoteComponentProps> = ({ articleId }) => {
   const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
   const [upvoteCount, setUpvoteCount] = useState<number>(0)
   const [downvoteCount, setDownvoteCount] = useState<number>(0)
   const [userUpvoted, setUserUpvoted] = useState<boolean>(false)
   const [userDownvoted, setUserDownvoted] = useState<boolean>(false)
 
   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
       setIsSignedIn(!!user)
       if (user) {
         const db = getFirestore()
         
         // Check if user has upvoted
         const upvotesQuery = query(
           collection(db, 'upvotes'),
           where('articleId', '==', articleId),
           where('userId', '==', user.uid)
         )
         const upvotesSnapshot = await getDocs(upvotesQuery)
         setUserUpvoted(upvotesSnapshot.size > 0)
 
         // Check if user has downvoted
         const downvotesQuery = query(
           collection(db, 'downvotes'),
           where('articleId', '==', articleId),
           where('userId', '==', user.uid)
         )
         const downvotesSnapshot = await getDocs(downvotesQuery)
         setUserDownvoted(downvotesSnapshot.size > 0)
 
         // Listen for upvotes count changes
         const upvotesCountQuery = query(
           collection(db, 'upvotes'),
           where('articleId', '==', articleId)
         )
         const unsubscribeUpvotes = onSnapshot(upvotesCountQuery, (snapshot) => {
           setUpvoteCount(snapshot.size)
         })
 
         // Listen for downvotes count changes
         const downvotesCountQuery = query(
           collection(db, 'downvotes'),
           where('articleId', '==', articleId)
         )
         const unsubscribeDownvotes = onSnapshot(downvotesCountQuery, (snapshot) => {
           setDownvoteCount(snapshot.size)
         })
 
         return () => {
           unsubscribeUpvotes()
           unsubscribeDownvotes()
         }
       }
     })
 
     return unsubscribe
   }, [articleId])
 
   const handleVote = async (voteType: 'upvotes' | 'downvotes') => {
     if (!isSignedIn) {
       // Handle sign-in prompt
       return
     }
 
     const user = auth.currentUser
     if (user) {
       const db = getFirestore()
       const hasVoted = voteType === 'upvotes' ? userUpvoted : userDownvoted
 
       if (hasVoted) {
         // User has already voted, display a message or return early
         return
       }
 
       await addDoc(collection(db, voteType), {
         articleId,
         userId: user.uid,
       })
 
       if (voteType === 'upvotes') {
         setUserUpvoted(true)
         setUpvoteCount(upvoteCount + 1)
       } else {
         setUserDownvoted(true)
         setDownvoteCount(downvoteCount + 1)
       }
     }
   }
 
   return (
     <>
       <button
         disabled={userDownvoted || userUpvoted}
         onClick={() => handleVote('downvotes')}
         style={{
           backgroundColor: '#af4c4c',
           border: 'none',
           color: 'white',
           padding: '10px 20px',
           textAlign: 'center',
           textDecoration: 'none',
           fontSize: '16px',
           margin: '4px 2px',
           cursor: 'pointer',
           borderRadius: '4px',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
         }}
       >
         <FaThumbsDown style={{ marginRight: '8px' }} />
         {downvoteCount}
       </button>
 
       <button
         disabled={userUpvoted || userDownvoted}
         onClick={() => handleVote('upvotes')}
         style={{
           backgroundColor: '#4CAF50',
           border: 'none',
           color: 'white',
           padding: '10px 20px',
           textAlign: 'center',
           textDecoration: 'none',
           fontSize: '16px',
           margin: '4px 2px',
           cursor: 'pointer',
           borderRadius: '4px',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
         }}
       >
         <FaThumbsUp style={{ marginRight: '8px' }} />
         {upvoteCount}
       </button>
     </>
   )
 }
 
 export default VoteComponent