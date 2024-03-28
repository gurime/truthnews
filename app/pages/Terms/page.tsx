import React from 'react'
import { Metadata } from 'next'

import Link from 'next/link'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'


export const metadata: Metadata = {
  title: 'iTruth News - Terms of Service',
  description: 'Explore the terms of service agreement with iTruth News. Your guide to understanding the rules and conditions that govern your use of our platform. Learn about user responsibilities, privacy policies, and the commitments we make to ensure a secure and respectful online environment.',
  keywords: 'terms of service, terms and conditions, user responsibilities, privacy policies, online platform rules, secure online environment, iTruth News agreements'
}


export default function Terms() {
  return (
<>
<Navbar/>
<div className='container-terms'>
<div className='itterms'>
<h1>ITRUTH NEWS TERMS OF SERVICE AGREEMENT</h1>
</div>

<div className='textblock'>
<p>Last Updated: February 1, 2030</p>
<p>PLEASE READ THIS TERMS OF SERVICE AGREEMENT (THE "AGREEMENT") CAREFULLY AS <br/>
IT CONSTITUTES A LEGAL AGREEMENT BETWEEN YOU AND ITRUTH NEWS.</p>

<h1 style={{fontWeight:'300'}}>Introduction</h1>
<p>This Agreement governs your use of ITRUTH NEWS. <br/>
By accessing, browsing or using the Site, you acknowledge that you have read, understood and agreed to <br/>
be bound by the terms and conditions set forth in this Agreement. If you do not agree to these terms, you may not use the Site.
</p>

<h1 style={{fontWeight:'300'}}>Content</h1>
<p>
The Site provides news articles, information and other content (collectively, the "Content"). <br/>
The Content is provided for informational purposes only and should not be relied upon as <br/>
professional advice. ITRUTH NEWS makes no representation or warranty as to the accuracy, <br/>
completeness or timeliness of the Content. You agree to use the Site and the Content at <br/>
your own risk.
</p>

<h1 style={{fontWeight:'300'}}>Use of the Site</h1>
<h2>You may use the Site only for lawful purposes. You may not use the Site:</h2>
<ol>
<li>To harass, abuse, or threaten others</li>
<li>To publish, post, upload, distribute or disseminate any defamatory, infringing, obscene, <br/>
or other unlawful material or information</li>
<li>To post, upload, distribute or disseminate any material or information that infringes any <br/>
patent, trademark, trade secret, copyright or other proprietary rights of any party</li>
<li>To interfere with or disrupt the Site or servers or networks connected to the Site</li>
<li>To use any device, software or routine to interfere or attempt to interfere with the proper <br/>
 working of the Site</li>
</ol>

<h1>Intellectual Property</h1>
<p>The Site and its Content, including all software, text, graphics, logos, trademarks, service <br/>
marks, trade names, and any other proprietary information, are protected by copyright and <br/>
trademark laws. You acknowledge and agree that the Site and its Content are the property <br/>
of ITRUTH NEWS and its licensors and that you will not acquire any right, title or interest in <br/>
or to the Site or the Content.
</p>

<h1>Disclaimer of Warranties</h1>
<p>ITRUTH NEWS MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR <br/>
IMPLIED, AS TO THE OPERATION OF THE SITE OR THE INFORMATION, CONTENT, <br/>
MATERIALS, OR PRODUCTS INCLUDED ON THE SITE. TO THE FULL EXTENT PERMISSIBLE BY <br/>
APPLICABLE LAW, ITRUTH NEWS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, <br/>
INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND <br/>
FITNESS FOR A PARTICULAR PURPOSE. ITRUTH NEWS WILL NOT BE LIABLE FOR ANY <br/>
DAMAGES OF ANY KIND ARISING FROM THE USE OF THE SITE, INCLUDING, BUT NOT <br/>
LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES.</p>

<h1>Limitation of Liability</h1>
<p>ITRUTH NEWS WILL NOT BE LIABLE TO YOU FOR ANY DAMAGES, INCLUDING WITHOUT <br/>
LIMITATION, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR SIMILAR DAMAGES, <br/>
EVEN IF ITRUTH NEWS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
</p>

<h1>Indemnification</h1>
<p>You agree to indemnify and hold ITRUTH NEWS and its affiliates, officers, agents, and <br/>
employees harmless from any claim or demand, including reasonable attorneys' fees, made <br/>
by any third party due to or arising out of your use of the Site or your violation of this <br/>
Agreement or any other applicable laws or regulations.</p>

<h1>Changes to the Agreement</h1>
<p>ITRUTH NEWS reserves the right to make changes to this Agreement at any time. Your <br/>
continued use of the Site following the posting of changes to this Agreement will mean you <br/>
accept those changes.</p>

<h1>Governing Law</h1>
<p>This Agreement shall be governed by and construed in accordance with the laws of the <br/>
jurisdiction in which the Site is located. You agree to submit to the exclusive jurisdiction of <br/>
the courts located in such jurisdiction.</p>

<h1>Entire Agreement</h1>
<p>This Agreement constitutes the entire agreement between you and ITRUTH NEWS with <br/>
respect to your use of the Site and supersedes all prior agreements between you and <br/>
ITRUTH NEWS.</p>

<h1>Contact Information</h1>
<p>If you have any questions or comments about this Agreement or the Site, please contact us at <br/>
<Link href='../pages/Contact' style={{textDecoration:'none',color:'#f7161a'}}>Contact iTruth News</Link>.
</p>

<h1>Acceptance</h1>
<p>By using the Site, you acknowledge that you have read, understood and agreed to be bound 
by this Agreement.</p>
</div>
</div>
<Footer/>
</>
)
}