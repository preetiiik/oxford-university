import { useState } from 'react'
import { BriefcaseBusiness, Building2, Search, UsersRound } from 'lucide-react'
import './placements.css'
import { assets } from './assets'

const bcaPlacements = [
  ['Prajwal S Shetty', 'Antimony Laundry'], ['Chetan Parishwad', 'Accenture, Bangalore'], ['Imran Hanchinal', 'HDFC Bank, Hubli'],
  ['Vinayak Laxman', 'Groupon, Bangalore'], ['Suresh Kichadi', 'Wipro, Bangalore'], ['Shreena S Morjaria', 'Freelancer'],
  ['Amruta D Nadig', 'Wipro, Bangalore'], ['Chaitra B Ghatnalli', 'Wipro, Bangalore'], ['Jaishankar Sankpal', 'GTE'],
  ['Noel Kallu', 'GE Motors'], ['Rahul M Manakur', 'TCS, Bangalore'], ['Shilpa Balehosur', 'Kotak Mahindra, Bangalore'],
  ['Stanley Mothukuri', 'Amazon Inc'], ['Rakesh Yakkihallimath', 'IMSR, Bangalore'], ['Shirrohit Vanagondi', 'AMAGI Media Lab, Bangalore'],
  ['Akshata Dasar', 'Cerner, Bangalore'], ['Praveen Kumar B Benger i', 'Exibe, Dharwad'], ['Vikram S Rayanagoudar', 'Ashirwad Rice, Belgaum'],
  ['Mallikarjun S Karagund', 'Croshdomain, Bangalore'], ['Harsha S pujari', 'Amazon.com, Bangalore'], ['Anusha S Kapse', 'HP, Bangalore'],
  ['Amreen Mujawar', 'Innovative India, Bangalore'], ['Vinayak V Tegginmani', 'Captiatone, Bangalore'], ['Vijay Devakat', 'VIS Network, Bangalore'],
  ['Roopkumari L Benger i', 'Trigent, Bangalore'], ['Neha Kabade', 'Unique Product, Hubli'], ['Vinayak Hubballi', 'Jonidua, Hubli'],
  ['Vinayagouda S Patil', 'Sourcebase, Bangalore'], ['Rahul Pawar', 'Vivekanand Hospital, Hubli'], ['Ashish Adrain', 'Nebler, Bangalore'],
  ['Vishwajeet B Salagode', 'Serpoppu, Bangalore'], ['Wahid Ahmed Totagatti', 'Infosys, Bangalore'], ['Nikhat Naib', 'Bharati Airtel Telecom'],
  ['Subashchandra S Balehosur', 'ATM Software, Bangalore'], ['Sneha Sarwad', 'Xentrix Pvt Ltd'], ['Chetan Phetem', 'Accenture'],
  ['Justin George', 'Oracle India Pvt. Ltd.'], ['Manjunath M Kannur', 'India Pvt. Ltd.'], ['Prasad P Nayak', 'Infosys'],
  ['Naushad Ali T Doddamani', 'WIPRO Technology'], ['Priyanka A Momaya', 'Zensar Technology, Hubli'], ['Mario Roche', 'Software AG, Bangalore'],
  ['Amratha N', 'TCS Bangalore'], ['Akshata M Baddi', 'WIPRO, Bangalore'], ['Vishnu Makan Gupta', 'Informatica, Bangalore'],
  ['Manjunath Pawar', 'BPU Company'], ['Prithvinandan Ramamurthy', 'Omega Info Solutions'], ['Nitin Pathak', 'Infosys'],
  ['Wahid Ahmed Totagatti', 'Infosys'], ['Nishant P Sighavi', 'ITC, Bangalore'], ['Kalyan Kumar', 'PTW India Pvt Ltd.'],
  ['Sameer M Karjagi', 'Indigo'], ['Chandan M', 'Amazon'], ['K.N. Divya', 'Appstrail Technology'], ['Sindhu Shastry', 'DXC Technology'],
  ['Abhishek Madiwalar', 'Wipro'], ['Nataraj Poojar', 'Clinchoice Private Limited'], ['Deepak kore', 'Amazon'], ['Yogesh Bhandage', 'Suma Soft Pvt Ltd'],
  ['Prajwal Kongi', 'Jupiter'], ['Yogesh Shetti', 'Fiserv'], ['Dorothy Daflid', 'Philips'], ['Pooja V Kiresur', 'DXC India Technology Ltd'],
  ['Sushma Koujalgi', 'Bosch Global Software'], ['Reshma Shaik', 'HP India Pvt Ltd'], ['Uzma Khatib', 'Accenture'], ['Amit baddi', 'Uber Inc'],
  ['Prasanna Nayak', 'Unisys India'], ['Pradeep Kulkarni', 'Juego Studios Pvt Ltd'], ['Praneeth Joshi', 'Infineon Technology Pvt Ltd'],
  ['Zeeshan Khazi', 'Air India Ltd'], ['K. Pavan Kumar', 'Microsense Pvt Ltd'], ['Basavaraj Banakar', 'SecIQ Technologies'],
  ['Harish Itagi', 'Konnectbox'], ['Sangeeta Hampiholi', 'Flipkart India'],
] as const

const bcomPlacements = [
  ['Mr. Mohammad Ajmal', 'TCS (Tata Consultancy Services) · Business Analyst'], ['Ms. Seema M. Nelliokoppa', 'Infosys · Process Associate'],
  ['Mr. Godwin B. Hadaginal', 'Oracle · Analyst'], ['Ms. Candida Ann Louis', 'Oracle'], ['Ms. Stephaine Andrews', 'Thomson Reuters'],
  ['Mr. Sunil Kumar P.', 'South Western Railway'], ['Mr. Chidambar A. Kari', 'South Western Railway'],
  ['Mr. Prasanna Shridhar Kanekal', 'South Western Railway'], ['Mr. Xavier Joseph Gundi', 'St. Milagres Cooperative Bank'],
  ['Mr. Barnabas T. Buraga', 'TCS (Tata Consultancy Services) · Business Analyst'], ['Mr. Manoj Anil Joshi', 'IBM'],
  ['Ms. Sushma T S', 'IBM'], ['Ms. Pooja Kalburgi', 'TCS'], ['Mr. Sagar Jain', 'TCS'], ['Ms. Raveena Bhandari', 'TCS'],
  ['Ms. Niku Jain', 'TCS'], ['Ms. Ankita B. Shah', 'TCS'], ['Ms. Arpita Nadig', 'TCS'], ['Ms. Ronakshi Jain', 'TCS'],
  ['Mr. Nirav Momaya', 'TCS'], ['Mr. Abhishek Jain', 'TCS'],
] as const

const departmentOptions = ['BCA', 'B.Com'] as const
type Department = typeof departmentOptions[number]
const departmentRows: Record<Department, readonly (readonly [string, string])[]> = {
  BCA: bcaPlacements, 'B.Com': bcomPlacements,
}
const departmentCompanies: Record<Department, string> = {
  BCA: '40+', 'B.Com': '15+',
}

export function PlacementsPage() {
  const [department, setDepartment] = useState<Department>('BCA')
  const [query, setQuery] = useState('')
  const rows = departmentRows[department]
  const filteredRows = rows.filter(([name, company]) => `${name} ${company}`.toLowerCase().includes(query.toLowerCase()))
  return <main className="placements-page">
    <section className="page-hero placements-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><h1><span>Students placed</span><span><em>for what comes next.</em></span></h1><p>Explore the companies and career paths chosen by Oxford College graduates across departments.</p></div></section>
    <section className="department-overview section-shell section-pad"><div className="department-overview-heading"><div><p className="eyebrow">Explore by Department</p><h2>Find placement outcomes for BCA and B.Com.</h2></div><p>Select a department to view its student and company directory.</p></div><div className="department-card-grid">{departmentOptions.map((item)=><button key={item} className={`department-card ${department===item?'active':''}`} onClick={()=>{setDepartment(item);setQuery('')}}><span>{item}</span><strong>{departmentRows[item].length}+</strong><small>students listed</small></button>)}</div></section>
    <section className="placement-stats section-shell"><div><BriefcaseBusiness/><strong>{rows.length}+</strong><span>{department} students listed</span></div><div><Building2/><strong>{departmentCompanies[department]}</strong><span>Hiring companies</span></div><div><UsersRound/><strong>{department}</strong><span>Selected department</span></div></section>
    <section id="placement-directory" className="placement-directory section-shell section-pad"><div className="directory-heading"><div><p className="eyebrow">Placement Directory</p><h2>{department} students placed in different companies</h2></div><label className="placement-search"><Search size={16}/><input value={query} placeholder="Search student or company" onChange={(event)=>setQuery(event.target.value)}/></label></div><div className="department-tabs" role="tablist">{departmentOptions.map((item)=><button key={item} className={department===item?'active':''} onClick={()=>{setDepartment(item);setQuery('')}}>{item} <span>{departmentRows[item].length}</span></button>)}</div><div className="placement-table"><div className="placement-table-head"><span>Sl. No.</span><span>Student name</span><span>Company / role</span></div>{filteredRows.length ? filteredRows.map(([name,company],index)=><div className="placement-row" key={`${department}-${name}-${index}`}><span>{String(index+1).padStart(2,'0')}</span><strong>{name}</strong><span>{company}</span></div>) : <div className="placement-empty"><strong>Placement records coming soon</strong><span>Add {department} placement details here to publish them in this shared directory.</span></div>}</div></section>
    <section className="placements-cta section-shell section-pad"><p className="eyebrow">Build your next chapter</p><h2>Learn. Prepare. Get placed.</h2><p>With practical learning and career support, every student gets closer to an opportunity that fits their ambition.</p></section>
  </main>
}
