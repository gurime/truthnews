'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '@/app/firebase/firebase';


const AdForm: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [bodycontent, setBodyContent] = useState<string>('');
  const [endcontent, setEndContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [authPicFile, setAuthPicFile] = useState<File | null>(null);
  const [cover_image, setCover_Image] = useState<File | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('Featured Dashboard');
  const acceptedCollections = ["Featured Dashboard"];
  const [catorgory, setCatorgory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  useEffect(() => {
    const verifyToken = () => {
      const storedToken = localStorage.getItem('articleSubmissionToken');
      if (storedToken) {
        const { token, expiration } = JSON.parse(storedToken);
        if (Date.now() < expiration && token === params.token) {
          setHasAccess(true);
        } else {
          localStorage.removeItem('articleSubmissionToken');
          router.push('/pages/AdvertiseForm');
        }
      } else {
        router.push('/payment');
      }
    };
    verifyToken();
  }, [params, router]);

  const handleFileChange = (setter: (file: File | null) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setter(file);
  };

  const storage = getStorage();
 

  const handleFileUpload = async (file: File, storagePath: string): Promise<string> => {
    try {
      const storageRef = ref(storage, storagePath);
      await uploadBytesResumable(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAccess) {
      setErrorMessage('You do not have access to submit articles.');
      return;
    }
    try {
      setIsLoading(true);
      const uniqueArticleId = uuidv4();

      const authpic = authPicFile ? await handleFileUpload(authPicFile, `images/${uniqueArticleId}authpic.jpg`) : null;
      const coverimage = cover_image ? await handleFileUpload(cover_image, `images/${uniqueArticleId}cover_image.jpg`) : null;

      await addDoc(collection(db, selectedCollection), {
        content,
        bodycontent,
        endcontent,
        catorgory,
        title,
        owner,
        timestamp: new Date(),
        authpic,
        coverimage,
        propertyType: selectedCollection,
      });

      // Remove access token after successful submission
      localStorage.removeItem('articleSubmissionToken');
      setHasAccess(false);

      router.push('/');
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorMessage('An error occurred while submitting the article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasAccess) {
    return <div>You do not have access to this page. Please purchase access to submit an article.</div>;
  }

  return (
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
    className='billingselect'>
    <option value="Featured Dashboard">Featured Dashboard</option>
    
    </select>
    </div>
    
    <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="catorgory">Select Topic:</label>
    <select
    name="catorgory"
    value={catorgory}
    onChange={(e) => setCatorgory(e.target.value)}
    required
    className='billingselect'>
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
    <option value="Pride">Pride</option>
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
    required>
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
    onChange={(e: ChangeEvent<HTMLInputElement>) => setOwner(e.target.value)}/>
    </div> 
    
    <div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
    <label htmlFor="authpic">Author Image: </label>
    <input
    type="file"
    id="authpic"
    name="authpic"
    onChange={handleFileChange(setAuthPicFile)}/>
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
    onChange={handleFileChange(setCover_Image)}/>
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
    onChange={(e) => setContent(e.target.value)}>
    </textarea>
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
    onChange={(e) => setBodyContent(e.target.value)}>
    </textarea>
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
    onChange={(e) => setEndContent(e.target.value)}>
    </textarea>
    </div>
    </div>
    <button type="submit" disabled={ !content || !selectedCollection || isLoading}>
    {isLoading ? (
    <BeatLoader color={"#ffffff"} loading={isLoading} size={10} />
    ) : (
    'Submit Article'
    )}
    </button>
    </form>
    </div>
  );
};

export default AdForm;

function setArticleId(uniqueArticleId: string) {
    throw new Error('Function not implemented.');
}
