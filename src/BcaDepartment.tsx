import { ArrowUpRight } from 'lucide-react'
import './BbaDepartment.css'
import './BcaDepartment.css'
import hero from './assets/departments/bca.jpg'
import recognition from './assets/bca/bca-img1.png'
import workshop from './assets/bca/bca-img2.png'
import classroomSession from './assets/bca/5.png'
import seminarGuests from './assets/bca/6.png'
import industryVisit from './assets/bca/bca-img3.png'
import studentGroup from './assets/bca/bca-img4.png'

const objectives = [
  'Continuous up gradation of knowledge through innovative, curriculum design.',
  'To demonstrate mastery of computing skills.',
  'To educate ethical and social implication in usage of computers.',
  'To establish and maintain an atmosphere that supports faculty & student development and growth.',
  'To encourage faculty to embrace dynamic changes in technology and while also applying the genuine student projects pushing the boundaries of technology forward.',
]
const stages = [
  "Induction, Orientation and Fresher's Week.",
  'Regular and Rigorous classes of Core Subjects to provide a strong base to all students (including organising Guest lectures from Industry Experts).',
  'Skill Enhancement and Personality Development of Students by organising events like IT Fests, Workshops, Sports Events, etc.',
  'Student Projects and Co-curricular activities in line with career aspirations.',
  'At the end of the programme, students make better-informed career choices and have a better fit with the industry/business of their choice.',
]
const skills = ['Effective Communication and Interpersonal Skills', 'Problem Solving and Decision Making', 'Quantitative and Analytical Skills', 'Social Responsibility and Environmental Sensibility', 'Proficiency in IT Tools']
const workshops = [
  ['Nagendra Shenoy', 'CEO Sage Technologies'],
  ['Varun Kudachi', 'Senior Project Lead - Ion Idea Software Pvt Ltd'],
  ['Praveen Gudi', 'CEO & Founder - My Life Foundation'],
  ['Sameer Hosur', 'Senior Software Engineer - HP India Pvt Ltd.'],
  ['Roshan Raikar', 'CEO & Entrepreneur, ROSH IDEATIONS.'],
]
const certifications = ['Cisco Certified Network Associate', 'Certified Ethical Hacking (Cyber Security)', 'Red Hat Certification', 'Microsoft Certification', 'I-CELL IIT Bombay']


export default function BcaDepartment() {
  return (
    <main className="bba-detail bca-detail">
      <section className="bba-banner" aria-labelledby="bca-title">
        <img src={hero} alt="BCA students and faculty on an industry visit" fetchPriority="high" />
        <h1 id="bca-title">BCA Department</h1>
      </section>

      <section className="bba-course home-container">
        <h2>BCA (Bachelor of Computer Application)</h2>
        <p>The BCA (Bachelor of Computer Application) programme provides students with necessary skills to make successful career in Information Technology sector area. It also prepares students with the requisite background to proceed with confidence for higher studies in the form of MCA, MIT, MS in computers, MBA, etc, and thus acquire greater competency.</p>
        <p>The BCA course structure is spread across six semesters in three years and is a programme of Karnataka University, Dharwad. Each semester comprises of seven papers with a balance combination of theory and practical. The course content is regularly updated to keep pace with IT sector. During the three years of graduation, the students go through intensive theoretical and practical training sessions in various aspects of computer science. Besides they are enriched with knowledge beyond the curriculum through the various Value Added Courses, Certificate Courses, Computer Academy Sessions, Industrial Visits etc. The curriculum is truly tuned for the holistic development of the students and aims at nurturing them as proficient programmers and computer professionals.</p>
      </section>

      <section className="bba-introduction home-container">
        <div className="bba-introduction-copy"><p className="bba-eyebrow">BCA Department</p><h2>Objectives</h2><p>To ease the transitioning of students from campus to corporate by providing them world class training and quality technical education.</p></div>
        <img src={recognition} alt="Faculty gathered for a student felicitation at Oxford College" loading="lazy" decoding="async" width={1448} height={1086} />
      </section>

      <section className="bca-band">
        <div className="home-container bca-two-column">
          <article className="bca-card"><h2>Eligibility for Admission</h2><ul><li>Any student who has passed PUC-II Science or Commerce securing a minimum of 40% of marks OR any student who has passed JODC or Diploma in Eng. (of three year duration of Govt. of Karnataka) with minimum of 40% of marks in aggregate in all the semesters/years can apply.</li><li>A student with an Arts or commerce background too can apply.</li></ul></article>
          <article className="bca-card"><h2>BCA Course Objectives</h2><ul>{objectives.map(text => <li key={text}>{text}</li>)}</ul></article>
        </div>
      </section>

      <section className="bca-section home-container"><h2>Career Prospects After BCA</h2><p>After obtaining BCA degree, students can find lucrative job opportunities in leading IT companies like Oracle, IBM, Infosys and Wipro. Some of the roles that one can bag after completing BCA programme are that of a System Engineer, Software Tester, Junior Programmer, Web Developer, System Administrator, Software Developer, etc.</p><p>BCA Graduates are not only recruited by private sector but also by public sector organizations. Government organizations like the Indian Air Force (IAF), Indian Army, and Indian Navy hire a large bunch of computer professionals for their IT department.</p></section>

      <section className="bca-band"><div className="home-container bca-contact"><div><p className="bba-eyebrow">Contact Details</p><h2>Prof. Manjunath G Muttaigeri</h2><p>Head of Department<br />Department of Computer Science &amp; BCA<br />Oxford College of Computer Applications</p></div><dl><div><dt>HoD E-Mail ID</dt><dd><a href="mailto:hodbcaoxfordg@gmail.com">hodbcaoxfordg@gmail.com</a></dd></div><div><dt>Official E-Mail ID</dt><dd><a href="mailto:oxfordcollege.online@gmail.com">oxfordcollege.online@gmail.com</a></dd></div><div><dt>Mob</dt><dd><a href="tel:+919986456444">+91-9986456444</a></dd></div><div><dt>Office Mobile</dt><dd><a href="tel:+918549001111">+91-8549001111</a>, <a href="tel:+919845115557">+91-9845115557</a></dd></div><div><dt>Landline</dt><dd><a href="tel:08362280745">0836-2280745</a></dd></div></dl></div></section>

      <section className="bba-ocba home-container"><h2>How Oxford College of<br className="bba-desktop-break" /> Computer Application Work</h2><div className="bba-activity-gallery bca-photo-gallery">{[[workshop, 'BCA classroom and guest workshop photo collage'], [industryVisit, 'BCA students and faculty outside a blue glass building on an industry visit'], [studentGroup, 'BCA students and faculty gathered outdoors during a visit']].map(([src, alt]) => <div key={src}><img src={src} alt={alt} loading="lazy" decoding="async" /></div>)}</div><ol className="bba-stages bca-stages">{stages.map((text, index) => <li key={text}><ArrowUpRight className="bba-stage-arrow" aria-hidden="true" /><div><h3>Stage {['I', 'II', 'III', 'IV', 'V'][index]}:</h3><p>{text}</p></div></li>)}</ol></section>

      <section className="bca-band"><div className="home-container"><h2>We Do Impart Knowledge On…</h2><ul className="bca-skill-grid">{skills.map(text => <li className="bca-card" key={text}>{text}</li>)}</ul></div></section>

      <section className="bca-band"><div className="home-container"><h2>Workshops and Seminars</h2><div className="bca-workshop-photos">{[[classroomSession, 'BCA students attending a classroom session'], [seminarGuests, 'Guest speakers and faculty at a BCA seminar']].map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" decoding="async" />)}</div><div className="bca-workshops">{workshops.map(([name, role]) => <article className="bca-card" key={name}><h3>{name}</h3><p>{role}</p></article>)}</div></div></section>

      <section className="bca-section home-container"><h2>We Are Part Of</h2><ul className="bca-skill-grid">{certifications.map(text => <li className="bca-card" key={text}>{text}</li>)}</ul></section>
    </main>
  )
}
