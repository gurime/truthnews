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
  const [bodycontent, setBodyContent] = useState<string>('');
  const [endcontent, setEndContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [owner, setOwner] = useState<string>('');

  // Pictures
  const [authPicFile, setAuthPicFile] = useState<File | null>(null);
  const [cover_image, setCover_Image] = useState<File | null>(null);
  // Add similar state variables for other showcase files...

  const [articleId, setArticleId] = useState<string>('');
  const [selectedCollection, setSelectedCollection] = useState<string>('Featured Dashboard');
  const acceptedCollections = ['Featured Music', 'Music', 'Sports'];
  const [catorgory, setCatorgory] = useState<string>('');
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
      if (!isSignedIn) {
        setErrorMessage('You must be signed in to submit the article.');
        return;
      }
      const authInstance = getAuth();
      const user = authInstance.currentUser;
      setIsLoading(true);
      const uniqueArticleId = uuidv4();
      setArticleId(uniqueArticleId);
      // Upload files to Firebase Storage if they exist
const authpic = authPicFile ? await handleFileUpload(authPicFile, `images/${uniqueArticleId}authpic.jpg`) : null;
   
  
  
const coverimage = cover_image ? await handleFileUpload(cover_image, `images/${uniqueArticleId}cover_image.jpg`) : null;
      const db = getFirestore();
      const docRef = await addDoc(collection(db, selectedCollection), {
        userId: user?.uid,
        content,
        bodycontent,
        endcontent,
        catorgory,
        title,
        owner,
        timestamp: new Date(),
        userEmail: user?.email,
        authpic,
        coverimage,
        propertyType: selectedCollection,
      });

      if (acceptedCollections.includes(selectedCollection)) {
        switch (selectedCollection) {
          case 'Featured Dashboard':
          case 'Headline Dashboard':
            router.push('/');
            break;
          case 'Featured Music':
          case 'Headline Music':
          case 'Music': 

            router.push('/pages/Music');
            break;
          case 'Featured Sports':
            router.push('/pages/Sports');
            break;
          default:
            const formattedPageName = selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1);
            router.push(`/pages/${formattedPageName}`);
            break;
        }
      } else {
        setErrorMessage('Invalid collection selected.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="adminform_bg">
        <form className="adminform" onSubmit={handleSubmit}>
        <div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Article Topic:</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="selectedCollection">Choose Destination for Article:</label>
    <select
      name="selectedCollection"
      value={selectedCollection}
      onChange={(e) => setSelectedCollection(e.target.value)}
      required
      className='billingselect'
    >
<option value="Featured Dashboard">Featured Dashboard</option>
<option value="Headline Dashboard">Headline Dashboard</option>
<option value="Featured Technology">Featured Technology</option>
<option value="Technology">Technology</option>
<option value="Featured Politics">Featured Politics</option>
<option value="Politics">Politics</option>
<option value="Featured Opinion">Featured Opinion</option>
<option value="Opinion">Opinion</option>
<option value="Featured Music">Featured Music</option>
<option value="Music">Music</option>
<option value="Sports">Sports</option>
<option value="Military">Military</option>
<option value="Crime">Crime</option>
<option value="Economy">Economy</option>
<option value="Immigration">Immigration</option>
<option value="Business">Business</option>
<option value="Video Games">Video Games</option>
<option value="Entertainment">Entertainment</option>
<option value="Fashion">Fashion</option>
<option value="Education">Education</option>
<option value="U.N.">U.N. (United Nations)</option>
<option value="Terrorism">Terrorism</option>
<option value="World Economy">World Economy</option>
<option value="Scandals">Scandals</option>
<option value="Mexico">Mexico</option>
<option value="South America">South America</option>
<option value="Europe">Europe</option>
<option value="Asia">Asia</option>
<option value="Africa">Africa</option>
 
    </select>
  </div>
  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="catorgory">Select Topic:</label>
    <select
      name="catorgory"
      value={catorgory}
      onChange={(e) => setCatorgory(e.target.value)}
      required
      className='billingselect'
    >

<option value="">select a topic</option>
<option value="Technology">Technology</option>
<option value="Politics">Politics</option>
<option value="Opinion">Opinion</option>
<option value="Music">Music</option>
<option value="Sports">Sports</option>
<option value="Military">Military</option>
<option value="Crime">Crime</option>
<option value="Economy">Economy</option>
<option value="Immigration">Immigration</option>
<option value="Business">Business</option>
<option value="Video Games">Video Games</option>
<option value="Entertainment">Entertainment</option>
<option value="Fashion">Fashion</option>
<option value="Education">Education</option>
<option value="U.N.">U.N. (United Nations)</option>
<option value="Terrorism">Terrorism</option>
<option value="World Economy">World Economy</option>
<option value="Scandals">Scandals</option>
<option value="Mexico">Mexico</option>
<option value="South America">South America</option>
<option value="Europe">Europe</option>
<option value="Asia">Asia</option>
<option value="Africa">Africa</option>
 
    </select>
  </div>
</div>
<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Article Title:</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
{/* <input
  type="text"
  id="property-name"
  name="title"
  value={title}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
  required
/> */}
<textarea 
  name="title" 
  placeholder="Enter the Article Title.."

  rows={5}
  cols={100}
  value={title}
  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}
  required
>
</textarea>


</div>
</div>
<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Article Author</h2>
</div>

<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="owner">Author: </label>
<input
  type="text"
  id="owner"
  name="owner"
  onChange={(e: ChangeEvent<HTMLInputElement>) => setOwner(e.target.value)}
  />
</div> 
          <div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="authpic">Author Image: </label>
<input
  type="file"
  id="authpic"
  name="authpic"
  onChange={handleFileChange(setAuthPicFile)}
  />
</div> 

          </div>

          <hr />

<div className="sm-adminform" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>          
<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="cover_image">Featured Image: </label>
<input
  type="file"
  id="cover_image"
  name="cover_image"
  accept="image/*"
  onChange={handleFileChange(setCover_Image)}
  />
</div> 
</div>

<hr />
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <h2>Intro</h2>
          </div>
          <div className="sm-adminform" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'grid', gap: '1rem', width: '100%' }}>
              <textarea
                rows={10}
                placeholder="Enter the introductory text.."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
<hr />
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <h2>Body</h2>
          </div>
          <div className="sm-adminform" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'grid', gap: '1rem', width: '100%' }}>
              <textarea
                rows={10}
                placeholder="Enter the body content..."
                value={bodycontent}
                onChange={(e) => setBodyContent(e.target.value)}
              ></textarea>
            </div>
          </div>
<hr />
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <h2>End</h2>
          </div>
          <div className="sm-adminform" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'grid', gap: '1rem', width: '100%' }}>
              <textarea
                rows={10}
                placeholder="Enter the ending content..."
                value={endcontent}
                onChange={(e) => setEndContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button type="submit" disabled={!isSignedIn || !content || !selectedCollection || isLoading}>
  {isLoading ? (
    <BeatLoader color={"#ffffff"} loading={isLoading} size={10} />
  ) : (
    'Submit Article'
  )}
</button>
        </form>
      </div>
      </>
  );
};

export default AdminForm