'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import Footer from './footer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import navlogo from '../images/it.png'

export default function Navbar() {
const router = useRouter()
const [isFooterVisible, setIsFooterVisible] = useState(false);
const [isOverlayActive, setIsOverlayActive] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

    
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
