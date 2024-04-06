import React from 'react'
import imgUrl from '../../images/adimg.jpeg'
import ad from '../../images/it.png'
import Link from 'next/link'
export default function HeadlineDashboard() {
return (
<>
<div className='grid-container'>
<div className="card">
<img src={imgUrl.src} alt="" />
<div className="authflex">
<p>technologuy</p>
<div className="authpic-block">
<h3 className="card-catogory">John Doe</h3>
<img className="authpic" src={ad.src} alt="" style={{width:'40px',height:'40px'}}/>

</div>
</div>
<h2 className="card-title">super</h2>
<p className="card-content">
Lorem ipsum dolor sit amet consectetur adipisicing elit. In est amet ipsum natus assumenda corrupti ipsam architecto dolorum, rem possimus cupiditate eligendi exercitationem, debitis quas recusandae eveniet iusto commodi distinctio.
</p>
{/* href={`pages/Articles/${blog.id}`} */}
<div
style={{
display: 'flex',
placeItems: 'center',
justifyContent: 'space-between',

}}>
<Link href='#!'className="slugbtn btn">
<button className="card-button" rel="noreferrer">
Read More
</button>
</Link>
11111
</div>
</div>
</div>
</>
)
}
