'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Footer from './footer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import navlogo from '../images/it.png'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { collectionRoutes, getArticle } from './HeroFormApi/page';

export default function Navbar() {
const router = useRouter()
const [forceRender, setForceRender] = useState(false);
const [isSignedIn, setIsSignedIn] = useState(false);
const [isFooterVisible, setIsFooterVisible] = useState(false);
const [isOverlayActive, setIsOverlayActive] = useState(false);
const [searchTerm, setSearchTerm] = useState<string>('');
const [searchResults, setSearchResults] = useState<string[]>([]);
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#000',
    opacity: '.6',
    display: isOverlayActive ? 'block' : 'none',
    pointerEvents: 'none',
  };

  
//   useEffect(() => {
//     const handleDocumentClick = (e: MouseEvent) => {
//       const isClickOutsideSearch = !(e.target as HTMLElement).closest('.search-container');
//       if (isClickOutsideSearch) {
//         setIsOverlayActive(false);
//         setSearchResults([]);
//         setSearchTerm(''); // Clear the search input
//       }
//     };
    
//     document.body.addEventListener('click', handleDocumentClick);
    
//     const unsubscribe = onAuthStateChanged(auth, (user) => { // Ensure that auth is properly defined or imported
//       setForceRender((prev) => !prev); // Force re-render
//       setIsSignedIn(!!user);
//     });
    
//     // Assuming you have an unsubscribe function
//     return () => {
//       document.body.removeEventListener('click', handleDocumentClick);
//       unsubscribe();
//     };
//   }, [searchTerm, isOverlayActive]);
  
//   const handleSearch = async () => {
//     // Assuming getArticle is a defined function
//     const results = await getArticle(searchTerm); // Ensure that getArticle is properly defined or imported
//     setSearchResults(results);
//   };
  
//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm]);
  
//   const getLink = (collection: string, id: string) => {
//     // Replace spaces with an empty string in the collection name
//     const formattedCollection = collection.replace(/\s+/g, '');
    
//     // Use the formatted collection name to get the route
//     const route = collectionRoutes[formattedCollection];
//     return route ? `${route}/${id}` : '/';
//   };
    
const toggleFooter = () => {
setIsFooterVisible(!isFooterVisible);
};
        
return (
<>
<div className="nav">
<Image placeholder="blur" onClick={() => router.push('/')} src={navlogo} height={36} alt='...' />
<div style={{
position: 'fixed',
top: 0,
left: 0,
width: '100%',
height: '100%',
background: '#000',
opacity: 0.6,
display: isOverlayActive ? 'block' : 'none',
pointerEvents: 'none',
}
}>
</div>
<form style={{ width: '100%',position:'relative',  }} >
<input
placeholder="Search iTruth News"
type="search"
spellCheck="false"
dir="auto"
tabIndex={0}

/>

{/* {searchResults.length > 0 && searchTerm && !loading && (
<div className="search-results-container">
{searchResults.slice(0,10).map((result) => (
<div key={result.id} className="search-result-item">
<Link key={result.id} href={getLink(result.collection, result.id)}>
<p>{result.title}</p>
</Link>
</div>
))}
</div>
)} */}

</form>

<div className="navlinks">

{/* 
{isSignedIn ? (
<Link  href='#!'>
{names.length === 2 && (
<>
<span className="sm-name" >{names[0]}</span>
<span className="sm-name">{names[1]}</span>
</>
)}
</Link>
) : (

<span className="sm-name">
Guest

</span>
)} */}

<Link href="/">Home</Link>
<Link href="/pages/Technology">Technology</Link>
<Link href="/pages/Music">Music</Link>
<Link href="/pages/Politics">Politics</Link>
<Link href="/pages/Opinion">Opinion</Link>
<Link href="/pages/Sports">Sports</Link>
<Link href='#!' onClick={toggleFooter}>More:</Link>
<button onClick={() => router.push('/pages/Contribute')} id="subbtn1">Contribute</button>

</div>


</div>
{/* end of navbar */}


{/* footer dropdown */}
<div style={{position:'relative',width:'100%'}}>
<div style={{position:'absolute',width:'100%'}}>
{isFooterVisible && <Footer />}</div>
</div>


</>
)
}
