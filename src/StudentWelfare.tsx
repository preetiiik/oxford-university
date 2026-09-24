import './StudentWelfare.css'
import CountUp from './CountUp'
import { assets } from './assets'
import alumni1 from './assets/alumini/img1.webp'
import alumni2 from './assets/alumini/img2.webp'
import alumni3 from './assets/alumini/img3.webp'
import alumni4 from './assets/alumini/img4.webp'
import sports1 from './assets/sports/img1.webp'
import sports2 from './assets/sports/img2.webp'
import sports3 from './assets/sports/img3.webp'
import sports4 from './assets/sports/img4.webp'
import sports5 from './assets/sports/img5.webp'
import sports6 from './assets/sports/img6.webp'
import sports7 from './assets/sports/img7.webp'
import sports8 from './assets/sports/img8.webp'
import sports9 from './assets/sports/img9.webp'
import sports10 from './assets/sports/img10.webp'
import sports11 from './assets/sports/img11.webp'
import sports12 from './assets/sports/img12.webp'
import sports13 from './assets/sports/img13.webp'

const sections = [
  ['alumni', 'Alumni', 'A lifelong Oxford network that keeps students connected beyond graduation.'],
  ['administration-cells', 'Administration Cells', 'Dedicated support cells that help students navigate academic and campus life.'],
  ['cocurricular-activity', 'Cocurricular Activity', 'Clubs, workshops and learning experiences that complement classroom education.'],
  ['extra-curricular-activity', 'Extra Curricular Activity', 'A vibrant calendar of culture, creativity, leadership and student participation.'],
  ['scholarships-and-schemes', 'Scholarships and Schemes', 'Support schemes that help deserving students continue their academic journey.'],
  ['student-administration-cells', 'Various student administration Cells', 'Student-focused services created to make campus life more supportive and accessible.'],
  ['sports', 'Sports', 'Opportunities to build teamwork, discipline and confidence through sport.'],
] as const

export function StudentWelfarePage() {
  return <main className="welfare-page">

  </main>
}

const scholarshipSchemes = ['National Scholarship Portal', 'State Scholarship Portal', 'Minority Scholarship', 'VidyaposhaK Scholarship', 'Vidyasiri Scholarship', 'Jindal Scholarship']

export function ScholarshipsPage() {
  return <main className="scholarship-page student-welfare-page"><section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><p className="alumni-hero-label">Student Welfare</p><h1>Scholarships & Schemes</h1><p>Support that helps every learner move forward.</p></div></section><section className="scholarship-intro section-shell section-pad"><div><p className="eyebrow">Financial Support</p><h2>Opportunity should never be limited by circumstance.</h2></div><p>Oxford connects students with government scholarship schemes and college support so they can focus more fully on education, growth and co-curricular activities.</p></section><section className="scholarship-list section-shell section-pad"><p className="eyebrow">Government Scholarship Schemes</p><div className="scholarship-grid">{scholarshipSchemes.map((scheme,index)=><article key={scheme}><span>0{index+1}</span><div><h3>{scheme}</h3><p>Explore eligibility and application support through the appropriate scholarship portal.</p></div></article>)}</div></section><section className="management-scheme section-shell section-pad"><div><p className="eyebrow">College Support</p><h2>College Management Scheme</h2></div><p>The College Management believes in overall support to the students. It encourages them to focus more on education and co-curricular activities by providing financial assistance to deserving students. Scholarship is given to assist and encourage students towards Education. Students who score more than 90% in their previous examinations are awarded Merit Scholarship on their admission to our Institution. Sports students are awarded fee concession for their National and International Participation achievement to the extent of 50% to 100% fee concession for their achievements. Fee concession is also provided to students belonging to economically weaker section on approval from the trust.</p></section></main>
}

const studentAdministrationCells = ['Women Cell', 'Anti Ragging Cell', 'Sexual Harassment Cell', 'Reading Room Cell', 'Social Cell', 'Sports Cell', 'Alumni Cell']

export function StudentAdministrationCellsPage() {
  return <main className="student-cells-page student-welfare-page"><section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><p className="alumni-hero-label">Student Welfare</p><h1>Student Administration Cells</h1><p>Dedicated spaces for support, safety and belonging.</p></div></section><section className="cells-intro section-shell section-pad"><div><p className="eyebrow">Student Support</p><h2>People and services that help campus life work better.</h2></div><p>Our student administration cells create a caring, inclusive and well-organised campus. Each cell supports a specific part of student life and helps every learner feel heard and involved.</p></section><section className="cells-list section-shell section-pad"><p className="eyebrow">Our Cells</p><div className="cells-grid">{studentAdministrationCells.map((cell,index)=><article key={cell}><span>0{index+1}</span><div><h3>{cell}</h3><p>Support, guidance and student-focused initiatives for a stronger Oxford community.</p></div></article>)}</div></section><section className="cells-cta section-shell section-pad"><p className="eyebrow">A Supportive Campus</p><h2>Every student deserves a safe place to learn, participate and grow.</h2></section></main>
}

const sportsImages = [sports1, sports2, sports3, sports4, sports5, sports6, sports7, sports8, sports9, sports10, sports11, sports12, sports13]

export function SportsPage() {
  return <main className="sports-page student-welfare-page"><section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><p className="alumni-hero-label">Student Welfare</p><h1>Sports</h1><p>Fitness, teamwork and the spirit to go further.</p></div></section><section className="sports-intro section-shell section-pad"><div><p className="eyebrow">Physical Education & Sports</p><h2>Where dedication becomes achievement.</h2></div><div><p>We can proudly claim that we have an outstanding Department of Physical Education and Sports. Through the decades, the Department has nurtured students showing potential in any area of sports and has assisted and motivated them to realize their full potential.</p><p>Our impressive list of winners stands testimony to our accomplishments. Every year, students achieve distinction and win medals at international, national, state and university levels, from athletics to weightlifting and from taekwondo to throw ball.</p></div></section><section className="sports-values section-shell"><article><strong>01</strong><h3>Train with purpose</h3><p>Training facilities, allowances and cash awards support students as they work towards sporting excellence.</p></article><article><strong>02</strong><h3>Fitness as a way of life</h3><p>Multi-gym sessions, yoga classes, interclass tournaments and the annual Athletic Meet keep the whole campus active.</p></article><article><strong>03</strong><h3>Compete together</h3><p>The Sports Committee with the Principal as Chairman plans activities and helps improve the performance of budding sportspersons.</p></article></section><section className="sports-gallery section-shell section-pad"><div className="section-heading"><div><p className="eyebrow">Moments in Motion</p><h2>Our sporting spirit.</h2></div><p>From tournaments to team celebrations, every moment builds confidence and community.</p></div><div className="sports-gallery-grid">{sportsImages.map((image,index)=><figure key={image}><img src={image} alt={`Oxford sports moment ${index+1}`}/></figure>)}</div></section></main>
}

export function AdministrationCellPage() {
  return <main className="administration-page student-welfare-page"><section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><p className="alumni-hero-label">Student Welfare</p><h1>Administration Cell</h1><p>Support, safety and a stronger student community.</p></div></section><section className="admin-intro section-shell section-pad"><div><p className="eyebrow">Student Support</p><h2>A campus where every concern is heard.</h2></div><p>The Grievance Redressal Cell attempts to address genuine problems and complaints of students whatever be the nature of the problem. Students are encouraged to use the suggestion boxes placed on different sections of the campus to express constructive suggestions and grievances. They may also approach the members of the cell or any of their teachers as is comfortable to them.</p></section><section className="admin-content section-shell"><article className="admin-highlight"><span>01</span><div><p className="eyebrow">Grievance Redressal</p><h2>Speak up with confidence.</h2><p>Students are requested to note that making a complaint is serious and therefore they are to use this power in a responsible manner. At the same time, the college assures students that once a complaint is made, it will be treated with sensitivity and confidentiality.</p></div></article><article className="admin-anti"><div><p className="eyebrow">Safe Campus</p><h2>The Discipline and Anti-Ragging Cell</h2></div><div><p>The Discipline and Anti-Ragging Cell, established according to the regulations of the UGC, is the moral police of our college. The Cell’s responsibility is to ensure that students maintain discipline in the classrooms and within the college campus.</p><p>Members of the cell regularly go on rounds to each and every classroom to make note of errant behaviour and to make sure that the college campus is free from ragging and eve-teasing. The Cell takes severe punitive action against students indulging in such heinous activities.</p></div></article><article className="admin-steps"><div><span>01</span><strong>Share a concern</strong><p>Use the suggestion boxes or approach a cell member or teacher.</p></div><div><span>02</span><strong>Responsible review</strong><p>Every complaint is considered carefully and responsibly.</p></div><div><span>03</span><strong>Confidential support</strong><p>Concerns are treated with sensitivity and confidentiality.</p></div></article></section></main>
}

const coCurricularActivities = ['National Conference', 'Workshop on Career opportunities in Banking', 'Workshop on Personality Development and Soft Skills', 'Training sessions on Tally and ERP', 'Placement Drive']

export function CoCurricularPage() {
  return <main className="cocurricular-page student-welfare-page"><section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><p className="alumni-hero-label">Student Welfare</p><h1>Co-Curricular Activity</h1><p>Learning that continues beyond the classroom.</p></div></section><section className="cocurricular-intro section-shell section-pad"><div><p className="eyebrow">Learning in Action</p><h2>Build skills. Discover opportunities. Grow with confidence.</h2></div><p>Oxford’s co-curricular activities give students practical exposure, industry awareness and the confidence to prepare for their future careers.</p></section><section className="cocurricular-list section-shell section-pad"><p className="eyebrow">Our Activities</p><div>{coCurricularActivities.map((activity,index)=><article key={activity}><span>0{index+1}</span><div><h3>{activity}</h3><p>Engaging experiences designed to strengthen knowledge, communication and professional readiness.</p></div></article>)}</div></section><section className="cocurricular-cta section-shell section-pad"><p className="eyebrow">Student Growth</p><h2>Every opportunity is a step towards a stronger future.</h2></section></main>
}

const extraCurricularActivities = ['Investiture of Secretaries', 'Fresher’s Day', 'Dandiya Night', 'Pro-Kabbaddi', 'Movie Day', 'Crazy Cricket', 'Women’s Week', 'Annual Social Gathering']

export function ExtraCurricularPage() {
  return <main className="extra-page student-welfare-page"><section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><p className="alumni-hero-label">Student Welfare</p><h1>Extra Curricular Activities</h1><p>Celebrate, participate and create memories together.</p></div></section><section className="extra-intro section-shell section-pad"><div><p className="eyebrow">Beyond the Classroom</p><h2>Find your people. Follow your interests. Make it memorable.</h2></div><p>Oxford’s extra-curricular activities create a lively campus experience where students can explore culture, sport, creativity and community.</p></section><section className="extra-list section-shell section-pad"><div className="extra-heading"><p className="eyebrow">Campus Calendar</p><h2>Moments made together.</h2></div><div className="extra-grid">{extraCurricularActivities.map((activity,index)=><article key={activity}><div className="extra-number">0{index+1}</div><div><h3>{activity}</h3><p>Student-led experiences that bring energy, connection and confidence to campus life.</p></div><img src={assets.campusPage.images[index%assets.campusPage.images.length]} alt={`${activity} at Oxford`}/></article>)}</div></section><section className="extra-cta section-shell section-pad"><p className="eyebrow">Student Life</p><h2>There is always a reason to show up and be part of Oxford.</h2></section></main>
}

const alumniImages = [alumni1, alumni2, alumni3, alumni4]

export function AlumniPage() {
  return <main className="alumni-page student-welfare-page">
    <section className="page-hero" 
    style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}>
        <div>
            <p className="eyebrow alumni-hero-label">Student Welfare</p>
            <h1>Alumni</h1>
            <p>Once Oxford, always part of the Oxford family.</p>
            </div>
            </section>
            
            <section className="alumni-intro section-shell section-pad">
                <p className="eyebrow">Our Alumni Network</p>
                <h2>Connected by Oxford. Inspired to give back.</h2>
                <p>Oxford College Alumni Association is an ever-growing community 
                    of hundreds of students. The association serves as a platform to 
                    keep the college connected with its ever-growing student community. 
                    Interaction between the present and former students witnesses knowledge 
                    and experience sharing.</p><p>Our alumni support students through regular 
                    interaction, training, job fairs, extracurricular activities and 
                    career guidance. Their time and experience help current students build 
                    confidence and gain a competitive edge in today's job market.
                    </p>
                    <div className="alumni-stats">
                        <div>
                            <strong><CountUp value="500+" /></strong>
                            <span>Alumni community</span>
                            </div>
                            <div>
                                <strong><CountUp value="15+" /></strong>
                                <span>Years of connection</span>
                                </div>
                                <div>
                                    <strong><CountUp value="100%" /></strong>
                                    <span>Oxford spirit</span>
                                    </div>
                                    </div>
                                    </section>
                                    
                                    <section className="alumni-gallery section-shell section-pad">
                                        <div className="section-heading">
                                            <div>
                                                <p className="eyebrow">Memories & Milestones</p>
                                                <h2>Generations of Oxford.</h2>
                                                </div>
                                                <p>Every reunion, interaction and shared achievement adds a new chapter to our alumni story.</p>
                                                </div>
                                                
                                                <div className="alumni-gallery-grid">
                                                  {[[0, 3], [1, 2]].map((indices, column) => (
                                                    <div className={column === 0 ? 'alumni-gallery-main' : 'alumni-gallery-sticky'} key={column}>
                                                      {indices.map(index => (
                                                        <figure key={alumniImages[index]} style={{ order: index }}>
                                                          <img src={alumniImages[index]} alt={`Oxford alumni memory ${index + 1}`} />
                                                          <figcaption>{['Alumni Meet', 'Building Connections', 'Shared Memories', 'Growing Together'][index]}</figcaption>
                                                        </figure>
                                                      ))}
                                                    </div>
                                                  ))}
                                                </div>
                                                        </section>
                                                        
                                                        <section className="alumni-connect section-shell section-pad">
                                                            <p className="eyebrow">Stay Connected</p>
                                                            <h2>Come back. Share your story. Inspire the next generation.</h2>
                                                            <p>Whether you are a recent graduate or one of our earliest alumni, 
                                                                there will always be a place for you at Oxford.
                                                                </p>
                                                                </section>
                                                                </main>
}
