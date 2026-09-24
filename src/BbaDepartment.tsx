import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import marketingIcon from './assets/bba/marketing.png'
import financeIcon from './assets/bba/finance.png'
import humanResourceIcon from './assets/bba/human-resource.png'
import intro from './assets/bba/img9.webp'
import gallery1 from './assets/bba/img5.webp'
import gallery2 from './assets/bba/img6.webp'
import gallery3 from './assets/bba/img7.webp'
import hero from './assets/departments/img8.webp'

const subjects = [
  { title: 'Marketing', icon: marketingIcon, text: 'Learn branding, digital marketing, and consumer behavior to build effective marketing strategies.' },
  { title: 'Finance', icon: financeIcon, text: 'Learn financial management, investment planning, and accounting to make smart business decisions.' },
  { title: 'Human Resource', icon: humanResourceIcon, text: 'Learn recruitment, team management, and leadership to manage people effectively.' },
]
const stages = [
  'Induction, Orientation & Mentoring of each student',
  'Rigorous core subject classes along with industry expert lectures',
  'Skill & Personality Development (Fests, Sports, Field Study)',
  'Choice of in-plant projects & co-curriculars aligned with career goals',
]

export default function BbaDepartment() {
  const pageRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!pageRef.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add('bba-visible')
          observer.unobserve(target)
        }
      })
    }, { threshold: .08 })
    const sections = pageRef.current.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      sections.forEach((section) => section.classList.remove('bba-visible'))
    }
  }, [])

  return (
    <main className="bba-detail" ref={pageRef}>
      <section className="bba-banner" aria-labelledby="bba-title">
        <img src={hero} alt="Oxford BBA students and faculty" fetchPriority="high" />
        <h1 id="bba-title">BBA Department</h1>
      </section>

      <section className="bba-course home-container">
        <h2>BBA Course Structure</h2>
        <p>BBA is a three-year fulltime course that is designed to develop future professionals, rather than mere degree holders. With a perfect blend of theory and practice which will develop the competencies required to make the students employable and Oxford BBA college is permanently affiliated to Karnatak University Dharwad. The program targets young, dynamic students who are interested in pursuing careers as management executives in various sectors, including industry, business, and non-profit organizations. It is an ideal course for those who aspire to develop strong managerial and entrepreneurial abilities and want to play a key role in driving business growth and development.</p>
        <p>Throughout the program, students are introduced to core management concepts, business strategies, organizational behavior, and leadership principles. It equips them with the knowledge and practical skills necessary to manage and lead teams, understand market dynamics, and solve complex business challenges. This foundation helps students not only excel in managerial roles but also prepares them for entrepreneurial ventures. Additionally, the program is an excellent starting point for students who plan to pursue postgraduate studies in management, offering a robust academic base for advanced learning in specialized fields.</p>
      </section>

      <section className="bba-introduction home-container">
        <div className="bba-introduction-copy">
          <p className="bba-eyebrow">BBA Department</p>
          <h2>Shape Your Future in <em>Business &amp; Management</em></h2>
          <p>Oxford College, Hubli, offers top-tier BBA program designed to cultivate leadership, strategic thinking, and managerial expertise. Our cutting-edge curriculum, industry collaborations, and practical learning approach prepare students for thriving careers in business and entrepreneurship.</p>
        </div>
        <img src={intro} alt="Oxford BBA students gathered on the campus steps" loading="lazy" width={641} height={326} />
      </section>

      <section className="bba-subjects" aria-label="BBA specializations">
        <div className="home-container">
          {subjects.map(({ title, text, icon }) => (
            <article className="bba-subject" key={title}>
              <span className="bba-subject-icon"><img src={icon} alt="" width={51} height={51} /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="bba-ocba home-container">
        <h2>How Oxford College of Business<br className="bba-desktop-break" /> Administration (OCBA) Work</h2>
        <div className="bba-activity-gallery">
          {[gallery1, gallery2, gallery3].map((src, index) => (
            <div key={src}><img src={src} alt={['BBA students on an outdoor learning visit', 'Oxford students receiving an award', 'BBA students participating in a college event'][index]} width={411} height={286} loading="lazy" /></div>
          ))}
        </div>
        <ol className="bba-stages">
          {stages.map((text, index) => (
            <li key={text}><ArrowUpRight className="bba-stage-arrow" size={24} aria-hidden="true" /><div><h3>Stage {index + 1}:</h3><p>{text}</p></div></li>
          ))}
        </ol>
      </section>
    </main>
  )
}
