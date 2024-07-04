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
"Featured Dashboard", 
"Headline Dashboard", 
"Opinion Dashboard", 
"Politics Dashboard", 
"Music Dashboard", 
"Technology Dashboard", 
"Sports Dashboard", 
"Military Dashboard", 
"Crime Dashboard", 
"Economy Dashboard", 
"Immigration Dashboard", 
"Business Dashboard", 
"Video Games Dashboard", 
"Entertainment Dashboard", 
"Fashion Dashboard", 
"Education Dashboard", 
"United Nations Dashboard", 
"Terrorism Dashboard", 
"World Economy Dashboard", 
"Scandals Dashboard", 
"Mexico Dashboard", 
"South America Dashboard", 
"Europe Dashboard", 
"Asia Dashboard", 
"Africa Dashboard",
//Home Page stops here
'Featured Technology',
'Headline Technology',
'Opinion Technology',
'GPU Technology',
'CPU Technology',
'Cybersecurity Technology',
'Machine Learning Technology',
'Emerging Technology',
'Consumer Technology',
'Enterprise Technology',
'Blockchain Technology',
'Space Technology',
//Tech page stops here
'Featured Politics',
'Headline Politics',
'Opinion Politics',
'Local Politics',
'National Politics',
'International Politics',
'Election Politics',
'Economic Politics',
'Enviromental Politics',
'Social Politics',
'Education Politics',
//Politics page stops here
'Featured Opinion',
'Headline Opinion',
'Guest Opinion',
'Cultural Opinion',
'Technology Opinion',
'Economic Opinion',
'Enviromental Opinion',
'Social Opinion',
'Educational Opinion',
//Opinion page stops here
'Featured Music',
'Headline Music',
'Opinion Music',
'Industry Music',
'Technology Music',
'Events Music',
'Culture Music',
'Video Music',
'Interview Music',
//Music page stops here
'Featured Sports',
'Headline Sports',
'Opinion Sports',
'Featured Sports',
'Headline Sports',
'Opinion Sports',
"Featured Sports",
"Headline Sports",
"Opinion Sports",
"Stats Sports",
"Fantasy Sports",
"Gear Sports",
"Guest Sports",
"Interview Sports",
"E-Sports",
//Sports page stops here
'Featured Military',
'Headline Military',
'Opinion Military',
'Local Military',
'National Military',
'International Military',
'Technology Military',
'Veterans Military',
//Military page stops here
'Featured Crime',
'Headline Crime',
'Opinion Crime',
" Financial Crime",
" Property Crime",
" Unsolved Crime",
//Crime page stops here
'Featured Economy',
'Headline Economy',
'Opinion Economy',
'Market Economy',
'Goverment Economy',
//Economy page stops here
'Featured Immigration',
'Headline Immigration',
'Opinion Immigration',
" Border Immigration",
" Refugee Immigration",
" Politics Immigration",
" Global Immigration",
//Immigration page stops here
'Featured Business',
'Headline Business',
'Opinion Business',
'Enterprise Business',
'Global Business',
'Small Business',
'Leadership Business',
//Business page stops here
'Featured Video Games',
'Headline Video Games',
'Opinion Video Games',
" Video Games Deals",
"Playstation Gaming",
"Xbox Gaming",
"Nintendo Gaming",
"PC Gaming",
"Mobile Gaming",
"Hardware Gaming",
"Indie Gaming",
//Video Games page stops here
'Featured Entertainment',
'Headline Entertainment',
'Opinion Entertainment',
'Industry Entertainment',
'Fan Entertainment',
'Awards Entertainment',
'Movie Entertainment',
'TV Entertainment',
//Entertainment page stops here
'Featured Fashion',
'Headline Fashion',
'Opinion Fashion',
"Seasonal Trends",
"Celebrity Styles",
"Fashion Events",
"Fashion Reviews",
"Fashion Industry News",
"Fashion Interviews",
"Fashion Technology",
//Fashion page stops here
'Featured Education',
'Headline Education',
'Opinion Education',
"Higher Education",
"K-12 Education",
"Education Funding",
"International Education",
"Special Education",
//Education page stops here
'Featured U.N. (United Nations)',
'Headline U.N.',
'Opinion U.N.',
"Peacekeeping Operations",
"Human Rights Initiatives",
"Climate Action",
"U.N. General Assembly",
"Humanitarian Efforts",
"U.N. Agencies",
"Refugee Assistance",
"Women and Gender Equality",
//U.N. page stops here
'Featured Terrorism',
'Headline Terrorism',
'Opinion Terrorism',
"Global Terrorism Trends",
"Terrorism and Security",
"Terrorist Organizations",
"Terrorism Financing",
"Domestic Terrorism",
"International Terrorism",
"Cyberterrorism",
//Terrism page stops here
'Featured World Economy',
'Headline World Economy',
'Opinion World Economy',
"Global Market Trends",
"International Trade",
"Economic Growth",
"Currency Exchange",
"Economic Forecasts",
"Sustainable Economic Practices",
"Global Inflation",
"Economic Sanctions",
"Global Supply Chain",
//Economy page stops here
'Featured Scandals',
'Headline Scandals',
'Opinion Scandals',
"Political Scandals",
"Corporate Scandals",
"Financial Scandals",
"Sports Scandals",
"Scandals in Education",
"Entertainment Scandals",
"Religious Scandals",
"Healthcare Scandals",
"International Scandals",
"Fashion Scandals",
"Military Scandals",
//Scandals page stops here
'Featured Mexico',
'Headline Mexico',
'Opinion Mexico',
"Mexican Politics",
"Mexican Economy",
"Mexican Culture",
"Tourism in Mexico",
"Mexican Education",
"Mexican Healthcare",
"U.S.-Mexico Relations",
"Mexican Environment",
"Mexican History",
"Mexican Sports",
"Social Issues in Mexico",
//Mexico page stops here
'Featured South America',
'Headline South America',
'Opinion South America',
"South America Politics",
"South America Economy",
"Education in South America",
"South America Education",
"South America Culture",
"South America Technology",
//South America page stops here
'Featured Europe',
'Headline Europe',
'Opinion Europe',
"Europe Politics",
"Europe Economy",
"Europe Technology",
"Europe Sports",
"Europe Culture",
'Eastern Europe',
'Western Europe',
'Northern Europe',
'Southern Europe',

//Europe page stops here
'Featured Asia',
'Headline Asia',
'Opinion Asia',
"Featured Asia",
"Headline Asia",
"Opinion Asia",
"Asia Politics",
"Asia Economy",
"Asia Technology",
"Asia Culture",
"Asia Tourism",
"Asia Education",
"South Asia",
"Southeast Asia",
"East Asia",
"Central Asia",
//Asia page stops here
'Featured Africa',
'Headline Africa',
'Opinion Africa',
"Africa Politics",
"Africa Economy",
"Africa Technology",
"Africa Culture",
"Africa Tourism",
"Africa Education",
"Northern Africa",
"Western Africa",
"Eastern Africa",
"Southern Africa",
"Central Africa",
//Africa page stops here
"Featured Pride",
"Headline Pride",
// Pride page stops here
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
case 'Military Dashboard':
case 'Crime Dashboard':
case 'Economy Dashboard':
case 'Immigration Dashboard':
case 'Business Dashboard':
case 'Video Games Dashboard':
case 'Entertainment Dashboard':
case 'Fashion Dashboard':
case 'Education Dashboard':
case 'United Nations Dashboard':
case 'Terrorism Dashboard':
case 'World Economy Dashboard':
case 'Scandals Dashboard':
case 'Mexico Dashboard':
case 'South America Dashboard':
case 'Europe Dashboard':
case 'Asia Dashboard':
case 'Africa Dashboard':
router.push('/');
break;
case 'Featured Technology':
case 'Headline Technology':
case 'Opinion Technology':
case 'GPU Technology':
case 'CPU Technology':
case 'Cybersecurity Technology':
case 'Machine Learning Technology':
case 'Emerging Technology':
case 'Consumer Technology':
case 'Enterprise Technology':
case 'Blockchain Technology':
case 'Space Technology':
router.push('/pages/Technology');
break;
case 'Featured Politics':
case 'Headline Politics':
case 'Opinion Politics':
case 'Local Politics':
case 'National Politics':
case 'International Politics':
case 'Election Politics':
case 'Economic Politics':
case 'Environmental Politics':
case 'Social Politics':
case 'Education Politics':
router.push('/pages/Politics');
break;
case 'Featured Opinion':
case 'Headline Opinion':
case 'Guest Opinion':
case 'Cultural Opinion':
case 'Technology Opinion':
case 'Economic Opinion':
case 'Social Opinion':
case 'Education Opinion':
case 'Enviromental Opinion':
router.push('/pages/Opinion');
break;
case 'Featured Music':
case 'Headline Music':
case 'Opinion Music':
case 'Industry Music':
case 'Technology Music':
case 'Events Music':
case 'Culture Music':
case 'Video Music':
case 'Interview Music':
router.push('/pages/Music');
break;
case 'Featured Sports':
case 'Headline Sports':
case 'Opinion Sports':
case "Featured Sports":
case "Headline Sports":
case "Opinion Sports":
case "Stats Sports":
case "Fantasy Sports":
case "Gear Sports":
case "Guest Sports":
case "Interview Sports":
case "E-Sports":
router.push('/pages/Sports');
break;
case 'Featured Military':
case 'Headline Military':
case 'Opinion Military':
case 'Local Military':
case 'National Military':
case 'International Military':
case 'Technology Military':
case 'Historical Military':
case 'Veterans Military':
router.push('/pages/Military');
break;
case 'Featured Crime':
case 'Headline Crime':
case 'Opinion Crime':
case " Financial Crime":
case " Property Crime":
case " Unsolved Crime":
router.push('/pages/Crime');
break;
case 'Featured Economy':
case 'Headline Economy':
case 'Opinion Economy':
case 'Market Economy':
case 'Government Economy':
router.push('/pages/Economy');
break;
case 'Featured Immigration':
case 'Headline Immigration':
case 'Opinion Immigration':
case " Border Immigration":
case " Refugee Immigration":
case " Politics Immigration":
case " Global Immigration":
router.push('/pages/Immigration');
break;
case 'Featured Business':
case 'Headline Business':
case 'Opinion Business':
case 'Enterprise Business':
case 'Global Business':
case 'Small Business':
case 'Leadership Business':
router.push('/pages/Business');
break;
case 'Featured Video Games':
case 'Headline Video Games':
case 'Opinion Video Games':
case " Video Games Deals":
case "Playstation Gaming":
case "Xbox Gaming":
case "Nintendo Gaming":
case "PC Gaming":
case "Mobile Gaming":
case "Hardware Gaming":
case "Indie Gaming":
router.push('/pages/VideoGames');
break;
case 'Featured Entertainment':
case 'Headline Entertainment':
case 'Opinion Entertainment':
case 'Industry Entertainment':
case 'Fan Entertainment':
case 'Awards Entertainment':
case 'Movie Entertainment':
case 'TV Entertainment':
router.push('/pages/Entertainment');
break;
case 'Featured Fashion':
case 'Headline Fashion':
case 'Opinion Fashion':
case "Seasonal Trends":
case "Celebrity Styles":
case "Fashion Events":
case "Fashion Reviews":
case "Fashion Industry News":
case "Fashion Interviews":
case "Fashion Technology":
router.push('/pages/Fashion');
break;
case 'Featured Education':
case 'Headline Education':
case 'Opinion Education':
case "Higher Education":
case "K-12 Education":
case "Education Funding":
case "International Education":
case "Special Education":
router.push('/pages/Education');
break;
case 'Featured U.N. (United Nations)':
case 'Headline U.N.':
case 'Opinion U.N.':
case "Peacekeeping Operations":
case "Human Rights Initiatives":
case "Climate Action":
case "U.N. General Assembly":
case "Humanitarian Efforts":
case "U.N. Agencies":
case "Refugee Assistance":
case "Women and Gender Equality":
router.push('/pages/UN');
break;
case 'Featured Terrorism':
case 'Headline Terrorism':
case 'Opinion Terrorism':
case "Global Terrorism Trends":
case "Terrorism and Security":
case "Terrorist Organizations":
case "Terrorism Financing":
case "Domestic Terrorism":
case "International Terrorism":
case "Cyberterrorism":
router.push('/pages/Terrorism');
break;
case 'Featured Economy':
case 'Headline World Economy':
case 'Opinion World Economy':
case "Global Market Trends":
case "International Trade":
case "Economic Growth":
case "Currency Exchange":
case "Economic Forecasts":
case "Sustainable Economic Practices":
case "Global Inflation":
case "Economic Sanctions":
case "Global Supply Chain":
router.push('/pages/WorldEconomy');
break;
case 'Featured Scandals':
case 'Headline Scandals':
case 'Opinion Scandals':
case "Political Scandals":
case "Corporate Scandals":
case "Financial Scandals":
case "Sports Scandals":
case "Scandals in Education":
case "Entertainment Scandals":
case "Religious Scandals":
case "Healthcare Scandals":
case "International Scandals":
case "Fashion Scandals":
case "Military Scandals":
router.push('/pages/Scandals');
break;
case 'Featured Mexico':
case 'Headline Mexico':
case 'Opinion Mexico':
case "Mexican Politics":
case "Mexican Economy":
case "Mexican Culture":
case "Tourism in Mexico":
case "Mexican Education":
case "Mexican Healthcare":
case "U.S.-Mexico Relations":
case "Mexican Environment":
case "Mexican History":
case "Mexican Sports":
case "Social Issues in Mexico":
router.push('/pages/Mexico');
break;
case 'Featured South America':
case 'Headline South America':
case 'Opinion South America':
case "South America Politics":
case "South America Economy":
case "Education in South America":
case "South America Education":
case "South America Culture":
case "South America Technology":
router.push('/pages/SouthAmerica');
break;
case 'Featured Europe':
case 'Headline Europe':
case 'Opinion Europe':
case "Europe Politics":
case "Europe Economy":
case "Europe Technology":
case "Europe Sports":
case "Europe Culture":
case 'Eastern Europe':
case 'Western Europe':
case 'Northern Europe':
case 'Southern Europe':
router.push('/pages/Europe');
break;
case 'Featured Asia':
case 'Headline Asia':
case 'Opinion Asia':
case "Featured Asia":
case "Headline Asia":
case "Opinion Asia":
case "Asia Politics":
case "Asia Economy":
case "Asia Technology":
case "Asia Culture":
case "Asia Tourism":
case "Asia Education":
case "South Asia":
case "Southeast Asia":
case "East Asia":
case "Central Asia":
router.push('/pages/Asia');
break;
case "Featured Africa":
case "Headline Africa":
case "Opinion Africa":
case "Africa Politics":
case "Africa Economy":
case "Africa Technology":
case "Africa Culture":
case "Africa Tourism":
case "Africa Education":
case "Northern Africa":
case "Western Africa":
case "Eastern Africa":
case "Southern Africa":
case "Central Africa":
router.push('/pages/Africa');
break;

case "Featured Pride":
case "Headline Pride":
router.push('/pages/Pride');
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
<option value="Women and Gender Equality">Women and Gender Equality</option>
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
<option value="Sustainable Economic Practices">Sustainable Economic Practices</option>
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
<option value="Scandals in Education">Scandals in Education</option>
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
<option value="Tourism in Mexico">Tourism in Mexico</option>
<option value="Mexican Education">Mexican Education</option>
<option value="Mexican Healthcare">Mexican Healthcare</option>
<option value="U.S.-Mexico Relations">U.S.-Mexico Relations</option>
<option value="Mexican Environment">Mexican Environment</option>
<option value="Mexican History">Mexican History</option>
<option value="Mexican Sports">Mexican Sports</option>
<option value="Social Issues in Mexico">Social Issues in Mexico</option>
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