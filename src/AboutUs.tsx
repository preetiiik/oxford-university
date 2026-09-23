import { assets } from './assets'
import chairmanImage from './assets/aboutus/chairman-img.png'
import directorImage from './assets/aboutus/director-img.png'
import principalImage from './assets/aboutus/principal-img.png'

const leaders = [
  ['Shri Vasant B. Horatti', 'CHAIRMAN, OXFORD GROUP OF INSTITUTIONS', 'Oxford Group of Institutions is truly emerging as the nurturing ground for leadership — attracting good faculty, good students and purposeful, supportive environments across every campus.'],
  ['Dr. Manish Kothari', 'DIRECTOR, DEPT. OF COMMERCE & MANAGEMENT STUDIES', 'Our Management programs blend rigorous academic coursework with practical, real-world experience — case studies, internships, global exposure — so students are shaped for the future, not just prepared for it.'],
  ['Prof. Manjunath Muthageri', 'PRINCIPAL, OXFORD COLLEGE OF COMPUTER APPLICATIONS', 'Every student is unique in their own way, requiring personal attention to become successful and responsible citizens who respect society — combining learning across disciplines, music, sports and environment.'],
]
const advisors = ['Mr. Anjaneyappa V', 'Mr. Madan Desai', 'Dr. Ilamshian E', 'Mr Krishnamurthy S', 'Mr. Gurumurthy', 'Mr Senthil Nayagam T', 'Dr. Gopalan M R', 'Mr Nandish Omprakash V', 'Dr Janardhan H']

export function AboutUsPage() {
  return <main className="about-page">
    <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><h1>About Us</h1><p>Discover the people, purpose and principles behind Oxford Institutions.</p></div></section>
    <section className="about-intro section-shell section-pad"><div className="about-intro-copy"><p className="eyebrow">About Us</p><h2>The Oxford Group <em>of Institutions</em></h2><p>Founded in 2006 under the leadership of Shri Vasant B. Horatti (Chairman), Oxford College, Hubballi stands for Opportunity. From BBA, BCA and B.Com to today's MBA and MCA programs, our mission is to nurture minds that dare to question, create, and lead.</p><div className="about-stats"><span><strong>2006</strong>Year Founded</span><span><strong>25+</strong>Years of Excellence</span><span><strong>6</strong>Academic Programs</span><span><strong>1</strong>Guiding Chairman</span></div></div><div className="about-intro-visual" aria-label="Oxford campus moments"><figure className="about-intro-image-main"><img src={assets.campusPage.images[0]} alt="Oxford students learning together"/></figure><figure className="about-intro-image-top"><img src={assets.campusPage.images[1]} alt="Oxford student activity"/></figure><figure className="about-intro-image-bottom"><img src={assets.campusPage.images[2]} alt="Oxford campus learning"/></figure><span className="about-intro-badge">Since <strong>2006</strong></span></div></section>
    <section className="about-story"><div className="section-shell about-story-grid"><div className="story-image-placeholder"><span>20+<small>Years of Growth</small></span></div><div><p className="eyebrow">Our Story</p><h2>Opportunity, Since 2006</h2><p>Oxford College, Hubballi began its relentless journey in 2006 with BBA (72 students), BCA (68 students) and, from 2008, B.Com (51 students). The Department of M.Com followed in 2013 with 40 students — and the numbers have grown steadily ever since.</p><p>Our aim goes beyond turning out successful graduates. We hone every aspect of a student's personality, imparting virtues that shape dynamic personalities who truly contribute to a better world — the mission behind the name OXFORD.</p><p>A judicious mix of theory and practice, world-class infrastructure and multi-tasking leadership development ensure every learner leaves as a globally adaptable professional with social sensitivity.</p><div className="story-years"><span><b>2006</b>BBA & BCA launched</span><span><b>2008</b>B.Com introduced</span><span><b>2013</b>M.Com department</span><span><b>2024</b>MBA & MCA launched</span></div></div></div></section>
    <section className="about-leadership section-shell section-pad"><p className="eyebrow">Leadership</p><h2>Voices That <em>Guide Us</em></h2><div className="leader-list">{leaders.map(([name,role,quote])=><article key={name}><div className="leader-avatar"/><div><h3>{name}</h3><strong>{role}</strong><p>“{quote}”</p></div></article>)}</div></section>
    <section className="about-principles section-pad"><div className="section-shell"><p className="eyebrow">Guiding Principles</p><h2>Our <em>Vision & Mission</em></h2><div className="principles-grid"><article><h3>Vision</h3><ul><li>Practice and preach “Sadhan, Sadhana and Sadhya” to prepare youth for the future.</li><li>Create an integrated system that meets higher educational needs.</li><li>Work relentlessly toward community and national development through knowledge.</li><li>Be efficient, effective, community acceptable and excel in education and service.</li><li>Induce paradigm shifts so education becomes a prerequisite for human development.</li></ul></article><article><h3>Mission</h3><ul><li>Develop true leaders, delivering quality education and nurturing a sense of belonging.</li><li>Learner-centered education of excellence.</li><li>Develop adaptability to technological skills for changing global village.</li><li>Induce knowledge that fosters self-learning, continuous improvement and innovation.</li><li>Build strong community-oriented research and relationships.</li></ul></article></div></div></section>
    <section className="about-advisory section-shell section-pad"><p className="eyebrow">Advisory Board</p><h2>Guided by <em>Distinguished Minds</em></h2><div className="advisor-grid">{advisors.map((name,i)=><article key={name}><span>{name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><div><strong>{name}</strong><small>{i%2?'Ex-President, Chamber of Commerce, Hubli':'CM, Metropolitan Transport Corp., BE, MS, PGDIE'}</small></div></article>)}</div></section>
  </main>
}

const chairmanMessage = [
  'In the emerging highly competitive world, there is obvious need to produce dynamic minds that can adapt to the changing scenario and complex situations and are innovative enough to face the diverse challenges effectively. Oxford Group of Institutions is truly emerging as the nurturing ground for leadership. It is becoming synonymous with practical, industry-focused education and is attracting students across the globe.',
  'Since the mission of our institution is to impart quality education, it constantly strives to attract good faculty, good students, provides good infrastructure and purposeful supportive environment in its Institutions. There can be no half measures when it comes to quality. We spare no effort to inculcate the quality philosophy into our students. With students fired with determination to excel, a competent and dedicated faculty, meticulously designed curricula and the optimum infrastructure, Oxford Group of Institutions has grown to be a reckoning force in the world of education.',
  'We create multi tasking leaders, emphasizing potential in every student. At Oxford College Hubballi, we ensure to deliver quality education because we believe that the power of a nation lies in its youth. An air of academics pervades the whole atmosphere of Oxford teaching faculty, excellent facilities and amenities for students through its well equipped department of studies, library, laboratories, computer labs, recreational hall and assistance round the clock of the non-teaching staff. Oxford College, Hubballi is being vibrant in its infrastructure and ambiance. Learning at Oxford College, Hubballi therefore is a privilege and a pride.',
  'I warmly welcome the aspiring students into the Oxford Group of Institutions fraternity. I hope you have a tremendous learning and joyful time at Oxford College, Hubballi.',
]

export function ChairmanMessagePage() {
  return <main className="chairman-page">
    <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><h1>Chairman’s Message</h1><p>A message of purpose, quality and opportunity from the Oxford Group.</p></div></section>
    <section className="chairman-message section-shell section-pad"><div className="chairman-portrait"><img src={chairmanImage} alt="Shri Vasant B. Horatti, Chairman of Oxford Group of Institutions"/><span>Oxford Group<br/><strong>Leadership</strong></span></div><article className="chairman-copy"><p className="eyebrow">From the Chairman</p><h2>Building minds that lead with purpose.</h2>{chairmanMessage.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}<div className="chairman-signature"><span>With warm regards,</span><strong>Shri Vasant B. Horatti</strong><small>Chairman, Oxford Group of Institutions</small></div></article></section>
  </main>
}

const directorMessage = [
  'Welcome to Oxford College of Business Administration, where your journey toward leadership, innovation, and excellence begins. As the Director of the B.Com/ BBA/ MBA program, it is my pleasure to extend a warm invitation to all ambitious, driven, and forward-thinking individuals who are looking to make a significant impact in the world of business.',
  'Our Management programs are designed to equip you with the knowledge, skills, and strategic insights required navigating today’s rapidly evolving business landscape. We emphasize a holistic approach to learning, blending rigorous academic coursework with practical, real-world experience. Through case studies, internships, global exposure, and industry collaboration, we ensure that our students are not just prepared for the future—they are poised to shape it.',
  'At Oxford College of Business Administration, we understand that the path to success is diverse and unique for every individual. That’s why our program is tailored to support your personal and professional growth, whether you are a recent graduate or a seasoned professional. With our distinguished faculty, world-class resources, and a vibrant network of alumni, we provide a transformative learning experience that will challenge you, inspire you, and push you to reach your fullest potential.',
  'I encourage you to consider the endless possibilities that a Bachelors and Masters degree from Oxford College of Business Administration can offer. Our commitment to academic excellence, ethical leadership, and global perspectives will provide you with the tools to thrive in today’s dynamic business environment.',
  'I look forward to welcoming you to our community and to partnering with you on this exciting journey of learning and discovery.',
]

export function DirectorMessagePage() {
  return <main className="director-page">
    <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><h1>Director’s Message</h1><p>Preparing ambitious minds for a changing world of business.</p></div></section>
    <section className="director-message section-shell section-pad"><div className="director-portrait"><img src={directorImage} alt="Dr. Manish Kothari, Director of Commerce and Management Studies"/><span>Commerce &<br/><strong>Management</strong></span></div><article className="director-copy"><p className="eyebrow">A Welcome from the Director</p><h2>Learn with ambition. Lead with confidence.</h2>{directorMessage.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}<div className="director-signature"><span>Sincerely,</span><strong>Dr. Manish Kothari</strong><small>Director, Dept. of Commerce and Management Studies<br/>Oxford College of Business Administration</small></div></article></section>
  </main>
}

const principalMessage = [
  'The success story of Oxford Degree College is reward for the hard work coupled with systematic planning and focused approach towards providing quality education. Oxford College believes in providing quality education to the students, which is being reflected from the outcome of the students through their achievements.',
  'Education is believed to be a dynamic process, the process of information distribution, exercises, clarification, testing and improvement. This does not stop here it also makes you student for the life as it is “lifelong learning process to be ready for this dynamic process” – it requires regular upgrading of skills, insights and ideas to make use of the opportunities and to maximize the outcomes which are available in this dynamic world.',
  'In Oxford College we understand and recognize that every student is unique in his/her own way and every student requires to be understood, addressed and nurtured with personal attention so that they will become successful and responsible citizens who respect the society and takes all the effort in improving it.',
  'The overall growth of students lie in the combination of learning from different disciplines like music, sports education, health awareness, environmental education, and society science. This growth is required for students for keeping up pace with the present dynamic and global scenario, knowing the negative and positive aspect of it, our process combines all the best practices which concentrates on providing value based system of EDUCATION.',
  'I take great pleasure in inviting you and your children to be a part of learning beyond boundaries and be a part of the spirit of global learning.',
]

export function PrincipalMessagePage() {
  return <main className="principal-page">
    <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><h1>Principal’s Message</h1><p>Learning beyond boundaries, with care for every student.</p></div></section>
    <section className="principal-message section-shell section-pad"><div className="principal-portrait"><img src={principalImage} alt="Prof. Manjunath Muthalgeri, Principal of Oxford College of Computer Applications"/><span>Student Growth<br/><strong>Beyond Boundaries</strong></span></div><article className="principal-copy"><p className="eyebrow">A Welcome from the Principal</p><h2>Every learner deserves the chance to grow.</h2>{principalMessage.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}<div className="principal-signature"><span>Sincerely,</span><strong>Prof. Manjunath Muthalgeri</strong><small>Principal<br/>Oxford College of Computer Applications</small></div></article></section>
  </main>
}

const visionPoints = [
  'The philosophy of “Sadhan”, “Sadhana”, and “Sadhya” is practiced and preached at Oxford College, Hubli to prepare our youth for the future.',
  'To create an integrated system that meets the higher educational needs of the region and community at large.',
  'To work relentlessly towards community/National development through knowledge and technological skills.',
  'To be efficient, effective community acceptable and excel in education and service.',
  'To impart knowledge and interact with organization of similar interest to meet global competency.',
  'To induce paradigm shifts in community that education is prerequisite for human development and to inculcate the value system.',
  'To reach the unreached and serve the under-served with education contributions to the national development.',
  'To be an active component of national educational system so as to develop the institution as the center of excellence.',
]

const missionPoints = [
  'Developing true leaders, delivering quality education, nurturing a sense of belonging and creating pro-active citizens.',
  'Learner centered education of excellence.',
  'Develop adaptability to technological skills, to meet the challenges of changing global village effectively.',
  'Induce knowledge that faster self-learning, Continuous improvement and innovation in higher education.',
  'Efficiency, quality, continuous improvement and innovative in all the process of our system.',
  'Unique product differentiation and stakeholder’s satisfaction.',
  'Consultancy referral center.',
  'Unique organizational value based culture.',
  'Open organizational climate.',
  'Inter organizational linkage with institutions of similar interest.',
  'Strategic future oriented planning.',
  'Community oriented skills and research.',
  'Strong community relationships.',
  'Professionalism in education, management and service.',
  'Meet regional and national educational needs.',
]

export function VisionMissionPage() {
  return <main className="vision-mission-page">
    <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><h1>Vision & Mission</h1><p>The principles that guide Oxford’s learning community forward.</p></div></section>
    <section className="vision-mission-intro section-shell section-pad"><p className="eyebrow">Guiding Principles</p><h2>Purpose with a clear direction.</h2><p>Our vision and mission shape the way we teach, support learners and serve the community.</p></section>
    <section className="vision-mission-grid section-shell"><article className="vision-card"><div className="vision-card-heading"><span>01</span><div><p className="eyebrow">Our Vision</p><h2>Vision</h2></div></div><ul>{visionPoints.map((point)=><li key={point}>{point}</li>)}</ul></article><article className="mission-card"><div className="vision-card-heading"><span>02</span><div><p className="eyebrow">Our Mission</p><h2>Mission</h2></div></div><ul>{missionPoints.map((point)=><li key={point}>{point}</li>)}</ul></article></section>
  </main>
}

const advisoryBoardMembers = [
  ['MR ANBAHAZAGAN V', 'GM, Metropolitan Transport Corp., BE, MS, PGDIE FIHT, FIEA, (PhD)'],
  ['MR MADAN DESAI', 'Ex. President, Chamber of Commerce, hubli'],
  ['DR ILAMATHIAN E', 'Director, Academic Staff College, University of Chennai, MS, PhD, Principal'],
  ['MR KRISHNAMURTHY S', 'FCA, Visiting Faculty IIM(B), IIT(B), IILM(Delhi) TAPMI (Manipal), TICC (Trivandrum), KMA (Cochin)'],
  ['MR GURUMURTHY', 'MD, Processware Technologies'],
  ['MR SENTHIL NAYAGAM T', 'Chairman Institution of Engineers, BE, ME(Struct), FIE, PGDPM'],
  ['DR GOPALAN M R', 'Professor, Msc (Birmingham), DIIT (Ind. Engg), BE(Mech),IIM(B), Fellow in Management IIM(A)'],
  ['MR NANDIMATH OMPRAKASH V', 'Assistant Professor, Co-ordinator, National Law School of India University'],
  ['DR JANARDHAN JHA', 'Senior Advior Manipal University Learning, Ex-Vice Chancellor IGNOU, Delhi & Birla Institute of Technology, Ranchi'],
  ['DR JANARDHAN JHA', 'Senior Advior Manipal University Learning, Ex-Vice Chancellor IGNOU, Delhi & Birla Institute of Technology, Ranchi'],
]

export function AdvisoryBoardPage() {
  return <main className="advisory-board-page">
    <section className="advisory-board-intro section-shell">
      <p className="eyebrow">Our Advisors</p>
      <h1>Experience that guides every step.</h1>
      <p className="advisory-board-description">Our advisory board brings together leaders from education, industry, law and public service to strengthen the Oxford learning experience.</p>
    </section>
    <section className="advisory-board-grid section-shell">
      {advisoryBoardMembers.map(([name,role],index)=>(
        <article key={`${name}-${index}`}>
          <span className="advisory-number">{String(index + 1).padStart(2,'0')}</span>
          <div>
            <h3>{name}</h3>
            <p>{role}</p>
          </div>
        </article>
      ))}
    </section>
  </main>
}

export function OxfordGroupPage() {
  return <main className="oxford-group-page">
    <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><p className="eyebrow oxford-group-hero-label">About Us</p><h1>The Oxford Group</h1><p>Opportunity, learning and a future built together.</p></div></section>
    <section className="oxford-group-story section-shell section-pad"><div className="oxford-group-gallery"><figure className="oxford-group-gallery-main"><img src={assets.campusPage.images[0]} alt="Oxford students learning together"/></figure><figure><img src={assets.campusPage.images[1]} alt="Oxford student collaboration"/></figure><figure><img src={assets.campusPage.images[2]} alt="Oxford computer lab"/></figure><span>Oxford<br/><strong>Since 2006</strong></span></div><article className="oxford-group-copy"><p className="eyebrow">The Oxford Group</p><h2>Opportunity, learning and a future built together.</h2><p>Oxford College, Hubballi stands for Opportunity, under the leadership of Shri. Vasant B. Horatti (Chairman). We are blissful to state that, we have grown immensely. There has been a clear focus and an adamant execution on the objectives of all departments; Oxford College began its relentless and perdurable journey in the year 2006 with the strength of BBA – 72 students, BCA – 68 Students and B.Com being 51 students in the year 2008.</p><p>We are happy to announce that, there has been a gradual increase in the strength. The Department of M.Com began in 2013 with the promising figure of 40 student. At Oxford College Hubballi, our aim goes beyond turning out just successful graduates. Our determination is to hone and refine every aspect of the student’s personality and impart to them virtues that will shape them not just into fine graduates, but create dynamic personalities who will truly contribute to creating a better world around us. Oxford’s mission is to create and nurture an environment that kindles learning and inspires to build a career, an institution, a nation “OXFORD”.</p><p>The name itself speaks volumes in the field of education. The Oxford College, Hubballi is a cherished dream which has turned into reality in our commercial city, Hubballi. It is a very well established platform for students to launch themselves into their dream courses and realize the same.</p><p>Oxford College, Hubballi sets standards which are apart from the rest. The infrastructure is one of its kinds. The academic focus at Oxford College is to develop a complete student and a globally adaptable professional with social sensitivity. A judicious mix of theory and practice comprises the teaching – learning loop.</p><p>We create multi tasking leaders, emphasizing potential in every student. At Oxford College Hubballi, we ensure to deliver quality education because we believe that the power of a nation lies in its youth. Learning at Oxford College Hubballi therefore is a privilege and a pride.</p><p>Oxford provides the support, skills, knowledge and experience to make successful transition from course to career, no matter how ambitious the targets are. Oxford offer various courses which include:</p><ul><li>Bachelor of Business Administration (BBA) 2006.</li><li>Bachelor of Computer Application (BCA) 2006.</li><li>Bachelor of Commerce (B. Com.) 2008.</li><li>Master of Commerce (M. Com.) 2013.</li><li>Master of Business Administration (MBA) (2024).</li><li>Master of Computer Application (MCA) (2024).</li></ul></article></section>
  </main>
}