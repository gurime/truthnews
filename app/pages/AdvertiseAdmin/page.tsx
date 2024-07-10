import React from 'react'
import AdForm from './AdForm'
import { Metadata } from 'next';


export const metadata: Metadata = {
title: 'iTruth News - Advertising Form',};

export default function page() {
return (
<>
<AdForm/>
</>
)
}
