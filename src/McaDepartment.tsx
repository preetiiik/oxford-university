import photo1 from './assets/mca/mca-img1.webp'
import photo2 from './assets/mca/mca-img2.webp'
import photo3 from './assets/mca/mca-img3.webp'
import photo4 from './assets/mca/mca-img4.webp'
import hero from './assets/departments/img1.webp'

import './BbaDepartment.css'
import './BcaDepartment.css'
import './McaDepartment.css'

const achievements = [
  ['9139', 'Students Passed Out'], ['4800', 'Students Placed in Top Reputed Companies'],
  ['18', 'Years Expertise in Education'], ['47', 'Chartered Accountants'],
  ['3', 'Gold Medallists'], ['10', 'University Rank Holders'],
  ['40', 'IPCC Achievers'], ['49', 'Company Secretaries'], ['100', 'CPT Achievers'],
  ['55', 'University Blues'], ['02', 'National Achievers'], ['01', 'KAS Achiever'],
]
const course = [
  'Comprehensive curriculum covering the latest in AI, machine learning, cloud computing, and cyber security.',
  'Industry-aligned projects and internships with leading tech companies.',
  'State-of-the-art computer labs and research facilities.',
  'Distinguished faculty with extensive industry experience.',
  'Opportunities for international collaborations and exchange programmes.',
]
const features = [
  'Specializations in emerging technologies like Data Science, AI, ML, Blockchain etc.',
  'Hands-on experience with real-world projects.',
  'Industry mentorship programme from TCS, Infosys, Capgemini, Wipro etc.',
  'Regular workshops and seminars by tech leaders & Entrepreneurs.',
  '100% Progressive placement assistance.',
  'Value-added certification courses in latest technologies.',
]
const differences = ['State-of-the-art infrastructure.', 'Lush Green Campus which creates positive motivation.', 'Highly experienced faculties with Corporate & Industry experience.', 'Complete Wi-Fi Campus.', 'KAS, IAS offered as Campus Coaching.', "Annual Industrial visits to top MNC's."]
const offerings = ['Excellent Academics & Results for 18 Years.', 'Consistent Placements.', 'Industry Ready Skills.', 'Excellent in-house Coaching for Competitive Exams.', 'Corporate Communication & Placement Training to students.']
const alumni = ['Vice Presidents', 'General Managers', 'Company Secretaries', 'Data Scientists', 'Software Engineers', 'Cyber Security Consultants', 'Entrepreneurs']
const careers = ['Senior Software Engineers', 'Data Science Consultants', 'System Analysts', 'Govt Jobs in State & Central governments (IT Sector)', 'Social Media Managers', 'IT Consultants', 'Networking Experts', 'Database Administrators']

function TextList({ items }: { items: string[] }) {
  return <ul className="mca-list">{items.map(text => <li key={text}>{text}</li>)}</ul>
}


export default function McaDepartment() {
  return <main className="bba-detail bca-detail mca-detail">
    <section className="bba-banner" aria-labelledby="mca-title"><img src={hero} alt="Oxford Mca department students" fetchPriority="high" /><h1 id="mca-title">MCA Department</h1></section>

    <section className="bba-course home-container mca-foundation">
      <p className="bba-eyebrow">Vishwashanti Foundation</p>
      <h2>Oxford College of Computer Applications (MCA &amp; BCA)</h2>
      <p><strong>(Approved By AICTE, New Delhi, Government Of Karnataka, Affiliated To Karnatak University, Dharwad)</strong></p>
      <h3>MCA (Master in Computer Applications)</h3>
      <p className="mca-tagline">Learn Today, Lead Information Technology World Tomorrow</p>
    </section>

    <section className="bba-introduction home-container">
      <div className="bba-introduction-copy"><p className="bba-eyebrow">MCA Programme</p><h2>Advance Your Career With Our <em>Cutting-Edge MCA Programme</em></h2><p>Oxford Group Of Institutions, One Of The Renowned And Prominent Institution Rendering Its Services In The Field Of Education For 18 Years, The Group Of Institutions Has Created History With Remarkable Achievements In The Field Of Academics, Co-Curriculum, Placements, Sports Etc. In The Span Of 18 Years The Institutions Have Shaped The Following Results.</p></div>
      <img src={photo1} alt="MCA students attending a classroom session" loading="lazy" decoding="async" />
    </section>

    <section className="bca-band"><div className="home-container"><h2>Our Achievements</h2><ul className="mca-achievements">{achievements.map(([value, label]) => <li className="bca-card" key={label}><strong>{value}</strong><span>{label}</span></li>)}</ul></div></section>

    <section className="bca-section home-container"><h2>Oxford College MCA Programme</h2><p>Oxford College Is Proud To Announce Its New AICTE Approved Master Of Computer Applications (MCA) Programme, Designed To Equip Students With Advanced Skills In Computer Science And Technology Management.</p><p>Our Two-Year, Full-Time Course Offers:</p><TextList items={course} /><div className="mca-learning-gallery">{[[photo2, 'MCA class gathered in a lecture hall'], [photo4, 'MCA students studying together with books and laptops']].map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" decoding="async" />)}</div></section>

    <section className="bca-band"><div className="home-container"><h2>Key Features of MCA at Oxford</h2><ol className="mca-features">{features.map((text, index) => <li className="bca-card" key={text}><span aria-hidden="true">0{index + 1}</span><p>{text}</p></li>)}</ol></div></section>

    <section className="bca-section home-container bca-two-column"><article className="bca-card"><h2>How Are We Different?</h2><TextList items={differences} /></article><article className="bca-card"><h2>What Do We Offer?</h2><TextList items={offerings} /></article></section>

    <section className="bca-band"><div className="home-container"><h2>Where Are Our Students Today?</h2><ul className="bca-skill-grid">{alumni.map(role => <li className="bca-card" key={role}>{role}</li>)}</ul></div></section>

    <section className="bca-section home-container"><h2>Career Options After MCA</h2><ul className="bca-skill-grid">{careers.map(role => <li className="bca-card" key={role}>{role}</li>)}</ul></section>

    <section className="bca-band"><div className="home-container bca-two-column"><div><h2>Admission Requirements</h2><TextList items={["Bachelor's degree in Computer Applications, IT, or related field.", 'Minimum 60% aggregate marks in undergraduate studies or 55% for reservation.', 'Successful completion of PGCET/K-MAT/Oxford PG Entrance exam or any equivalent qualifying examinations.']} /></div><img className="mca-admission-photo" src={photo3} alt="MCA students working on laptops in a classroom" loading="lazy" decoding="async" /></div></section>

    <section className="bca-section home-container"><h2>Apply now and shape the future of technology!</h2><div className="bca-contact"><div><p className="bba-eyebrow">Contact Information</p><p>Oxford College of Computer Applications</p></div><dl><div><dt>Website</dt><dd><a href="http://www.oxfordcollege.edu.in/">www.oxfordcollege.edu.in</a></dd></div><div><dt>Email</dt><dd><a href="mailto:info.oxfordpg@gmail.com">info.oxfordpg@gmail.com</a></dd></div><div><dt>Phone</dt><dd><a href="tel:+919606919991">9606919991</a></dd></div></dl></div></section>
  </main>
}
