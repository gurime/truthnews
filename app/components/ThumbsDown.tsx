'use client'
import React, { useEffect, useState } from 'react'
import { auth,  } from '../firebase/firebase'
import { doc, getDoc, addDoc, collection, query, where, onSnapshot, getDocs, getFirestore } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

interface CommentFormProps {
  articleId: string
}

const ThumbsDown: React.FC<CommentFormProps> = ({ articleId }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [voteCount, setVoteCount] = useState<number>(0)
  const [userVoted, setUserVoted] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      setIsSignedIn(!!user)
      if (user) {
        const db = getFirestore()
        const upvotesQuery = query(
          collection(db, 'downvotes'),
          where('articleId', '==', articleId),
          where('userId', '==', user.uid)
        )
        const upvotesSnapshot = await getDocs(upvotesQuery)
        setUserVoted(upvotesSnapshot.size > 0)

        const upvotesCountQuery = query(
          collection(db, 'downvotes'),
          where('articleId', '==', articleId)
        )
        const unsubscribe = onSnapshot(upvotesCountQuery, (snapshot) => {
          setVoteCount(snapshot.size)
        })

        return unsubscribe
      }
    })

    return unsubscribe
  }, [articleId])

  const handleDownvote = async () => {
    if (!isSignedIn) {
      // Handle sign-in prompt
      return
    }

    const user = auth.currentUser
    if (user) {
      const db = getFirestore()
      if (!userVoted) {
        await addDoc(collection(db, 'downvotes'), {
          articleId,
          userId: user.uid,
        })
        setUserVoted(true)
        setVoteCount(voteCount + 1)
      } else {
        // Handle removing upvote
      }
    }
  }

  return (
    <>
    <button
  onClick={handleDownvote}
  style={{
    backgroundColor: '#af4c4c', /* Green */
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
  {voteCount}
</button>
    </>
  )
}

export default ThumbsDown