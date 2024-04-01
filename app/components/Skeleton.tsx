'use client'
import React, { useState, useEffect } from 'react';

export default function Skeleton() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <div className="skeleton" style={{ width: '60%', marginBottom: '1rem' }}></div>
          <div className="skeleton" style={{ width: '80%', marginBottom: '1rem' }}></div>
          <div className="skeleton" style={{ width: '40%' }}></div>
        </>
      ) : (
        // Render your actual content using the fetched data
      <></>
      )}
    </div>
  );
}