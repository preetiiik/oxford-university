/**
 * Oxford Institutions — Departments page (single file, Tailwind CSS)
 *
 * Reuses <Header />, <Footer /> and <PageStyles /> from ./Home.
 * Images: ./assets/departments/*.jpg  (see the image list below).
 *
 * Exports:
 *   default  DepartmentsPage     – header + department rows + footer
 *   named    DepartmentsSections – only the <main> content
 */
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { assets } from './assets'

import { Footer, Header, PageStyles } from './Home'

import bbaImg from './assets/departments/bba.jpg'
import bcaImg from './assets/departments/bca.jpg'
import bcomImg from './assets/departments/bcom.jpg'
import pucScienceImg from './assets/departments/puc-science.jpg'
import pucCommerceImg from './assets/departments/puc-commerce.jpg'
import mcomImg from './assets/departments/mcom.jpg'
import mbaImg from './assets/departments/mba.jpg'
import mcaImg from './assets/departments/mca.jpg'

/* -------------------------------------------------------------------------- */
/*  Shared class strings (same tokens as Home.tsx)                             */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

type Department = { name: string; text: string; img: string; alt: string; to: string }

const departments: Department[] = [
  {
    name: 'BBA Department',
    img: bbaImg,
    alt: 'BBA students and faculty posing with their trophies',
    to: '/bba-department',
    text: 'Oxford College of BBA is one of the premier institutes rendering education in the realm of Management Studies since 2006. It has grown tremendously since its inception because of the students who have hit the purple patch in every field by securing ranks to University, acquiring the title of University Blue, winning ‘General championships’ in various fests and have successfully organized management fests, events, rallies and social welfare activities. Our belief is that we want to break all the existing walls in the society between a teacher and student.',
  },
  {
    name: 'BCA Department',
    img: bcaImg,
    alt: 'BCA students and faculty in front of the Tata Consultancy Services wall',
    to: '/bca-department',
    text: 'The BCA (Bachelor of Computer Application) programme provides student with necessary skills to make successful career in Information Technology sector area. It also prepares students with the requisite background to proceed with confidence for higher studies in the form of MCA, MIT, MS in computers, MBA, etc, and thus acquire greater competency. The BCA course structure is spread across six semesters in three years and is a programme of Karnataka University, Dharwad. The course content is regular updated to keep pace with IT sector.',
  },
  {
    name: 'B.COM Department',
    img: bcomImg,
    alt: 'B.Com students and faculty at an Oxford College event',
    to: '/bcom-department',
    text: 'Oxford College of Commerce is one of the premier institutes rendering education in the realm of Commerce studies since 2008. It has played a key role in shaping and refining the students in the field of Commerce. The Bachelor of Commerce (B.Com) program is an inclusive 3-year undergraduate program (6 semesters) offered by Karnataka University Dharwad and Affiliated to AICTE, provides students with essential skills and knowledge in areas such as cost accounting, taxation, international trade, and financial services, etc.',
  },
  {
    name: 'PUC Science Department',
    img: pucScienceImg,
    alt: 'PUC Science students on stage at the Zenith valedictory event',
    to: '/admissions',
    text: 'The PUC Science programme provides students with the necessary knowledge and skills to build a strong foundation in the field of science and technology. It also prepares students with the requisite background to proceed with confidence for higher studies in the form of Engineering, Medical, Pharmacy, B.Sc., Biotechnology, Nursing, etc., and thus acquire greater competency. The PUC Science course structure is spread across two years in four semesters and is a programme affiliated to the Pre-University Education Board.',
  },
  {
    name: 'PUC Commerce Department',
    img: pucCommerceImg,
    alt: 'PUC Commerce students seated in a lecture hall',
    to: '/admissions',
    text: 'Oxford College of Commerce is one of the premier institutes rendering education in the realm of Commerce studies since 2008. It has played a key role in shaping and refining the students in the field of Commerce. The PUC Commerce program is a comprehensive 2-year pre-university program (4 semesters) affiliated to the Pre-University Education Board, providing students with essential skills and knowledge in areas such as Accountancy, Business Studies, Economics, Statistics, and Banking fundamentals, etc.',
  },
  {
    name: 'M.COM Department',
    img: mcomImg,
    alt: 'M.Com students and faculty in a classroom',
    to: '/mcom-department',
    text: 'The course shall be of four semesters and each semester is of Sixteen weeks duration. No student shall be permitted to obtain degree earlier than four semesters or to take more than eight semesters i.e., the student shall complete the course within four years from the date of admission to the first semester of Post Graduate Programme. The academic session in each semester will provide 90 teaching days. Candidates shall not register for any other regular course other than Diploma and Certificate Courses during the duration of the PG Programme.',
  },
  {
    name: 'MBA Department',
    img: mbaImg,
    alt: 'MBA students working at computers in a lab',
    to: '/mba-department',
    text: 'Since its inception in 2006, Oxford College has consistently upheld excellence in education, under the stewardship of Shri Vasant Horatti, Chairman Oxford Group of Institutions. Over the past 18 years, we have provided exceptional educational experiences in various sectors, cultivating talent and fostering innovation. At OXFORD, we take pride in offering a comprehensive and rigorous Master of Business Administration (MBA) program to equip with the business knowledge, skills, and practical experience to excel in today’s business world.',
  },
  {
    name: 'MCA Department',
    img: mcaImg,
    alt: 'MCA students working on laptops in a classroom',
    to: '/mca-department',
    text: 'Oxford Group of Institutions, one of the renowned and prominent institution rendering its services in the field of education for 18 years. The Group of institutions has created history with remarkable achievements in the field of academics, co-curriculum, placements, sports etc. In the span of 18 Years the institutions have shaped the following results. Oxford College is proud to announce its new AICTE approved Master of Computer Applications (MCA) programme, designed to equip students with advanced skills in Computer Science and Technology management.',
  },
]

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

function DepartmentRow({ dept, index }: { dept: Department; index: number }) {
  return (
    <article id={dept.name === 'PUC Science Department' ? 'puc-science' : dept.name === 'PUC Commerce Department' ? 'puc-commerce' : undefined} className={`department-row${index % 2 === 1 ? ' department-row-reversed' : ''}`}>
      <div className="department-photo">
        <img
          src={dept.img}
          alt={dept.alt}
          width={647}
          height={422}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      <div className="department-copy">
        <h2>{dept.name}</h2>
        <p>{dept.text}</p>
        <Link to={dept.to} className="department-explore" aria-label={`Explore ${dept.name}`}>
          Explore Program <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export function DepartmentsSections() {
  const pageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const page = pageRef.current
    if (!page || !('IntersectionObserver' in window)) return
    const rows = page.querySelectorAll<HTMLElement>('.department-row')
    const reveal = (row: Element) => row.classList.add('department-visible')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    rows.forEach((row) => {
      row.classList.add('department-animated')
      observer.observe(row)
    })
    // Keyboard navigation reveals a row immediately, even before scrolling.
    const onFocus = (event: FocusEvent) => {
      const row = (event.target as Element).closest('.department-row')
      if (row) reveal(row)
    }
    page.addEventListener('focusin', onFocus)
    return () => {
      observer.disconnect()
      page.removeEventListener('focusin', onFocus)
      rows.forEach((row) => row.classList.remove('department-animated', 'department-visible'))
    }
  }, [])

  return (
    <main ref={pageRef} className="departments-page">
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})` }}>
        <div><h1>Departments</h1><p>Discover academic programmes that prepare you for your future.</p></div>
      </section>
      <div className="departments-rows home-container">
        {departments.map((dept, i) => (
          <DepartmentRow key={dept.name} dept={dept} index={i} />
        ))}
      </div>
    </main>
  )
}

export default function DepartmentsPage() {
  return (
    <div className="overflow-x-clip bg-white font-['Montserrat',Arial,sans-serif] text-[14px] text-[#0A1628] antialiased">
      <PageStyles />
      <Header />
      <DepartmentsSections />
      <Footer />
    </div>
  )
}
