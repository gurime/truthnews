'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { auth } from '@/app/firebase/firebase';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

interface UserData {
  firstName: string;
  lastName: string;
}

const AdminForm: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [owner, setOwner] = useState<string>('');

  // Pictures
  const [authPicFile, setAuthPicFile] = useState<File | null>(null);
  const [cover_image, setCover_Image] = useState<File | null>(null);
  // Add similar state variables for other showcase files...

  const [articleId, setArticleId] = useState<string>('');
  const [selectedCollection, setSelectedCollection] = useState<string>('Dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [names, setNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const getUserData = async (userId: string): Promise<UserData | null> => {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, 'adminusers', userId);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data() as UserData;
            return userData;
          } else {
            return null;
          }
        } catch (error) {
          throw error;
        }
      };

      setIsSignedIn(!!user);
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData) {
            setNames([userData.firstName, userData.lastName]);
          }
        } catch (error) {
          handleError(error);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleError = (error: any) => {
    if (error.code === 'network-error') {
      setErrorMessage('Network error: Please check your internet connection.');
    } else if (error.code === 'invalid-content') {
      setErrorMessage('Invalid comment content. Please try again.');
    } else {
      setErrorMessage('Unexpected error occurred. Please try again later.');
    }
  };

  const handleFileChange = (setter: (file: File | null) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setter(file);
  };

  const storage = getStorage(); // Initialize Firebase Storage
  const handleFileUpload = async (file: File, storagePath: string): Promise<string> => {
    try {
      const storageRef = ref(storage, storagePath);
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authInstance = getAuth();
      const user = authInstance.currentUser;
      setIsLoading(true);
      const uniqueArticleId = uuidv4();
      setArticleId(uniqueArticleId);
      // Upload files to Firebase Storage if they exist
      const authpic = authPicFile ? await handleFileUpload(authPicFile, `images/${uniqueArticleId}authpic.jpg`) : null;
      // Similar handling for other file uploads...

      const db = getFirestore();
      const docRef = await addDoc(collection(db, selectedCollection), {
        userId: user?.uid,
        content,
        title,
        owner,
        timestamp: new Date(),
        userEmail: user?.email,
        authpic,
        cover_image,
        // Add other cover_showcase fields here...
        propertyType: selectedCollection,
      });

      if (selectedCollection === 'Dashboard') {
        router.push('/');
      } else {
        const formattedPageName = selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1);
        router.push(`/pages/${formattedPageName}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="adminform_bg">
        <form className="adminform" onSubmit={handleSubmit}>
        <div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
        <label htmlFor="property-name">Article Title:</label>
        <input
          type="text"
          id="property-name"
          name="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
      </div>
      </div>
          <hr />
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <h2>About Your Property</h2>
          </div>
          <div className="sm-adminform" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'grid', gap: '1rem', width: '100%' }}>
              <textarea
                rows={10}
                id="aboutDescription"
                placeholder="E.g., provide a brief description of yourself and property..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={!isSignedIn || !content || !selectedCollection || isLoading}
            style={{
              cursor: !isSignedIn || !content || !selectedCollection || isLoading ? 'none' : 'pointer',
              backgroundColor: !isSignedIn || !content || !selectedCollection || isLoading ? '#9e9e9e' : '#00a8ff',
              color: !isSignedIn || !content || !selectedCollection || isLoading ? 'grey' : '#fff',
            }}
          >
            {isLoading ? <BeatLoader color="blue" /> : 'Submit'}
          </button>
        </form>
      </div>
      </>
  );
};

export default AdminForm