
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'


export const metadata: Metadata = {
    title: 'iTruth News - Privacy',
    description: 'Discover how iTruth News protects your online privacy. Learn about our commitment to data security, best practices for user protection, and stay informed on the measures we take to ensure your privacy while interacting with our platform. Your assurance for a secure and confidential online experience with iTruth News.',
    keywords: 'user privacy, data security, online privacy protection, user protection best practices, privacy measures, secure online experience, iTruth News privacy policy'
  }
  

export default function Privacy() {
return (
<>
<Navbar/>
<div className='container-terms'>
<h1 style={{textTransform:'capitalize',color:'red'}}>ITruth News Privacy Policy</h1>

<div className='textblock'>

<h2>Introduction</h2>


<p>ITruth News is committed to protecting the privacy and security of our users' personal <br/>
information. This privacy policy outlines the types of information we collect and how we use, <br/>
disclose, and protect it.</p>

<h2>Information Collection and Use</h2>
<p>ITruth News collects information from our users when they access our website or use our <br/>
services. This information may include but is not limited to:</p>
<ul style={{padding:'0 35px'}}>
<li>Contact information, such as name, email address, and phone number</li>
<li>Demographic information, such as age, gender, and location</li>
<li>Device information, such as IP address, browser type, and operating system</li>
<li>Usage information, such as pages visited and links clicked   </li>
</ul>

<p>This information is used to improve the content and functionality of our website, to better <br/>
understand our users' needs and interests, and to personalize their experience with our <br/>
services.</p>


<h2>Disclosure of Information</h2>
<p>ITruth News will not sell, rent, or lease your personal information to third parties for <br/>
marketing purposes without your consent. We may share your information with third-party <br/>
service providers who perform services on our behalf, such as website hosting, data analysis, <br/>
and payment processing. These third-party service providers are contractually bound to use <br/>
the information only for the purpose of providing the services they were hired to perform.</p>

<p>We may also disclose your information as required by law, such as in response to a <br/>
subpoena, court order, or legal process, or to protect the safety, rights, or property of ITruth <br/>
News, its users, or the public.</p>


<h2>Security</h2>
<p>ITruth News takes reasonable steps to secure your personal information against <br/>
unauthorized access, alteration, disclosure, or destruction. We use secure servers and <br/>
encryption technology to protect the transmission of your information, and we regularly <br/>
review our security practices to identify and address potential vulnerabilities.</p>

<h2>Cookies and Tracking Technology</h2>
<p>ITruth News uses cookies and other tracking technologies to improve your experience with <br/>
our website and services. Cookies are small data files that are stored on your device, and <br/>
they allow us to remember your preferences and track your usage. You can control the use <br/>
of cookies in your browser settings, but disabling cookies may limit your ability to use <br/>
certain features of our website.</p>

<h2>Changes to this Policy</h2>
<p>ITruth News may update this privacy policy from time to time to reflect changes in our <br/>
practices or to comply with legal requirements. We will notify you of any material changes <br/>
by posting the revised policy on our website and updating the "Effective Date" at the top of <br/>
the policy. Your continued use of our website and services after the revised policy becomes <br/>
effective indicates your acceptance of the changes.</p>

<h2>Contact Information</h2>
<p>If you have questions or concerns about this privacy policy, please contact us at <br/>
<Link href='../pages/Contact' style={{textDecoration:'none',color:'#f7161a',padding:'0 10px 0 0'}}>Contact iTruth News</Link>
 We will respond to your inquiry as soon as possible.</p>

<p>Effective Date: February 2, 2030</p>

</div>
</div>
<Footer/>
</>
)
}