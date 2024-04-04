'use client'
import { auth } from '@/app/firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

interface AdminEditProps {
  comment: any;
  onSave: (postId: string, editedContent: string) => Promise<void>;
  onCancel: () => void;
}

interface UserData {
    firstName: string;
    lastName: string;
  }

export default function AdminEdit({ comment, onSave, onCancel }: AdminEditProps) {
const [articleId, setArticleId] = useState<string>('');
const [isLoading, setIsLoading] = useState<boolean>(true);
const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
const [names, setNames] = useState<string[]>([]);
const [errorMessage, setErrorMessage] = useState<string>('');
const [title, setTitle] = useState<string>(comment ? comment.title : "");
const [owner, setOwner] = useState<string>(comment ? comment.owner : "");
const [content, setContent] = useState<string>(comment ? comment.content : '');
const [catorgory, setCatorgory] = useState<string>(comment ? comment.catorgory : '');
const [bodycontent, setBodyContent] = useState<string>(comment ? comment.bodycontent : '');
const [endcontent, setEndContent] = useState<string>(comment ? comment.endcontent : '');
const [selectedCollection, setSelectedCollection] = useState<string>(comment ? comment.propertyType : "");
const [authPicFile, setAuthPicFile] = useState<File | null>(null);
const [cover_image, setCover_Image] = useState<File | null>(null);




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
}    } catch (error) {
handleError(error);
} finally {
setIsLoading(false)
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
      const auth = getAuth();
      const user = auth.currentUser;
      setIsLoading(true);
      const uniqueArticleId = uuidv4();
      setArticleId(uniqueArticleId);
      const isUpdate = !!comment.id;  
      const authpic = authPicFile ? await handleFileUpload(authPicFile, `images/${uniqueArticleId}authpic.jpg`) : null;
   
  
  
const coverimage = cover_image ? await handleFileUpload(cover_image, `images/${uniqueArticleId}cover_image.jpg`) : null;
const db = getFirestore();
if (isUpdate && comment.id && selectedCollection) {
const docRef = doc(db, selectedCollection, comment.id);
await updateDoc(docRef, {
userId: user?.uid,
content,
title,
owner,
timestamp: new Date(),
userEmail: user?.email,
authpic,
coverimage,
propertyType: selectedCollection, 
});
        window.location.reload()
  
        window.scrollTo(0, 0); 
      } else {
        setErrorMessage('Error: Cannot add a new document without articleId.');
      }
    } catch (error) {
     
  console.log(error)
  
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  const handleCancel = () => {
    onCancel();
    window.scrollTo(0,0)
  };

  const handleSave = (postId: string, editedContent: string) => {
    onSave(postId, editedContent);
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
    <label htmlFor="selectedCollection">Select Topic:</label>
    <select
      name="selectedCollection"
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
  value={owner}
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
                placeholder="Update introductory text.."
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
                placeholder="Update body content..."
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
                placeholder="Update ending content..."
                value={endcontent}
                onChange={(e) => setEndContent(e.target.value)}
              ></textarea>
            </div>
          </div>
<button type="submit" 
disabled={!isSignedIn ||  !selectedCollection ||   isLoading}
style={{
cursor: !isSignedIn ||  !selectedCollection  ||   isLoading ?  'none' : 'pointer',
backgroundColor: !isSignedIn ||  !selectedCollection ||  isLoading ? '#9e9e9e' : '#00a8ff',
color: !isSignedIn ||  !selectedCollection  ||  isLoading ? 'grey' : '#fff',

}}>  {isLoading ? (
    <BeatLoader color={"#fff"} loading={isLoading} size={10} />
) : (
'Update '
  )}
</button> 
<button style={{backgroundColor:'red'}} onClick={handleCancel}>Cancel</button>
</form>
</div>
</>
);
}