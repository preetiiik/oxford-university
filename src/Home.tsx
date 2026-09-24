import CountUp from './CountUp'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import WelfareNavigation from './WelfareNavigation'
import {
  ArrowRight,
  Atom,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  ChevronRight,
  ChevronDown,
  Clock3,
  Cpu,
  GraduationCap,
  Laptop,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import logoCrest from './assets/home/img17.webp'
import heroCampus from './assets/home/img16.webp'
import legacyCampus from './assets/home/img15.webp'
import whyLibrary from './assets/home/img14.webp'
import ctaLibrary from './assets/home/img13.webp'
import campusLibrary from './assets/home/img12.webp'
import campusLab from './assets/home/img11.webp'
import campusCulture from './assets/home/img9.webp'
import campusSports from './assets/home/img10.webp'
import campusCafeteria from './assets/home/img8.webp'
import partnerWipro from './assets/home/img7.webp'
import partnerAirtel from './assets/home/img6.webp'
import partnerAtm from './assets/home/img5.webp'
import partnerXentrix from './assets/home/img4.webp'
import partnerOmega from './assets/home/img3.webp'
import partnerItc from './assets/home/img1.webp'
import partnerTata from './assets/home/img2.webp'

/*
  Figma reference:
  1440px desktop screenshots supplied by the user.
  Main design tokens extracted from those screenshots.
*/
const GREEN = '#407F55'
const CREAM = '#F8F8F0'
const NAVY = '#0A1628'
const BODY = '#536783'
const GOLD = '#C9A84C'

const serif = "font-['Cormorant_Garamond',Georgia,serif]"
const sans = "font-['Montserrat',Arial,sans-serif]"
const display = "font-['DM_Serif_Display',Georgia,serif]"

const container = 'home-container'
const buttonBase =
  'home-button inline-flex h-[48px] items-center justify-center rounded-full px-[23px] text-[13px] font-medium transition'
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#407F55]'

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return (
    <div
      className={`${sans} text-[11px] font-semibold uppercase tracking-[0.34em] ${
        light ? 'text-white' : 'text-[#407F55]'
      }`}
    >
      {children}
    </div>
  )
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  })
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Departments', to: '/departments' },
  { label: 'Campus', to: '/campus' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Events', to: '/events' },
  { label: 'Faculty', to: '/faculty' },
  { label: 'Placements', to: '/placements' },
] as const

const aboutLinks = [
  ['The Oxford Group', '/oxford-group'],
  ["Chairman’s Message", '/chairman-message'],
  ['Director Message', '/director-message'],
  ["Principal’s Message", '/principal-message'],
  ['Vision & Mission', '/vision-mission'],
  ['Advisory Board', '/advisory-board'],
] as const

function AboutNavigation({ onNavigate }: { onNavigate: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const isActive = pathname === '/about-us' || aboutLinks.some(([, to]) => pathname === to)
  return <div className="oxford-department-dropdown oxford-about-dropdown" onPointerEnter={(event) => { if (event.pointerType === 'mouse') setIsOpen(true) }} onPointerLeave={(event) => { if (event.pointerType === 'mouse') setIsOpen(false) }}>
    <div className={`oxford-nav-link oxford-department-control${isActive ? ' is-active' : ''}`}>
      <Link to="/about-us" onClick={onNavigate}>About Us</Link>
      <button type="button" className="oxford-department-arrow" aria-label="Toggle About Us menu" aria-expanded={isOpen} aria-controls="about-us-links" onClick={() => setIsOpen(!isOpen)}><ChevronDown size={14} aria-hidden="true" /></button>
    </div>
    <ul id="about-us-links" className="oxford-department-links" hidden={!isOpen}>{aboutLinks.map(([label, to]) => <li key={to}><NavLink to={to} className={() => pathname === to ? 'active' : ''} onClick={() => { setIsOpen(false); onNavigate() }}>{label}</NavLink></li>)}</ul>
  </div>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [departmentsOpen, setDepartmentsOpen] = useState(false)
  const departmentRef = useRef<HTMLDivElement>(null)
  const departmentButtonRef = useRef<HTMLButtonElement>(null)
  const keepDepartmentsOpen = useRef(false)
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (keepDepartmentsOpen.current && pathname === '/departments' && !hash) {
      keepDepartmentsOpen.current = false
      setDepartmentsOpen(true)
      return
    }
    setOpen(false)
    setDepartmentsOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    if (!departmentsOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (!departmentRef.current?.contains(event.target as Node)) setDepartmentsOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [departmentsOpen])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) scrollTo(decodeURIComponent(hash.slice(1)))
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return (
    <header className="oxford-header">
      <div className="oxford-header-inner">
        <div className="oxford-brand-background" aria-hidden="true">
          <svg viewBox="0 0 126 89" preserveAspectRatio="none">
            <path d="M0 0 C40 0 62 18 78 45 C94 73 108 86 126 89 H0 Z" fill="white" />
          </svg>
        </div>
        <Link to="/" className="oxford-brand" onClick={() => setOpen(false)} aria-label="Oxford Institutions home">
          <img src={logoCrest} alt="Oxford Institutions crest" />
          <span className="oxford-brand-copy">
            <span className="oxford-brand-name">Oxford Institutions</span>
            <span className="oxford-brand-tagline">Est. 1998 | Excellence in Education</span>
          </span>
        </Link>
        <button
          type="button"
          className="oxford-menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="oxford-navigation"
          onClick={() => { setOpen(!open); setDepartmentsOpen(false) }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav id="oxford-navigation" aria-label="Main navigation" className={`oxford-navigation${open ? ' is-open' : ''}`}>
          {nav.map((item) => (
            item.label === 'About Us' ? <AboutNavigation key={item.label} onNavigate={() => setOpen(false)} /> : item.label === 'Departments' ? (
              <div className="oxford-department-dropdown" key={item.label} ref={departmentRef}
                onPointerEnter={(event) => { if (event.pointerType === 'mouse') setDepartmentsOpen(true) }}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setDepartmentsOpen(false)
                }}
                onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDepartmentsOpen(false) }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setDepartmentsOpen(false)
                    departmentButtonRef.current?.focus()
                  }
                }}>
                <div className={`oxford-nav-link oxford-department-control${pathname === '/departments' || pathname.endsWith('-department') ? ' is-active' : ''}`}>
                  <Link to="/departments" aria-current={pathname === '/departments' && !hash ? 'page' : undefined}
                    onClick={(event) => {
                      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
                      keepDepartmentsOpen.current = pathname !== '/departments' || Boolean(hash)
                      setDepartmentsOpen(true)
                    }}>
                    Departments
                  </Link>
                  <button type="button" ref={departmentButtonRef} className="oxford-department-arrow"
                    aria-label="Toggle departments dropdown" aria-expanded={departmentsOpen} aria-controls="oxford-department-links"
                    onClick={() => setDepartmentsOpen(!departmentsOpen)}>
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                </div>
                <ul id="oxford-department-links" className="oxford-department-links" hidden={!departmentsOpen}>
                  {[
                    ['All Departments', '/departments'],
                    ['BBA', '/bba-department'], ['BCA', '/bca-department'],
                    ['B.Com', '/bcom-department'], ['M.Com', '/mcom-department'],
                    ['MBA', '/mba-department'], ['MCA', '/mca-department'],
                  ].map(([label, to]) => <li key={to}><NavLink to={to} end
                    className={() => pathname + hash === to ? 'active' : ''}
                    onClick={() => { setDepartmentsOpen(false); setOpen(false); if (to.includes('#')) scrollTo(to.split('#')[1]) }}>
                    {label}
                  </NavLink></li>)}
                </ul>
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `oxford-nav-link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            )
          ))}
          <WelfareNavigation onNavigate={() => setOpen(false)} />
          <Link to="/apply-now" className="oxford-apply" onClick={() => setOpen(false)}>
            Apply Now <ChevronRight size={16} strokeWidth={1.7} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const stats = [
  ['98%', 'Placement Rate'],
  ['250+', 'Industry Partners'],
  ['40+', 'Programs Offered'],
]

function Hero() {
  return (
    <section className="home-hero border-b-[2px] border-[#407F55] bg-white">
      <div className={`${container} grid min-h-[570px] grid-cols-1 items-start gap-10 py-[65px] lg:grid-cols-[1fr_539px] lg:gap-[55px] lg:py-[75px]`}>
        <div className="pt-[8px]">
          <h1 className={`${serif} whitespace-nowrap text-[50px] font-medium leading-[1.01] tracking-[-1.1px] text-black xl:text-[54px]`}>
            Shaping Future Leaders
            <br />
            of{' '}
            <em className={`${display} font-normal italic text-[#407F55]`}>
              Tomorrow
            </em>
          </h1>

          <p className={`${sans} mt-[28px] max-w-[470px] text-[14px] leading-[26px] text-[#5B5B5B]`}>
            Where academic excellence meets limitless ambition. Oxford
            Institutions offers world-class education designed to unlock your
            full potential.
          </p>

          <div className="mt-[26px] flex flex-wrap gap-[14px]">
            <Link
              to="/admissions"
              className={`${buttonBase} bg-[#407F55] text-white hover:bg-[#356B48] ${focus}`}
            >
              Apply Now
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/departments"
              className={`${buttonBase} border border-[#407F55] text-[#407F55] hover:bg-[#407F55] hover:text-white ${focus}`}
            >
              Explore Programs
            </Link>
          </div>

          <dl className="mt-[30px] flex items-start gap-[43px]">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dd className={`${display} text-[34px] italic leading-none text-[#407F55]`}>
                  <CountUp value={value} />
                </dd>
                <dt className={`${sans} mt-[8px] whitespace-nowrap text-[11px] text-[#626262]`}>
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="w-full max-w-[539px] justify-self-end">
          <div className="mb-[34px] flex justify-end">
            <span
              className={`${sans} inline-flex h-[29px] items-center gap-[9px] rounded-full border border-[#407F55]/25 bg-[#407F55]/[0.08] px-[15px] text-[8px] font-medium uppercase tracking-[0.16em] text-[#407F55]`}
            >
              <span className="h-[5px] w-[5px] rounded-full bg-[#407F55]" />
              Ranked #1 in Student Outcomes
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[66px_0_66px_0]">
            <img
              src={heroCampus}
              alt="Oxford College campus"
              className="block aspect-[539/391] w-full object-cover"
            />

            <div className="absolute right-0 top-0 flex h-[70px] w-[70px] flex-col items-center justify-center rounded-bl-[8px] bg-[#407F55] text-white">
              <span className={`${display} text-[23px] italic leading-none`}>
                25
              </span>
              <span className={`${sans} mt-[4px] text-[7px] uppercase tracking-[0.1em]`}>
                Years
              </span>
            </div>

            <div className="absolute bottom-[32px] left-0 flex h-[59px] w-[141px] flex-col justify-center rounded-r-[15px] bg-white pl-[12px] shadow-[0_8px_25px_rgba(0,0,0,.16)]">
              <span className={`${sans} text-[11px] font-medium leading-none text-[#162033]`}>
                Admissions Open
              </span>
              <span className={`${sans} mt-[10px] text-[12px] text-[#8490A0]`}>
                2026–27 Batch
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Green study marquee                                                        */
/* -------------------------------------------------------------------------- */

const marquee = ['BBA', 'BCA', 'B.COM', 'PUC SCIENCE', 'PUC COMMERCE', 'M.COM', 'MBA', 'MCA']

function Marquee() {
  return (
    <div className="home-marquee overflow-hidden bg-[#407F55]" aria-label="Our departments">
      <div className="flex h-[47px] w-max animate-[marquee_34s_linear_infinite] motion-reduce:animate-none">
        {[0, 1, 2].map((copy) => (
          <div key={copy} aria-hidden={copy > 0} className="flex items-center">
            {marquee.map((item) => (
              <div
                key={`${copy}-${item}`}
                className={`${sans} flex items-center whitespace-nowrap text-[10px] font-medium tracking-[0.16em] text-white`}
              >
                {item}
                <span className="mx-[51px] h-[4px] w-[4px] rounded-full bg-white/65" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* About                                                                      */
/* -------------------------------------------------------------------------- */

function Legacy() {
  return (
    <section id="about-us" className="home-legacy bg-white">
      <div className={`${container} grid items-center gap-14 py-[78px] lg:grid-cols-[557px_1fr] lg:gap-[56px] lg:py-[78px]`}>
        <div className="relative">
          <img
            src={legacyCampus}
            alt="Oxford College campus with students"
            className="aspect-[557/491] w-full rounded-[5px_50px_5px_5px] object-cover shadow-[0_5px_20px_rgba(0,0,0,.12)]"
          />

          <div className="absolute -left-[1px] top-[73px] flex h-[79px] w-[148px] flex-col items-center justify-center rounded-r-[15px] bg-[#407F55] text-white shadow-[0_15px_35px_rgba(0,0,0,.16)] lg:-left-[62px]">
            <span className={`${display} text-[35px] italic leading-none`}>
              <CountUp value="25+" />
            </span>
            <span className={`${sans} mt-[3px] text-[9px]`}>
              Years of Excellence
            </span>
          </div>
        </div>

        <div className="max-w-[530px]">
          <Eyebrow>Who We Are</Eyebrow>

          <h2 className={`${serif} mt-[27px] text-[39px] font-medium leading-[1.02] text-[#080D13] sm:text-[43px]`}>
            A Legacy of{' '}
            <em className={`${display} font-normal italic`}>
              Academic
              <br />
              Excellence
            </em>
          </h2>

          <p className={`${sans} mt-[25px] text-[13px] leading-[26px] text-[#536783]`}>
            Founded in 1998, Oxford Institutions has been at the forefront of
            transformative education. We believe learning is not merely the
            transfer of knowledge — it is the cultivation of minds that dare to
            question, create, and lead.
          </p>

          <p className={`${sans} mt-[14px] text-[13px] leading-[26px] text-[#536783]`}>
            Our faculty comprises distinguished scholars, industry veterans,
            and Nobel laureates who bring unmatched depth to every classroom.
            Our campuses are laboratories of innovation and incubators of ideas.
          </p>

          <Link
            to="/campus"
            className={`${buttonBase} mt-[24px] bg-[#407F55] text-white hover:bg-[#356B48] ${focus}`}
          >
            Discover Our Story
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Programs                                                                   */
/* -------------------------------------------------------------------------- */

type Program = {
  title: string
  desc: string
  Icon: LucideIcon
  to: string
}

const programs: Program[] = [
  {
    title: 'BBA',
    desc: 'BBA is a three-year fulltime course that is designed to develop future professionals, rather than mere degree holders.',
    Icon: BriefcaseBusiness,
    to: '/bba-department',
  },
  {
    title: 'BCA',
    desc: 'Oxford College of BCA pursue the highest standards professionally, personally, and ethically. Empowered by a bold mindset.',
    Icon: Laptop,
    to: '/bca-department',
  },
  {
    title: 'B.COM',
    desc: 'Oxford College of Commerce is one of the premier institutes rendering education in the realm of Commerce studies since 2008.',
    Icon: Atom,
    to: '/bcom-department',
  },
  {
    title: 'PUC SCIENCE',
    desc: 'Oxford College of PUC Science empowers students to excel in engineering, medicine, pure sciences, and other professional fields.',
    Icon: BriefcaseBusiness,
    to: '/departments',
  },
  {
    title: 'PUC COMMERCE',
    desc: 'Oxford College of PUC Commerce course designed to build a strong foundation for careers in business, finance, and management.',
    Icon: Laptop,
    to: '/departments',
  },
  {
    title: 'M.COM',
    desc: 'Oxford College of M.COM program focused on advanced studies in commerce, finance, research, and management.',
    Icon: Atom,
    to: '/mcom-department',
  },
  {
    title: 'MBA',
    desc: 'An MBA is a postgraduate degree that builds leadership, management, and strategic decision-making skills.',
    Icon: BriefcaseBusiness,
    to: '/mba-department',
  },
  {
    title: 'MCA (AI & ML Specialisation)',
    desc: 'An MCA is a postgraduate degree focused on advanced computing, software development, and IT management.',
    Icon: Laptop,
    to: '/mca-department',
  },
]

function Programs() {
  return (
    <section className="home-programs bg-[#F8F8F0]">
      <div className={`${container} py-[61px]`}>
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow>Academic Programs</Eyebrow>
            <h2 className={`${serif} mt-[22px] text-[40px] font-medium leading-none text-[#0A1628] sm:text-[42px]`}>
              Explore Our Programs
            </h2>
          </div>

          <Link
            to="/departments"
            className={`${buttonBase} hidden bg-[#407F55] text-white sm:inline-flex`}
          >
            View All Programs
            <ChevronRight size={15} />
          </Link>
        </div>

        <div className="mt-[80px] grid gap-[46px_32px] sm:grid-cols-2 lg:grid-cols-3">
          {programs.map(({ title, desc, Icon, to }) => (
            <article
              key={title}
              className="flex min-h-[283px] flex-col rounded-[19px] border border-black/[0.04] border-t-[3px] border-t-[#407F55] bg-white px-[31px] pb-[23px] pt-[22px] shadow-[0_7px_21px_rgba(50,75,72,.10)]"
            >
              <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[15px] bg-[#F3E9CD] text-[#242424]">
                <Icon size={30} strokeWidth={1.25} />
              </div>

              <h3 className={`${serif} mt-[23px] text-[24px] font-medium leading-none text-[#142033]`}>
                {title}
              </h3>

              <p className={`${sans} mt-[22px] max-w-[310px] text-[12px] leading-[21px] text-[#536783]`}>
                {desc}
              </p>

              <Link
                to={to}
                className={`${sans} mt-auto inline-flex items-center gap-1 text-[11px] font-medium text-[#407F55] ${focus}`}
              >
                Explore Program
                <ArrowRight size={13} />
              </Link>
            </article>
          ))}
        </div>

        <Link
          to="/departments"
          className={`${buttonBase} mt-8 bg-[#407F55] text-white sm:hidden`}
        >
          View All Programs
          <ChevronRight size={15} />
        </Link>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Why Oxford                                                                 */
/* -------------------------------------------------------------------------- */

const why = [
  ['01', '98% Placement', 'Our dedicated career services team ensures every graduate is connected with top-tier opportunities before graduation.'],
  ['02', 'Elite Faculty', 'Learn from 400+ accomplished professors, 60% of whom hold doctoral degrees from global top-50 universities.'],
  ['03', 'World-Class Campus', '80-acre campus featuring smart labs, innovation hubs, libraries, sports complexes, and sustainable architecture.'],
  ['04', 'Global Network', 'Partnerships with 120+ international universities offering exchange programs, dual degrees, and research collaboration.'],
] as const

function WhyOxford() {
  return (
    <section className="home-why relative overflow-hidden">
      <img
        src={whyLibrary}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/48" />

      <div className={`${container} relative py-[53px]`}>
        <Eyebrow light>Why Oxford</Eyebrow>

        <h2 className={`${serif} mt-[24px] text-[40px] font-medium leading-none text-white`}>
          What Sets Us <em className={`${display} font-normal italic`}>Apart</em>
        </h2>

        <div className="mt-[48px] grid gap-[17px] sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([num, title, text]) => (
            <article
              key={num}
              className="min-h-[251px] rounded-[18px] border border-white/70 bg-[#407F55]/70 px-[27px] py-[20px]"
            >
              <div className={`${display} text-[43px] italic leading-none text-white`}>
                {num}
              </div>

              <h3 className={`${serif} mt-[31px] text-[19px] font-medium text-white`}>
                {title}
              </h3>

              <p className={`${sans} mt-[17px] text-[11px] leading-[21px] text-white`}>
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Campus life                                                                */
/* -------------------------------------------------------------------------- */

function CampusTile({
  src,
  alt,
  label,
  className,
}: {
  src: string
  alt: string
  label: string
  className: string
}) {
  return (
    <figure id={label === 'Cultural Amphitheatre' ? 'events' : undefined} className={`group relative overflow-hidden rounded-[16px] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
      />
      <figcaption
        className={`${sans} absolute bottom-[14px] left-[14px] rounded-[7px] bg-white/85 px-[12px] py-[7px] text-[10px] font-medium text-[#407F55]`}
      >
        {label}
      </figcaption>
    </figure>
  )
}

function CampusLife() {
  return (
    <section className="home-campus bg-white">
      <div className={`${container} py-[46px]`}>
        <Eyebrow>Campus Life</Eyebrow>

        <h2 className={`${serif} mt-[23px] text-[41px] font-medium leading-none text-[#0A1628]`}>
          Beyond the <em className={`${display} font-normal italic`}>Classroom</em>
        </h2>

        <div className="mt-[56px] grid grid-cols-2 gap-[14px] md:grid-cols-[1.9fr_1fr_1fr] md:grid-rows-[252px_252px]">
          <CampusTile
            src={campusLibrary}
            alt="Students studying around a table"
            label="Main Library & Research Center"
            className="col-span-2 h-[310px] md:col-span-1 md:row-span-2 md:h-auto"
          />
          <CampusTile
            src={campusLab}
            alt="Innovation laboratory"
            label="Innovation Labs"
            className="h-[150px] md:h-auto"
          />
          <CampusTile
            src={campusSports}
            alt="Sports complex"
            label="Sports Complex"
            className="h-[150px] md:h-auto"
          />
          <CampusTile
            src={campusCulture}
            alt="Cultural amphitheatre"
            label="Cultural Amphitheatre"
            className="h-[150px] md:h-auto"
          />
          <CampusTile
            src={campusCafeteria}
            alt="Students in cafeteria"
            label="Student Cafeteria"
            className="h-[150px] md:h-auto"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

const testimonials = [
  {
    quote:
      '“Oxford Institutions didn’t just give me a degree — it gave me a mindset. The faculty challenged me to think differently, and today I lead a team of 200 at Google.”',
    name: 'Arjun Patel',
    initials: 'AP',
    role: 'Senior Director, Google India · B.Tech 2015',
  },
  {
    quote:
      'The MBA program at Oxford Institutions transformed my career trajectory. The case-study method, global immersions, and network built here are truly priceless.',
    name: 'Sanya Reddy',
    initials: 'SR',
    role: 'Founder & CEO, FinStack · MBA 2018',
  },
  {
    quote:
      'From zero industry exposure to being placed at McKinsey — Oxford’s placement cell and the rigorous curriculum made it possible. I am forever grateful.',
    name: 'Kavya Menon',
    initials: 'KM',
    role: 'Associate Consultant, McKinsey · BBA 2021',
  },
]
// const testimonials = [
//   {
//     quote:
//       "Oxford College is a place where I can freely meet and talk with faculty and staff that help to create an excellent learning environment for me and my friends. They also create wonderful job opportunities for the learners in and off campus. The faculty focuses on extra-curricular activities without hindering the academics when I developed various skills such as leadership, fitness, management, and communication. Oxford is especially sweet because it provides positivity, greenery, and a friendly atmosphere on its campus that assisted me, my friends, and my faculty to be in tune with the education. Graduating from Oxford College will not just promote the students in securing better results in academics but also guarantees a better individual to the society.",
//     name: "Sanket S Dushi",
//     initials: "SD",
//     role: "Student",
//   },
//   {
//     quote:
//       "I am thankful to all the faculty members of the College for their continuous efforts and support. Apart from excellent academic experience, I also gained the benefits of being a part of events. I cherish every moment spent at Oxford College. My graduation at Oxford has been a very interesting and awesome journey.",
//     name: "Ms. Deepa Kaahappagouda",
//     initials: "DK",
//     role: "Student",
//   },
//   {
//     quote:
//       "My 5 years of experience in Oxford College Hubli has been tremendous and the best days of my life. The encouraging support shown by our beloved Chairman Shri Vasant BHoratti sir has laid a strong foundation in my student life. With the events and fests conducted by Oxford College, I brought out the hidden talents within me and became a successful student with good exposure to the outside world. I am grateful to the lectures, management, and friends who have shown true love and countless support to me. This college has provided the best facilities a student can ever get. I am honored and grateful to be a part of the Oxford family. These campus memories will always remain fresh in my mind forever.",
//     name: "Ron Regy",
//     initials: "RR",
//     role: "Student",
//   },
// ]

function MotionRail({ children, label, variant }: { children: ReactNode; label: string; variant: 'stories' | 'partners' }) {
  return (
    <div className={`motion-rail motion-rail-${variant}`}>
      <div className="motion-window" role="region" aria-label={label} tabIndex={0}>
        <div className="motion-track">
          <div className="motion-group">{children}</div>
          <div className="motion-group" aria-hidden="true">{children}</div>
        </div>
      </div>
    </div>
  )
}

const TESTIMONIAL_TOTAL = testimonials.length
const EXTENDED_TESTIMONIALS = [...testimonials, ...testimonials, ...testimonials]
const TESTIMONIAL_ROTATE_MS = 4000

function Testimonials() {
  const [position, setPosition] = useState(TESTIMONIAL_TOTAL)
  const [noTransition, setNoTransition] = useState(false)
  const [timerVersion, setTimerVersion] = useState(0)
  const [measurements, setMeasurements] = useState({ step: 0, viewportWidth: 0 })
  const viewportRef = useRef<HTMLDivElement>(null)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndex = ((position % TESTIMONIAL_TOTAL) + TESTIMONIAL_TOTAL) % TESTIMONIAL_TOTAL

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNoTransition(false)
      setPosition(current => current + 1)
    }, TESTIMONIAL_ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [timerVersion])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const measure = () => {
      const [first, second] = slotRefs.current
      if (!first || !second) return
      setMeasurements({
        step: second.offsetLeft - first.offsetLeft,
        viewportWidth: viewport.offsetWidth,
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  function resetLoop() {
    if (position >= TESTIMONIAL_TOTAL * 2 || position < TESTIMONIAL_TOTAL) {
      setNoTransition(true)
      setPosition(TESTIMONIAL_TOTAL + activeIndex)
    }
  }

  // Reduced motion does not emit transitionend; also recover interrupted transitions.
  useEffect(() => {
    if (position >= TESTIMONIAL_TOTAL && position < TESTIMONIAL_TOTAL * 2) return
    const timer = window.setTimeout(() => {
      setNoTransition(true)
      setPosition(TESTIMONIAL_TOTAL + activeIndex)
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 700)
    return () => window.clearTimeout(timer)
  }, [position, activeIndex])

  useEffect(() => {
    if (!noTransition) return
    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setNoTransition(false))
    })
    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [noTransition])

  function goTo(index: number) {
    let delta = index - activeIndex
    if (delta > TESTIMONIAL_TOTAL / 2) delta -= TESTIMONIAL_TOTAL
    if (delta < -TESTIMONIAL_TOTAL / 2) delta += TESTIMONIAL_TOTAL
    if (delta !== 0) {
      setNoTransition(false)
      setPosition(current => current + delta)
    }
    setTimerVersion(current => current + 1)
  }

  const { step, viewportWidth } = measurements
  const visibleCount = step ? Math.max(1, Math.round(viewportWidth / step)) : 1
  const centerOffset = (visibleCount - 1) / 2
  const translateX = step ? -((position - centerOffset) * step) : 0

  return (
    <section className="home-testimonials bg-[#F8F7F3]">
      <div className={`${container} py-[65px]`}>

        {/* Heading */}
        <div className="mb-[42px] text-left">
          <Eyebrow>Student Stories</Eyebrow>

          <h2
            className={`${serif} mt-[20px] text-[40px] font-medium leading-none text-[#0A1628]`}
          >
            Voices of Our{" "}
            <em className={`${display} font-normal italic text-[#407F55]`}>
              Alumni
            </em>
          </h2>
        </div>

        {/* Animated testimonials */}
        <div className="testimonial-slider" ref={viewportRef}>
          <div
            className={`testimonial-track${noTransition ? " no-transition" : ""}`}
            style={{ transform: `translateX(${translateX}px)` }}
            onTransitionEnd={event => {
              if (event.target === event.currentTarget && event.propertyName === 'transform') resetLoop()
            }}
          >

          {EXTENDED_TESTIMONIALS.map((item, key) => {
            const offset = key - position
            const isCenter = offset === 0

            return (
              <div
                className="testimonial-slot"
                key={key}
                ref={element => { slotRefs.current[key] = element }}
                aria-hidden={Math.abs(offset) > centerOffset || undefined}
              >
              <article
                className={`testimonial-card ${
                  isCenter
                    ? "testimonial-card-center"
                    : "testimonial-card-side"
                }`}
              >

                {/* Quote */}
                <div className="testimonial-quote-mark">
                  {isCenter ? "”" : "”"}
                </div>

                {/* Stars */}
                <div className="testimonial-stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      strokeWidth={1.5}
                      className="fill-[#D99A18] text-[#D99A18]"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className={`${sans} testimonial-text`}>
                  {item.quote}
                </p>

                {/* User */}
                <div className="testimonial-user">
                  <span
                    className={`testimonial-avatar ${
                      isCenter
                        ? "testimonial-avatar-green"
                        : offset < 0
                          ? "testimonial-avatar-gold"
                          : "testimonial-avatar-blue"
                    }`}
                  >
                    {item.initials}
                  </span>

                  <div>
                    <div className={`${sans} testimonial-name`}>
                      {item.name}
                    </div>

                    <div className={`${sans} testimonial-role`}>
                      {item.role}
                    </div>
                  </div>
                </div>
              </article>
              </div>
            )
          })}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="testimonial-dots" aria-label="Testimonial navigation">
          {testimonials.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`testimonial-dot ${
                activeIndex === index ? "testimonial-dot-active" : ""
              }`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Partners                                                                   */
/* -------------------------------------------------------------------------- */

const partners = [
  [partnerWipro, 'Wipro'],
  [partnerAirtel, 'Airtel'],
  [partnerAtm, 'ATM'],
  [partnerXentrix, 'Xentrix'],
  [partnerOmega, 'Omega'],
  [partnerItc, 'ITC Limited'],
  [partnerTata, 'Tata'],
] as const

function Partners() {
  return (
    <section id="placements" className="home-partners bg-white">
      <div className={`${container} py-[46px]`}>
        <div className="text-center">
          <Eyebrow>Our Partners</Eyebrow>

          <h2 className={`${serif} mt-[22px] text-[41px] leading-none text-black`}>
            Meet Our Partners
          </h2>

          <MotionRail label="Partner logos" variant="partners">
            {partners.map(([src, alt], index) => (
              <div
                key={alt}
                className="flex h-[75px] min-w-[90px] flex-1 items-center justify-center"
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className={`w-auto object-contain ${
                    index === 1
                      ? 'h-[31px]'
                      : index === 3
                        ? 'h-[53px]'
                        : index === 4
                          ? 'h-[48px]'
                          : 'h-[72px]'
                  }`}
                />
              </div>
            ))}
          </MotionRail>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
/* -------------------------------------------------------------------------- */

function CTA() {
  return (
    <section className="home-cta relative min-h-[430px] overflow-hidden">
      <img
        src={ctaLibrary}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative flex min-h-[430px] flex-col items-center justify-center px-5 text-center">
        <h2 className={`${serif} text-[42px] leading-none text-white sm:text-[48px]`}>
          Start Your{' '}
          <em className={`${display} font-normal italic text-[#407F55]`}>
            Journey
          </em>{' '}
          Today
        </h2>

        <p className={`${sans} mt-[26px] max-w-[650px] text-[13px] leading-[22px] text-white`}>
          Applications for the 2025–26 academic year are now open. Join over
          12,500 alumni who have built extraordinary careers with Oxford Institutions.
        </p>

        <div className="mt-[29px] flex flex-wrap justify-center gap-[14px]">
          <Link
            to="/admissions"
            className={`${buttonBase} bg-[#407F55] text-white ${focus}`}
          >
            Apply Now
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/admissions"
            className={`${buttonBase} border border-white bg-transparent text-white hover:bg-white hover:text-black ${focus}`}
          >
            Request Information
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

const footerPrograms = [
  ['BBA', '/bba-department'],
  ['BCA', '/bca-department'],
  ['B.Com', '/bcom-department'],
  ['M.Com', '/mcom-department'],
  ['MBA', '/mba-department'],
  ['MCA', '/mca-department'],
] as const

const footerInstitution = [
  ['About Us', '/about-us'],
  // ['Leadership', '/about-us#leadership'],
  ['Faculty', '/faculty'],
  ['Campus Life', '/campus'],
  ['Alumni Network', '/student-welfare/alumni'],
  ['Placements', '/placements'],
  ['Admissions', '/admissions'],
  ['Events', '/events'],
] as const
function Social({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={`Visit Oxford Institutions on ${label}`}
      className="text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <svg
        viewBox="0 0 24 24"
        width="25"
        height="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  )
}

export function Footer() {
  return (
    <footer className="oxford-footer bg-black text-white">
      <div className={`${container} py-[45px]`}>
        <div className="grid gap-[45px] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr] lg:gap-[75px]">
          <div className="text-left">
  <Link
    to="/"
    aria-label="Oxford Institutions home"
    className="block w-fit"
  >
    <img
      src={logoCrest}
      alt="Oxford Institutions"
      className="block h-[112px] w-auto object-contain md:translate-x-[40px]"
    />
  </Link>

  <p
    className={`${sans} mt-[23px] max-w-[255px] text-left text-[11px] leading-[21px]`}
  >
    Committed to academic excellence, holistic development, and
    shaping leaders who make a difference in the world.
  </p>
</div>

          <div>
            <h3 className={`${sans} text-[12px] font-semibold tracking-[0.17em]`}>
              PROGRAMS
            </h3>

            <ul className={`${sans} mt-[23px] space-y-[10px] text-[11px]`}>
              {footerPrograms.map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="transition-opacity hover:opacity-60"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`${sans} text-[12px] font-semibold tracking-[0.17em]`}>
              INSTITUTION
            </h3>

            <ul className={`${sans} mt-[23px] space-y-[10px] text-[11px]`}>
              {footerInstitution.map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="transition-opacity hover:opacity-60"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`${sans} text-[12px] font-semibold tracking-[0.17em]`}>
              CONTACT
            </h3>

            <ul className={`${sans} mt-[23px] space-y-[14px] text-[11px]`}>
              <li className="flex items-center gap-[13px]">
                <MapPin size={16} />
                <span>Kusugal Rd, Keshwapur, Hubli, Karnataka 580023</span>
              </li>
              <li className="flex items-center gap-[13px]">
                <Phone size={16} />
                <span className="flex flex-wrap gap-x-1">
                  {['+91-9845115557', '+91-9606919991', '+91-9606919992'].map((num, i, arr) => (
                    <a key={num} href={`tel:${num.replace(/-/g, '')}`} className="whitespace-nowrap">
                      {num}{i < arr.length - 1 ? ',' : ''}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-[13px]">
                <Mail size={16} />
                <a href="mailto:oxfordcollege.online@gmail.com">oxfordcollege.online@gmail.com</a>
              </li>
              <li className="flex items-center gap-[13px]">
                <Clock3 size={16} />
                <span>Mon–Sat: 9 AM – 6 PM</span>
              </li>
            </ul>

            <div className="mt-[25px] flex gap-[23px]">
              <Social label="Instagram" href="https://www.instagram.com/oxfordcollege.online/">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.4" cy="6.6" r=".6" fill="currentColor" />
              </Social>

              <Social label="Facebook" href="https://www.facebook.com/Oxford-College-events-117535441651943/?ref=ts">
                <path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.5 1.5-1.5H18V4.1c-.4-.1-1.3-.2-2.5-.2C13 3.9 11.5 5.4 11.5 8v2H9v3h2.5v8" />
              </Social>

              {/* <Social label="YouTube" href="https://www.youtube.com/channel/UCOB8BgsZ7Zcw5nqfFW-Cgow">
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
              </Social> */}

              <Social label="Twitter" href="https://twitter.com/OxfordOnline">
                <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.7 1A4.2 4.2 0 0 0 11.5 8c0 .3 0 .6.1.9-3.5-.2-6.5-1.8-8.6-4.3-.4.6-.6 1.3-.6 2.1 0 1.5.8 2.8 2.1 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.4 4.1-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 1.7 2.2 2.9 4.1 2.9A8.4 8.4 0 0 1 2 18.7 11.9 11.9 0 0 0 8.5 20c7.8 0 12.1-6.5 12.1-12.1v-.6c.8-.6 1.4-1.2 1.9-2z" />
              </Social>
            </div>
          </div>
        </div>

        <div className="mt-[42px] border-t border-white/35 pt-[19px] text-center">
          <p className={`${sans} text-[10px]`}>
            © 2025 Oxford Institutions. All Rights Reserved. Designed by <a href="https://spitel.com" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Spitel Pvt. Ltd.</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

const globalCss = `

  html { scroll-behavior: smooth; }
  body { margin: 0; }
  * { box-sizing: border-box; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-33.333333%); }
  }
`


export function PageStyles() {
  return <style>{globalCss}</style>
}
export default function HomeSections({ showHeader = true, showFooter = true }: { showHeader?: boolean; showFooter?: boolean }) {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const page = pageRef.current
    if (!page || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    const sections = page.querySelectorAll('main > section')
    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      sections.forEach((section) => section.classList.remove('section-revealed'))
    }
  }, [])

  return (
    <div ref={pageRef} className="home-design min-h-screen overflow-x-clip bg-white text-[#0A1628] antialiased">
      <PageStyles />
      {showHeader && <Header />}
      <main>
        <Hero />
        <Marquee />
        <Legacy />
        <Programs />
        <WhyOxford />
        <CampusLife />
        <Testimonials />
        <Partners />
        <CTA />
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
