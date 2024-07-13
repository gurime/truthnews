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
export default function AdminEdit({ comment, onSave,  onCancel }: AdminEditProps) {
  const [articleId, setArticleId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [names, setNames] = useState<string[]>([]);
  const [title, setTitle] = useState<string>(comment ? comment.title : "");
  const [owner, setOwner] = useState<string>(comment ? comment.owner : "");
  const [content, setContent] = useState<string>(comment ? comment.content : '');
  const [catorgory, setCatorgory] = useState<string>(comment ? comment.catorgory : '');
  const [bodycontent, setBodyContent] = useState<string>(comment ? comment.bodycontent : '');
  const [endcontent, setEndContent] = useState<string>(comment ? comment.endcontent : '');
  const [selectedCollection, setSelectedCollection] = useState<string>(comment ? comment.propertyType : "Featured Dashboard");
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
bodycontent,
endcontent,
title,
owner,
timestamp: new Date(),
userEmail: user?.email,
authpic,
coverimage,
propertyType: selectedCollection,
});
window.location.reload();
window.scrollTo(0, 0);
} else {
}
} catch (error) {
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
<option value="Politics Dashboard">Politics Dashboard</option>
<option value="Music Dashboard">Music Dashboard</option>
<option value="Technology Dashboard">Technology Dashboard</option>
<option value="Sports Dashboard">Sports Dashboard</option>
<option value="Military Dashboard">Military Dashboard</option>
<option value="Crime Dashboard">Crime Dashboard</option>
<option value="Economy Dashboard">Economy Dashboard</option>
<option value="Immigration Dashboard">Immigration Dashboard</option>
<option value="Business Dashboard">Business Dashboard</option>
<option value="Video Games Dashboard">Video Games Dashboard</option>
<option value="Entertainment Dashboard">Entertainment Dashboard</option>
<option value="Fashion Dashboard">Fashion Dashboard</option>
<option value="Education Dashboard">Education Dashboard</option>
<option value="United Nations Dashboard">United Nations Dashboard</option>
<option value="Terrorism Dashboard">Terrorism Dashboard</option>
<option value="World Economy Dashboard">World Economy Dashboard</option>
<option value="Scandals Dashboard">Scandals Dashboard</option>
<option value="Mexico Dashboard">Mexico Dashboard</option>
<option value="South America Dashboard">South America Dashboard</option>
<option value="Europe Dashboard">Europe Dashboard</option>
<option value="Asia Dashboard">Asia Dashboard</option>
<option value="Africa Dashboard">Africa Dashboard</option>
{/* home page stops here */}
<option value="Featured Technology">Featured Technology</option>
<option value="Headline Technology"> Technology</option>
<option value="Opinion Technology">Opinion Technology</option>
<option value="GPU Technology">GPU Technology</option>
<option value="CPU Technology">CPU Technology</option>
<option value="Cybersecurity Technology">Cybersecurity Technology</option>
<option value="Machine Learning Technology">Machine Learning Technology</option>
<option value="Emerging Technology">Emerging Technology</option>
<option value="Consumer Technology">Consumer Technology</option>
<option value="Enterprise Technology">Enterprise Technology</option>
<option value="Blockchain Technology">Blockchain Technology</option>
<option value="Space Technology">Space Technology</option>
{/* technology page stops here */}
<option value="Featured Politics">Featured Politics</option>
<option value=" Headline Politics"> Headline Politics</option>
<option value='Opinion Politics'>Opinion Politics</option>
<option value="Local Politics">Local Politics</option>
<option value="National Politics">National Politics</option>
<option value="International Politics">International Politics</option>
<option value="Election Politics">Election Politics</option>
<option value="Economic Politics">Economic Politics</option>
<option value="Environmental Politics">Environmental Politics</option>
<option value="Social Politics">Social Politics</option>
<option value="Education Politics">Education Politics</option>
{/* politics page stops here */}
<option value="Featured Opinion">Featured Opinion</option>
<option value="Headline Opinion">Headline Opinion</option>
<option value="Guest Opinion">Guest Opinion</option>
<option value="Cultural Opinion">Cultural Opinion</option>
<option value="Technology Opinion">Technology Opinion</option>
<option value="Economic Opinion">Economic Opinion</option>
<option value="Environmental Opinion">Environmental Opinion</option>
<option value="Social Opinion">Social Opinion</option>
<option value="Educational Opinion">Educational Opinion</option>
{/* Opnion page stops here */}
<option value="Featured Music">Featured Music</option>
<option value="Headline Music">Headline Music</option>
<option value="Opinion Music">Opinion Music</option>
<option value="Industry Music">Industry Music</option>
<option value="Technology Music">Technology Music</option>
<option value="Events Music">Events Music</option>
<option value="Culture Music">Culture Music</option>
<option value="Video Music">Music Videos</option>
<option value="Interview Music">Music Interviews</option>
{/* music page stops here */}
<option value="Featured Sports">Featured Sports</option>
<option value="Headline Sports">Headline Sports</option>
<option value="Opinion Sports">Opinion Sports</option>
<option value="Stats Sports">Stats Sports</option>
<option value="Fantasy Sports">Fantasy Sports</option>
<option value="Gear Sports">Sports Gear</option>
<option value="Guest Sports">Guest Sports</option>
<option value="Interview Sports">Interview Sports</option>
<option value="E Sports">E-Sports</option>
{/* sports page stops here */}
<option value="Featured Military">Featured Military</option>
<option value="Headline Military"> Headline Military</option>
<option value="Opinion Military"> Opinion Military</option>
<option value="Local Military"> Local Military</option>
<option value="National Military"> National Military</option>
<option value="International Military"> International Military</option>
<option value="Technology Military"> Technology Military</option>
<option value="Veterans Military"> Veterans Military</option>
{/* military page stops here */}
<option value="Featured Crime">Featured Crime</option>
<option value=" Headline Crime">Headline Crime</option>
<option value=" Opinion Crime">Opinion Crime</option>
<option value=" Financial Crime">Financial Crime</option>
<option value=" Property Crime">Property Crime</option>
<option value=" Unsolved Crime">Unsolved Crime</option>
{/* crime page stops here */}
<option value="Featured Economy">Featured Economy</option>
<option value=" Headline Economy"> Headline Economy</option>
<option value=" Opinion Economy"> Opinion Economy</option>
<option value=" Market Economy"> Market Economy</option>
<option value=" Government Economy"> Government Economy</option>
{/* economy page stips here */}
<option value="Featured Immigration">Featured Immigration</option>
<option value=" Headline Immigration"> Headline Immigration</option>
<option value=" Opinion Immigration"> Opinion Immigration</option>
<option value=" Border Immigration"> Border Immigration</option>
<option value=" Refugee Immigration"> Refugee Immigration</option>
<option value=" Politics Immigration"> Refugee Immigration</option>
<option value=" Global Immigration"> Global Immigration</option>
{/* Immigration page stops here */}
<option value="Featured Business">Featured Business</option>
<option value="Headline Business">Headline Business</option>
<option value="Opinion Business">Opinion Business</option>
<option value="Enterprise Business">Enterprise Business</option>
<option value="Global Business">Global Business</option>
<option value="Small Business">Small Business</option>
<option value="Leadership Business">Leadership Business</option>
{/* Business page stops here */}
<option value="Featured Video Games">Featured Video Games</option>
<option value="Headline Video Games">Headline Video Games</option>
<option value="Opinion Video Games">Opinion Video Games</option>
<option value=" Video Games Deals"> Video Game Deals</option>
<option value="Playstation Gaming">Playstation</option>
<option value="Xbox Gaming">Xbox</option>
<option value="Nintendo Gaming">Nintendo</option>
<option value="PC Gaming">PC</option>
<option value="Mobile Gaming">Mobile Gaming</option>
<option value="Hardware Gaming">Hardware Gaming</option>
<option value="Indie Gaming">Hardware</option>
{/* Video Games Page stops here */}
<option value="Featured Entertainment">Featured Entertainment</option>
<option value="Headline Entertainment">Headline Entertainment</option>
<option value="Opinion Entertainment">Opinion Entertainment</option>
<option value="Industry Entertainment">Industry Entertainment</option>
<option value="Fan Entertainment">Fan Entertainment</option>
<option value="Awards Entertainment">Awards Entertainment</option>
<option value="Movie Entertainment">Movie Entertainment</option>
<option value="TV Entertainment">TV Entertainment</option>
{/* Entertainment page stops here */}
<option value="Featured Fashion">Featured Fashion</option>
<option value="Headline Fashion">Headline Fashion</option>
<option value="Opinion Fashion">Opinion Fashion</option>
<option value="Seasonal Trends">Seasonal Trends</option>
<option value="Celebrity Styles">Celebrity Styles</option>
<option value="Fashion Events">Fashion Events</option>
<option value="Fashion Reviews">Fashion Reviews</option>
<option value="Fashion Industry News">Fashion Industry News</option>
<option value="Fashion Interviews">Fashion Interviews</option>
<option value="Fashion Technology">Fashion Technology</option>
{/* Fashion page stops here */}
<option value="Featured Education">Featured Education</option>
<option value="Headline Education">Headline Education</option>
<option value="Opinion Education">Opinion Education</option>
<option value="Higher Education">Higher Education</option>
<option value="K-12 Education">K-12 Education</option>
<option value="Education Funding">Education Funding</option>
<option value="International Education">International Education</option>
<option value="Special Education">Special Education</option>
{/* Education page stops here */}
<option value="Featured U.N. (United Nations)">Featured U.N. (United Nations)</option>
<option value="Headline U.N.">Headline U.N. (United Nations)</option>
<option value="Opinion U.N.">Opinion U.N. (United Nations)</option>
<option value="Peacekeeping Operations">Peacekeeping Operations</option>
<option value="Human Rights Initiatives">Human Rights Initiatives</option>
<option value="Climate Action">Climate Action</option>
<option value="U.N. General Assembly">U.N. General Assembly</option>
<option value="Humanitarian Efforts">Humanitarian Efforts</option>
<option value="U.N. Agencies">U.N. Agencies</option>
<option value="Refugee Assistance">Refugee Assistance</option>
{/* UN page stops here */}
<option value="Featured Terrorism">Featured Terrorism</option>
<option value="Headline Terrorism">Headline Terrorism</option>
<option value="Opinion Terrorism">Opinion Terrorism</option>
<option value="Global Terrorism Trends">Global Terrorism Trends</option>
<option value="Terrorism and Security">Terrorism and Security</option>
<option value="Terrorist Organizations">Terrorist Organizations</option>
<option value="Terrorism Financing">Terrorism Financing</option>
<option value="Domestic Terrorism">Domestic Terrorism</option>
<option value="International Terrorism">International Terrorism</option>
<option value="Cyberterrorism">Cyberterrorism</option>
{/* terrorism page stops here */}
<option value="Featured World Economy">Featured World Economy</option>
<option value="Headline World Economy">Headline World Economy</option>
<option value="Opinion World Economy">Opinion World Economy</option>
<option value="Global Market Trends">Global Market Trends</option>
<option value="International Trade">International Trade</option>
<option value="Economic Growth">Economic Growth</option>
<option value="Currency Exchange">Currency Exchange</option>
<option value="Economic Forecasts">Economic Forecasts</option>
<option value="Global Inflation">Global Inflation</option>
<option value="Economic Sanctions">Economic Sanctions</option>
<option value="Global Supply Chain">Global Supply Chain</option>
{/* world economy page stops here */}
<option value="Featured Scandals">Featured Scandals</option>
<option value="Headline Scandals">Headline Scandals</option>
<option value="Opinion Scandals">Opinion Scandals</option>
<option value="Political Scandals">Political Scandals</option>
<option value="Corporate Scandals">Corporate Scandals</option>
<option value="Financial Scandals">Financial Scandals</option>
<option value="Sports Scandals">Sports Scandals</option>
<option value="Education Scandals">Education Scandals</option>
<option value="Entertainment Scandals">Entertainment Scandals</option>
<option value="Religious Scandals">Religious Scandals</option>
<option value="Healthcare Scandals">Healthcare Scandals</option>
<option value="International Scandals">International Scandals</option>
<option value="Fashion Scandals"> Fashion Scandals</option>
<option value="Military Scandals">Military Scandals</option>
{/* scandals page stops here */}
<option value="Featured Mexico">Featured Mexico</option>
<option value="Headline Mexico">Headline Mexico</option>
<option value="Opinion Mexico">Opinion Mexico</option>
<option value="Mexican Politics">Mexican Politics</option>
<option value="Mexican Economy">Mexican Economy</option>
<option value="Mexican Culture">Mexican Culture</option>
<option value="Mexican Education">Mexican Education</option>
<option value="Mexican Healthcare">Mexican Healthcare</option>
<option value="U.S. Mexico Relations">U.S.-Mexico Relations</option>
<option value="Mexican Environment">Mexican Environment</option>
<option value="Mexican History">Mexican History</option>
<option value="Mexican Sports">Mexican Sports</option>
<option value="Social Issues">Social Issues</option>
{/* mexico page stops here */}
<option value="Featured South America">Featured South America</option>
<option value="Headline South America">Headline South America</option>
<option value="Opinion South America">Opinion South America</option>
<option value="South America Politics">South America Politics</option>
<option value="South America Economy">South America Economy</option>
<option value="South America Tourism">South America Tourism</option>
<option value="South America Education">South America Education</option>
<option value="South America Culture">South America Culture</option>
<option value="South America Technology">South America Technology</option>
{/* south america page stops here */}
<option value="Featured Europe">Featured Europe</option>
<option value="Headline Europe">Headline Europe</option>
<option value="Opinion Europe">Opinion Europe</option>
<option value="Europe Politics">Europe Politics</option>
<option value="Europe Economy">Europe Economy</option>
<option value="Europe Technology">Europe Technology</option>
<option value="Europe Sports">Europe Sports</option>
<option value="Europe Culture">Europe Culture</option>
<option value="Eastern Europe">Eastern Europe</option>
<option value="Northern Europe">Northern Europe</option>
<option value="Western Europe">Western Europe</option>
<option value="Southern Europe">Southern Europe</option>

{/* europe page stops here */}
<option value="Featured Asia">Featured Asia</option>
<option value="Headline Asia">Headline Asia</option>
<option value="Opinion Asia">Opinion Asia</option>
<option value="Asia Politics">Asia Politics</option>
<option value="Asia Economy">Asia Economy</option>
<option value="Asia Technology">Asia Technology</option>
<option value="Asia Culture">Asia Culture</option>
<option value="Asia Tourism">Asia Tourism</option>
<option value="Asia Education">Asia Education</option>
<option value="South Asia">South Asia</option>
<option value="Southeast Asia">Southeast Asia</option>
<option value="East Asia">East Asia</option>
<option value="Central Asia">Central Asia</option>

{/* asia page stops here */}
<option value="Featured Africa">Featured Africa</option>
<option value="Headline Africa">Headline Africa</option>
<option value="Opinion Africa">Opinion Africa</option>
<option value="Africa Politics">Africa Politics</option>
<option value="Africa Economy">Africa Economy</option>
<option value="Africa Technology">Africa Technology</option>
<option value="Africa Culture">Africa Culture</option>
<option value="Africa Tourism">Africa Tourism</option>
<option value="Africa Education">Africa Education</option>
<option value="Northern Africa">Northern Africa</option>
<option value="Western Africa">Western Africa</option>
<option value="Eastern Africa">Eastern Africa</option>
<option value="Southern Africa">Southern Africa</option>
<option value="Central Africa">Central Africa</option>
{/* africa page stops here */}
<option value="Featured Food">Featured Food</option>
<option value="Headline Food">Headline Food</option>
{/* Food page stops here */}
<option value="Featured Cars">Featured Cars</option>
<option value="Headline Cars">Headline Cars</option>
{/* Food page stops here */}
<option value="Featured House">Featured House</option>
<option value="Headline House">Headline House</option>
{/* House page stops here */}
<option value="Featured Pets">Featured Pets</option>
<option value="Headline Pets">Headline Pets</option>
{/* Pets page stops here */}
<option value="Featured Fitness">Featured Fitness</option>
<option value="Headline Fitness">Headline Fitness</option>
{/* Fitness page stops here */}
<option value="Featured Family">Featured Family</option>
<option value="Headline Family">Headline Family</option>
{/* Family page stops here */}
<option value="Featured Faith">Featured Faith</option>
<option value="Headline Faith">Headline Faith</option>
{/* Faith page stops here */}
<option value="Featured Books">Featured Books</option>
<option value="Headline Books">Headline Books</option>
{/* Faith page stops here */}
<option value="Featured Pride">Featured Pride</option>
<option value="Headline Pride">Headline Pride</option>
{/* Pride page stops here */}
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
value={owner}
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
id="content"
placeholder="Update introductory text.."
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