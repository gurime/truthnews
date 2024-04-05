'use client'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { auth } from '@/app/firebase/firebase';
interface AdminEditProps {
  comment: any;
  onSave: (postId: string, editedContent: string) => Promise<void>;
  onCancel: () => void;
}
interface UserData {
  firstName: string;
  lastName: string;
 
}

async function checkIfUserIsAdmin(user: User): Promise<boolean> {
  const db = getFirestore();
  const adminUsersRef = collection(db, 'adminusers');
  const querySnapshot = await getDocs(query(adminUsersRef, where('uid', '==', user.uid)));

  return !querySnapshot.empty;

}
export default function AdminEdit({ comment,  onCancel }: AdminEditProps) {
  const [articleId, setArticleId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
  const getUserData = async (userId: string) => {
  try {
  const db = getFirestore();
  const userDocRef = doc(db, 'adminusers', userId);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
  const userData = userDocSnapshot.data();
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
  if (userData) { // Check if userData is not null before accessing properties
    setNames([userData.firstName, userData.lastName]);
  } else {
    // Handle case where userData is null
  }  } catch (error) {
  } finally {
  setIsLoading(false)
  }
  }
  });
  return () => unsubscribe();
  }, []);
  

  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const isUserAdmin = await checkIfUserIsAdmin(user);
        setIsLoading(isUserAdmin);
      } else {
        setIsAdmin(false); // Correct usage
      }
      setIsSignedIn(!!user);
    });
  
    return unsubscribe;
  }, []);

const handleCancel = () => {
  onCancel();
  window.scrollTo(0,0)

};


const storage = getStorage(); 

const handleFileChange = (setter: (file: File | null) => void) => (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files ? e.target.files[0] : null;
  setter(file);
  };
  
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
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('handleSubmit triggered');
  
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
      console.log('Data prepared for update:', { title, content, owner, authpic, coverimage });
  
      if (isUpdate && comment.id && selectedCollection) {
        const docRef = doc(db, selectedCollection, comment.id);
        console.log('Updating document:', docRef.id);
  
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
  
        console.log('Document updated successfully:', docRef.id);
        window.location.reload();
        window.scrollTo(0, 0);
      } else if (!comment.id && selectedCollection) {
        // Create a new document
        const newDocRef = doc(collection(db, selectedCollection));
        console.log('Creating new document:', newDocRef.id);
  
        await setDoc(newDocRef, {
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
  
        console.log('New document created successfully:', newDocRef.id);
        window.location.reload();
        window.scrollTo(0, 0);
      } else {
        setErrorMessage('Error: Missing required fields for creating a new document.');
        console.log('Error:', errorMessage);
      }
    } catch (error) {
      console.error('Error occurred during form submission:', error);
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
                id="content"
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
                id="bodycontent"

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
                id="endcontent"

                placeholder="Update ending content..."
                value={endcontent}
                onChange={(e) => setEndContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
  type="submit"
  // disabled={
  //   !isSignedIn ||
  //   !selectedCollection ||
  //   isLoading ||
  //   !title ||
  //   !owner ||
  //   !content ||
  //   !bodycontent ||
  //   !endcontent ||
  //   !isAdmin
  // }
  // style={{
  //   cursor:   !isSignedIn ||
  //   !selectedCollection ||
  //   isLoading ||
  //   !title ||
  //   !owner ||
  //   !content ||
  //   !bodycontent ||
  //   !endcontent ||
  //   !isAdmin ? 'none' : 'pointer',
  //   backgroundColor:   !isSignedIn ||
  //   !selectedCollection ||
  //   isLoading ||
  //   !title ||
  //   !owner ||
  //   !content ||
  //   !bodycontent ||
  //   !endcontent ||
  //   !isAdmin ? '#9e9e9e' : '#00a8ff',
  //   color:    !isSignedIn ||
  //   !selectedCollection ||
  //   isLoading ||
  //   !title ||
  //   !owner ||
  //   !content ||
  //   !bodycontent ||
  //   !endcontent ||
  //   !isAdmin ? 'grey' : '#fff',
  // }}
>
  {isLoading ? (
    <BeatLoader color={"#ffffff"} loading={isLoading} size={10} />
  ) : (
    'Update'
  )}
</button>

<button style={{backgroundColor:'red'}} onClick={handleCancel}>Cancel</button>
</form>
</div>

</>
)
}