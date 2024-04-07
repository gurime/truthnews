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
 // Pictures
const [articleId, setArticleId] = useState<string>('');
const [selectedCollection, setSelectedCollection] = useState<string>('Featured Dashboard');
const acceptedCollections = [
'Featured Dashboard',
'Headline Dashboard',
'Opinion Dashboard',
'Politics Dashboard',
'Music Dashboard',
'Technology Dashboard',
'Sports Dashboard',
//Home Page stops here
'Featured Technology',
'Technology',
//Tech page stops here
'Featured Politics',
'Politics',
//Politics page stops here
'Featured Opinion',
'Opinion',
//Opinion page stops here
'Featured Music',
'Music',
//Music page stops here
'Featured Sports',
'Sports',
//Sports page stops here
'Featured Military',
'Military',
//Military page stops here
'Featured Crime',
'Crime',
//Crime page stops here
'Featured Economy',
'Economy',
//Economy page stops here
'Featured Immigration',
'Immigration',
//Immigration page stops here
'Featured Business',
'Business',
//Business page stops here
'Featured Video Games',
'Video Games',
//Video Games page stops here
'Featured Entertainment',
'Entertainment',
//Entertainment page stops here
'Featured Fashion',
'Fashion',
//Fashion page stops here
'Featured Education',
'Education',
//Education page stops here
'Featured U.N. (United Nations)',
'U.N. (United Nations)',
//U.N. page stops here
'Featured Terrorism',
'Terrorism',
//Terrism page stops here
'Featured World Economy',
'World Economy',
//Economy page stops here
'Featured Scandals',
'Scandals',
//Scandals page stops here
'Featured Mexico',
'Mexico',
//Mexico page stops here
'Featured South America',
'South America',
//South America page stops here
'Featured Europe',
'Europe',
//Europe page stops here
'Featured Asia',
'Asia',
//Asia page stops here
'Featured Africa',
'Africa'
//Africa page stops here
];
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
const file = e.target.files ? e.target.files[0] : null;setter(file);};

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
case 'Opinion Dashboard':
case 'Politics Dashboard':
case 'Music Dashboard':
case 'Technology Dashboard':
case 'Sports Dashboard':
router.push('/');
break;
case 'Featured Technology':
case 'Technology':
router.push('/pages/Technology');
break;
case 'Featured Politics':
case 'Politics':
router.push('/pages/Politics');
break;
case 'Featured Opinion':
case 'Opinion':
router.push('/pages/Opinion');
break;
case 'Featured Music':
case 'Music':
router.push('/pages/Music');
break;
case 'Featured Sports':
case 'Sports':
router.push('/pages/Sports');
break;
case 'Featured Military':
case 'Military':
router.push('/pages/Military');
break;
case 'Featured Crime':
case 'Crime':
router.push('/pages/Crime');
break;
case 'Featured Economy':
case 'Economy':
router.push('/pages/Economy');
break;
case 'Featured Immigration':
case 'Immigration':
router.push('/pages/Immigration');
break;
case 'Featured Business':
case 'Business':
router.push('/pages/Business');
break;
case 'Featured Video Games':
case 'Video Games':
router.push('/pages/VideoGames');
break;
case 'Featured Entertainment':
case 'Entertainment':
router.push('/pages/Entertainment');
break;
case 'Featured Fashion':
case 'Fashion':
router.push('/pages/Fashion');
break;
case 'Featured Education':
case 'Education':
router.push('/pages/Education');
break;
case 'Featured U.N. (United Nations)':
case 'U.N.':
router.push('/pages/UN');
break;
case 'Featured Terrorism':
case 'Terrorism':
router.push('/pages/Terrorism');
break;
case 'Featured Economy':
case 'World Economy':
router.push('/pages/WorldEconomy');
break;
case 'Featured Scandals':
case 'Scandals':
router.push('/pages/Scandals');
break;
case 'Featured Mexico':
case 'Mexico':
router.push('/pages/Mexico');
break;
case 'Featured South America':
case 'South America':
router.push('/pages/SouthAmerica');
break;
case 'Featured Europe':
case 'Europe':
router.push('/pages/Europe');
break;
case 'Featured Asia':
case 'Asia':
router.push('/pages/Asia');
break;
case 'Featured Africa':
case 'Africa':
router.push('/pages/Africa');
break;
default:
router.push('/not-found');
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
className='billingselect'>
<option value="Featured Dashboard">Featured Dashboard</option>
<option value="Headline Dashboard">Headline Dashboard</option>
<option value="Opinion Dashboard">Opinion Dashboard</option>
<option value="Technology Dashboard">Technology Dashboard</option>
<option value="Music Dashboard">Music Dashboard</option>
<option value="Politics Dashboard">Politics Dashboard</option>
<option value="Sports Dashboard">Sports Dashboard</option>
<option value="Featured Technology">Featured Technology</option>
<option value=" Technology"> Technology</option>
<option value="Featured Politics">Featured Politics</option>
<option value=" Politics"> Politics</option>
<option value="Featured Opinion">Featured Opinion</option>
<option value=" Opinion"> Opinion</option>
<option value="Featured Music">Featured Music</option>
<option value="Music">Music</option>
<option value="Featured Sports">Featured Sports</option>
<option value="Sports">Sports</option>
<option value="Featured Military">Featured Military</option>
<option value="Military"> Military</option>
<option value="Featured Crime">Featured Crime</option>
<option value=" Crime"> Crime</option>
<option value="Featured Economy">Featured Economy</option>
<option value=" Economy"> Economy</option>
<option value="Featured Immigration">Featured Immigration</option>
<option value=" Immigration"> Immigration</option>
<option value="Featured Business">Featured Business</option>
<option value="Business">Business</option>
<option value="Featured Video Games">Featured Video Games</option>
<option value="Video Games">Video Games</option>
<option value="Featured Entertainment">Featured Entertainment</option>
<option value="Entertainment">Entertainment</option>
<option value="Featured Fashion">Featured Fashion</option>
<option value="Fashion">Fashion</option>
<option value="Featured Education">Featured Education</option>
<option value="Education">Education</option>
<option value="Featured U.N. (United Nations)">Featured U.N. (United Nations)</option>
<option value="U.N.">U.N. (United Nations)</option>
<option value="Featured Terrorism">Featured Terrorism</option>
<option value="Terrorism">Terrorism</option>
<option value="Featured World Economy">Featured World Economy</option>
<option value="World Economy">World Economy</option>
<option value="Featured Scandals">Featured Scandals</option>
<option value="Scandals">Scandals</option>
<option value="Featured Mexico">Featured Mexico</option>
<option value="Mexico">Mexico</option>
<option value="Featured South America">Featured South America</option>
<option value="South America">South America</option>
<option value="Featured Europe">Featured Europe</option>
<option value="Europe">Europe</option>
<option value="Featured Asia">Featured Asia</option>
<option value="Asia">Asia</option>
<option value="Featured Africa">Featured Africa</option>
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