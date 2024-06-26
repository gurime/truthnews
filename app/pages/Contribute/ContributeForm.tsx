'use client'
import React from 'react'
import { FaCreditCard } from 'react-icons/fa'
import { GrPaypal } from 'react-icons/gr'
import contributeimg from '../../images/it.png'
export default function ContributeForm() {
return (
<>
<div className='contribute-box'>


<div className='contribute-leftbox'>
<img src={contributeimg.src} alt="" />

<div style={{
display:'grid',
placeContent:'center'}}>

<div className='formbox'>
<label  htmlFor='fname'>Firstname</label>
<input  type='text'  id='fname'/>

<label  htmlFor='lname'>Lastname</label>
<input type='text'  id='lname'/>




<div className="payment-title">
<p style={{fontSize:'20px',fontWeight:'600'}}>Payment Method</p>
<p >🔒Secure Transaction</p>
</div>
<fieldset className='form-radio-group' >

<label className='form-radio-box'  htmlFor='1'>
<input type='checkbox'
style={{
display:'flex',
margin:'auto',
width:'24px',
backgroundColor:'transparent',
border:'solid 1px currentcolor',
cursor:'pointer',}}
name='age'
id='1'/>

<div className='payment-method-box'>
<div>Credit/Debit Card</div>
<FaCreditCard />

</div>
</label>

<label className='form-radio-box'  htmlFor='2'>
<input type='checkbox'
style={{
display:'flex',
margin:'auto',
width:'24px',
backgroundColor:'transparent',
border:'solid 1px currentcolor',
cursor:'pointer',}}
name='age'
id='2'/>

<div className='payment-method-box'>
<div >Paypal</div>
<GrPaypal />

</div>
</label>

</fieldset>
<button> $20</button>
<p style={{
textAlign:'center',


}}>Cancel Anytime</p>
</div>
</div>
</div>

<div className='contribute-rightbox'>
<h1> Support iTruthNews <br/> 
in the fight for   <br/> 
honest news </h1>
<p style={{lineHeight:'1.8',fontSize:'15px',borderTop:'solid 1px gray'}} >  It's never been more critical to have high-quality, independent news that is inviting to everyone. <br/>
To keep reporting in 2050, we'll need $1.05 million in funding.<br/> 
Please consider donating to support iTruthNews.
</p>

</div>
</div>
</>
)
}
