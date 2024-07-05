'use client'
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'  
import Footer from './footer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import navlogo from '../images/it.png'
import { collectionRoutes, getArticle } from './HeroFormApi/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

type SearchResult = {
  title: string;
  collection: string;
  owner: string;
  id: string;
};

export default function Navbar() {
  const router = useRouter()
  const [forceRender, setForceRender] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [names, setNames] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [allResultsDisplayed, setAllResultsDisplayed] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const uuid = useRef(uuidv4());

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsSignedIn(!!user);
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setNames([userData.firstName, userData.lastName]);
          }
        } catch (error) {
          // Handle errors here
        }
      }
    });

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const searchContainer = document.querySelector('.search-results-container');
      const searchInput = document.querySelector('input[type="search"]');
      
      if (!searchContainer?.contains(target) && target !== searchInput) {
        setIsOverlayActive(false);
        setSearchResults([]);
        setSearchTerm('');
      }
    };

    document.body.addEventListener('click', handleDocumentClick);

    const usersCollectionRef = collection(db, "users");
    const unsubscribeUsers = onSnapshot(usersCollectionRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return () => {
      document.body.removeEventListener('click', handleDocumentClick);
      unsubscribe();
      unsubscribeUsers();
    };
  }, [searchTerm, isOverlayActive]);

  type InputChangeEvent = ChangeEvent<HTMLInputElement>;
  type FormSubmitEvent = FormEvent<HTMLFormElement>;  

  const handleSearchInputChange = (event: InputChangeEvent) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      handleSearch();
    }
  };
  
  const handleSearch = async (event?: FormSubmitEvent) => {
    if (event) {
      event.preventDefault();
    }
    try {
      setLoading(true);
      const results = await getArticle(searchTerm);
      setSearchResults(results);
      setDisplayCount(5); // Only reset when performing a new search
      setAllResultsDisplayed(results.length <= 5); // Set to true if all results fit in initial display
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);
  
  const getLink = (collection: string, id: string) => {
    const formattedCollection = collection.replace(/\s+/g, '');
    const route = collectionRoutes[formattedCollection];
    return route ? `${route}/${id}` : '/';
  };

  const toggleFooter = () => {
    setIsFooterVisible(!isFooterVisible);
  };
        
  return (
    <>
      <div className="nav">
        <Image placeholder="blur" onClick={() => router.push('/')} src={navlogo} height={36} alt='...' />
        <div style={overlayStyle}></div>
        <form style={{ width: '100%', position:'relative' }} onSubmit={handleSearch}>
          <input
            placeholder="Search iTruth News"
            type="search"
            spellCheck="false"
            dir="auto"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch();
              handleSearchInputChange(e);
              setIsOverlayActive(e.target.value.trim().length > 0);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOverlayActive(true);
            }}
          />

          {searchResults.length > 0 && searchTerm && (
            <div className="search-results-container" onClick={(e) => e.stopPropagation()}>
              <div className="search-results">
                {searchResults.slice(0, displayCount).map((result, index) => (
                  <div key={`${result.id}_${index}`} className="search-result-item">
                    <Link href={getLink(result.collection, result.id)}>
                      <p>{result.title.slice(0, 50)}{result.title.length > 50 ? '...' : ''}</p>
                    </Link>
                  </div>
                ))}
              </div>
              {searchResults.length > displayCount && !allResultsDisplayed && (
                <button 
                  className="load-more-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newDisplayCount = Math.min(displayCount + 5, searchResults.length);
                    setDisplayCount(newDisplayCount);
                    setAllResultsDisplayed(newDisplayCount >= searchResults.length);
                  }}
                >
                  Load more results
                </button>
              )}
            </div>
          )}
        </form>

        <div className="navlinks">
          {isSignedIn ? (
            <Link href='#!'>
              {names.length === 2 && (
                <>
                  <span className="sm-name">{names[0]}</span>
                  <span className="sm-name">{names[1]}</span>
                </>
              )}
            </Link>
          ) : (
            <span className="sm-name">Guest</span>
          )}

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

      <div style={{position:'relative',width:'100%'}}>
        <div style={{position:'absolute',width:'100%'}}>
          {isFooterVisible && <Footer />}
        </div>
      </div>
    </>
  )
}
