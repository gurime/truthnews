'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import footLogo from '../images/white_it_adlogo.png'
import Image from 'next/image'
import navlogo from '../images/it.png'

const Footer = () => {
const router = useRouter()
const scrollTo = () =>{
window.scroll({top: 0,})
}  

return (
<>


<footer>
<div className="support-itruth-box">
<div className="support-headline">Support iTruth News</div>
<div className="support-subtitle">iTruth News works hard to bring <br/> you the news you care about.</div>
<div className="support-flex-box">
<button onClick={() => router.push('/pages/Contribute')} className="subbtn1"  >Contribute</button>
<div style={{width: "2rem"}}></div>
</div>
    
    
{/* <form id="" className="hero-form" action="#!">

<div className="input-box">
<input 
id="hero-text" 
placeholder='Search iTruth News' 
type="search"
autoComplete="off" 
spellCheck='false'
dir="auto"
tabIndex={0}/>

</div>
</form> */}
</div>

<div className="flex-footer">
<div className="footer-tablebox"> 
<div className="footer-headline">Get To Know Us</div>

<ul className="footer-navlink">
<li><Link href='#!'>Career</Link></li>

<li><Link href='#!'>Company News</Link></li>

<li><Link href='/pages/About'>About iTruth News</Link></li>

<li><Link href='/pages/Investor'>Investor Relations </Link></li>

<li><Link href='#!' >Advertise</Link></li>


</ul>
</div>
{/*first tablebox stops here*/}
<div className="footer-tablebox"> 
<div className="footer-headline">U.S News</div>

<ul className="footer-navlink">
<li><Link href='/pages/Military'>Military</Link></li>

<li><Link href='/pages/Crime'>Crime</Link></li>

<li><Link href='/pages/Economy'>Economy</Link></li>

<li><Link href='/pages/Immigration'>Immigration</Link></li>

<li><Link href='/pages/Business'>Business</Link></li>

<li><Link href='/pages/VideoGames'>Video Games</Link></li>

<li><Link href='/pages/Entertainment'>Entertainment</Link></li>

<li><Link href='/pages/Fashion'>Fashion</Link></li>

<li><Link href='/pages/Education'>Education</Link></li>

</ul>
</div>
{/*seconds tablebox stops here*/}
<div className="footer-tablebox"> 
<div className="footer-headline">World News</div>

<ul className="footer-navlink">
<li><Link href='/pages/UN'>U.N.</Link></li>

<li><Link href='/pages/Terrorism'>Terrorism</Link></li>

<li><Link href='/pages/WorldEconomy'>World Economy</Link></li>

<li><Link href='/pages/Scandals'>Scandals</Link></li>

<li><Link href='/pages/Mexico'>Mexico</Link></li>

<li><Link href='/pages/SouthAmerica'>South America</Link></li>

<li><Link href='/pages/Europe'>Europe </Link></li>

<li><Link href='/pages/Asia'>Asia</Link></li>

<li><Link href='/pages/Africa'>Africa</Link></li>

</ul>
</div>
{/*third tablebox stops here*/}
<div className="footer-tablebox" style={{borderRight:'none'}}> 
<div className="footer-headline">Life Style</div>

<ul className="footer-navlink">
<li><Link  href='/pages/Food'>Food & Drinks</Link></li>

<li><Link  href='/pages/Cars'>Cars & Trucks</Link></li>

<li><Link  href='/pages/Home'>House & Home </Link></li>

<li><Link  href='/pages/Pets'> Pets & Tips </Link></li>

<li><Link  href='/pages/Fitness'>Fitness & Well-Being</Link></li>

<li><Link  href='/pages/Family'>Family & Friends</Link></li>

<li><Link href='/pages/Religion'>Faith & Religion</Link></li>

<li><Link href='/pages/Books'>Books & Literature</Link></li>

<li><Link href='/pages/Pride'>Pride & News</Link></li>

</ul>
</div>
{/*fourth tablebox stops here*/}
<div className="footer-tablebox" style={{borderRight:'none',borderLeft:'solid 1px #fff'}}> 
<div className="footer-headline">Health</div>

<ul className="footer-navlink" style={{borderBottom:'none'}}>
<li><Link  href='/pages/MentalHealth'>Mental Health</Link></li>

<li><Link  href='/pages/ChildrensHealth'>Children's Health</Link></li>

<li><Link  href='/pages/HeartHealth'>Heart Health</Link></li>

<li><Link  href='/pages/PetHealth'>Pet Health</Link></li>

<li><Link  href='/pages/EyeHealth'>Eye Health</Link></li>
<li><Link  href='/pages/PhysicalHealth'>Physical Health </Link></li>

<li><Link  href='/pages/HealthyLiving'>Healthy Living </Link></li>

<li><Link  href='/pages/MedicalResearch'>Medical Reasearch</Link></li>

<li><Link  href='/pages/Cancer'> Cancer</Link></li>





</ul>
</div>
{/*fourth tablebox stops here*/}


</div>

<div  className="nav">
<Image title='Home Page' style={{marginRight:'auto '}} onClick={() => router.push('/')} src={navlogo} height={36} alt='...'  />






<div className="navlinks sm-navlink" style={{flexWrap:'nowrap'}}>
<Link  href='/pages/Contact'>Contact iTruth News</Link>

<Link  href='/pages/Terms'>terms of Use</Link>

<Link  href='/pages/Privacy'>Privacy Policies </Link>

<Link style={{border:'none'}}  href='../pages/Cookie'>Cookie Policies</Link>


</div>
</div>





<hr />
<div style={{
color:'#fff',
padding:'1rem 0',
textAlign:'center'
}}>
   &#169;2030 iTruth News, LLC All Rights Reserved <br />

</div>
<hr />

<div style={{
color:'#fff',
padding:'1rem 0',
textAlign:'center'
}}>
   <br />
    This material may not be published, broadcast, rewritten, or redistributed. 
</div>


<div className="footer-logo-box">

<Image title='To Top' width={36} onClick={scrollTo}  src={footLogo} alt="..." />

</div>
</footer>






</>
)
}

export default Footer