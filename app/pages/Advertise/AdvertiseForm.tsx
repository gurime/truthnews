import React from 'react'
import adimg from '../../images/adimg.jpeg'
import Image from 'next/image'


export default function AdvertiseForm() {
return (
<>

<div style={{
display:'grid',
placeItems:'center',
}}>

<div style={{
width:'35%',
marginBottom:'1rem'
}}>
<h3 style={{

textTransform:'capitalize',
letterSpacing:'1px',
textAlign: 'center',
}}>sponsored work</h3>
</div>

<div className='adbox'>
<Image src={adimg} alt='...'/>
</div>

<div style={{
borderBottom:'solid  1px',
width:'35%'
}}>
<h3 style={{

textTransform:'capitalize',
letterSpacing:'1px',
textAlign: 'center',
}}>subscribe now</h3>
</div>
 
<p 
style={{

}}>$7 per month</p>
<p 
style={{
lineHeight:'1.5',
textAlign:'center',
fontSize:'15px',

}}
>Get your work to the front of the page. <br/>
Itruth News will feature your work on the front page of our <br/>
website for a fee.
</p>

<div style={{
display:'grid',
placeContent:'center'}}>

<div className='formbox'>





<div className="payment-title">
<p style={{fontSize:'20px',fontWeight:'600'}}>Payment Method</p>
<p >🔒Secure Transaction</p>
</div>

<button> $7 per month</button>
</div>
</div>
</div>
</>
)
}
