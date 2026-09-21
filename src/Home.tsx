/**
 * Oxford Institutions — Home page (single file, Tailwind CSS)
 *
 * Needs: react, react-router-dom, lucide-react, Tailwind CSS (v3.3+ or v4).
 * Images: put the `assets/home` folder next to this file (./assets/home/*).
 * Fonts (Cormorant Garamond, DM Serif Display, Montserrat, Playball) and the
 * marquee keyframes are injected by the <style> tag inside <HomePage />.
 *
 * Exports:
 *   default  HomePage      – header + all sections + footer
 *   named    HomeSections  – only the sections (use inside an existing layout
 *                            that already renders its own Header / Footer)
 *   named    Header, Footer
 */
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ArrowRight,
  Atom,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  ChevronRight,
  Clock3,
  Cpu,
  GraduationCap,
  Landmark,
  Laptop,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import logoCrest from './assets/home/logo-crest.png'
import heroCampus from './assets/home/hero-campus.jpg'
import legacyCampus from './assets/home/legacy-campus.jpg'
import whyLibrary from './assets/home/why-library.jpg'
import ctaLibrary from './assets/home/cta-library.jpg'
import campusLibrary from './assets/home/campus-library.jpg'
import campusLab from './assets/home/campus-lab.jpg'
import campusCulture from './assets/home/campus-culture.jpg'
import campusSports from './assets/home/campus-sports.jpg'
import campusCafeteria from './assets/home/campus-cafeteria.jpg'
import partnerWipro from './assets/home/partner-wipro.png'
import partnerAirtel from './assets/home/partner-airtel.png'
import partnerAtm from './assets/home/partner-atm.png'
import partnerXentrix from './assets/home/partner-xentrix.png'
import partnerOmega from './assets/home/partner-omega.png'
import partnerItc from './assets/home/partner-itc.png'
import partnerTata from './assets/home/partner-tata.png'

/* -------------------------------------------------------------------------- */
/*  Shared class strings                                                       */
/* -------------------------------------------------------------------------- */

// Figma frame is 1440px wide with 92px side margins → 1256px content width.
const wrap = 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-[92px]'

const serif = "font-['Cormorant_Garamond',Georgia,serif]"
const display = "font-['DM_Serif_Display',Georgia,serif]"

const h2 = `${serif} text-[36px] font-medium leading-[1.1] text-[#0A1628] sm:text-[44px] lg:text-[48px]`
const emDark = `${display} font-normal italic`

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#407F55]'
const btn = `inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[14px] font-medium transition-colors ${focusRing}`
const btnPrimary = `${btn} bg-[#407F55] text-white hover:bg-[#2F6443]`
const btnOutline = `${btn} border border-[#407F55] text-[#407F55] hover:bg-[#407F55] hover:text-white`
const btnLight = `${btn} h-10 bg-white px-5 text-[#407F55] hover:bg-[#F2F3E2]`
const btnGhostLight = `${btn} border border-white/70 text-white hover:bg-white hover:text-[#0A1628]`

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-3 text-[11px] font-medium uppercase tracking-[0.3em] ${
        light ? 'text-white' : 'text-[#407F55]'
      }`}
    >
      {children}
    </p>
  )
}

function scrollToId(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                     */
/* -------------------------------------------------------------------------- */

type NavEntry = { label: string; to: string } | { label: string; anchor: string }

const navEntries: NavEntry[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', anchor: 'about-us' },
  { label: 'Departments', to: '/departments' },
  { label: 'Campus', to: '/campus' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Events', anchor: 'events' },
  { label: 'Placements', anchor: 'placements' },
]

const navItem = `rounded-full px-3 py-2.5 text-[14px] text-white transition-colors hover:bg-white/15 ${focusRing} focus-visible:outline-white min-[1360px]:py-2`
const navItemActive = 'bg-white !text-[#407F55] hover:!bg-white min-[1360px]:px-5 min-[1360px]:py-2.5'

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="relative z-50 h-[89px] bg-[#407F55] min-[1360px]:bg-white">
      {/* Desktop: green bar with the S-curve cut-out around the logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[calc(50%_-_296px)] right-0 hidden min-[1360px]:flex"
      >
        <svg
          className="h-full w-[116px] shrink-0 text-[#407F55]"
          viewBox="0 0 116 89"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0 0C58 0 58 89 116 89V0Z" />
        </svg>
        <div className="flex-1 bg-[#407F55]" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between">
        <Link
          to="/"
          onClick={close}
          className={`flex h-full items-center gap-3.5 rounded-br-[44px] bg-white pl-5 pr-8 sm:pl-8 min-[1360px]:rounded-none min-[1360px]:bg-transparent min-[1360px]:pl-[92px] min-[1360px]:pr-0 ${focusRing}`}
        >
          <img src={logoCrest} alt="" width={62} height={72} className="h-[56px] w-auto min-[1360px]:h-[72px]" />
          <span className="flex flex-col">
            <span className="font-['Playball',cursive] text-[19px] leading-tight text-[#171717] min-[1360px]:text-[20px]">
              Oxford Institutions
            </span>
            <span className="hidden text-[9px] uppercase tracking-[0.18em] text-[#565656] sm:block">
              Est. 1998 · Excellence in Education
            </span>
          </span>
        </Link>

        <button
          type="button"
          className={`mr-5 rounded-md p-2 text-white sm:mr-8 min-[1360px]:hidden ${focusRing} focus-visible:outline-white`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav
          id="site-nav"
          aria-label="Main"
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 bg-[#407F55] px-5 pb-5 pt-2 shadow-xl min-[1360px]:static min-[1360px]:flex min-[1360px]:flex-row min-[1360px]:items-center min-[1360px]:gap-[22px] min-[1360px]:bg-transparent min-[1360px]:p-0 min-[1360px]:pr-[92px] min-[1360px]:shadow-none`}
        >
          {navEntries.map((entry) =>
            'to' in entry ? (
              <NavLink
                key={entry.label}
                to={entry.to}
                end={entry.to === '/'}
                onClick={close}
                className={({ isActive }) => `${navItem} ${isActive ? navItemActive : ''}`}
              >
                {entry.label}
              </NavLink>
            ) : (
              <button
                key={entry.label}
                type="button"
                className={`${navItem} text-left`}
                onClick={() => {
                  close()
                  scrollToId(entry.anchor)
                }}
              >
                {entry.label}
              </button>
            ),
          )}
          <Link to="/admissions" onClick={close} className={`${btnLight} mt-2 min-[1360px]:mt-0 min-[1360px]:ml-1`}>
            Apply Now <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hero + marquee                                                             */
/* -------------------------------------------------------------------------- */

const heroStats = [
  ['98%', 'Placement Rate'],
  ['250+', 'Industry Partners'],
  ['40+', 'Programs Offered'],
] as const

function Hero() {
  return (
    <section
      className={`${wrap} grid items-center gap-12 pb-14 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,599px)] lg:gap-[79px] lg:pb-[72px] lg:pt-16`}
    >
      <div>
        <h1
          className={`${serif} text-[44px] font-semibold leading-[1.11] tracking-[-0.76px] text-[#0A1628] sm:text-[56px] lg:text-[64px]`}
        >
          Shaping Future Leaders <br className="hidden sm:block" />
          of <em className={`${display} font-normal italic text-[#407F55]`}>Tomorrow</em>
        </h1>
        <p className="mt-6 max-w-[563px] text-[16px] leading-[1.86] text-[#3E3B3B]">
          Where academic excellence meets limitless ambition. Oxford Institutions offers world-class education
          designed to unlock your full potential.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link to="/admissions" className={btnPrimary}>
            Apply Now <ChevronRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/departments" className={btnOutline}>
            Explore Programs
          </Link>
        </div>

        <dl className="mt-1 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
          {heroStats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[12px] text-[#3E3B3B]">{label}</dt>
              <dd className={`${display} text-[38px] italic leading-none text-[#407F55] lg:text-[40px]`}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col">
        <span className="mb-6 inline-flex h-[33px] items-center gap-2 self-start rounded-full border-[0.8px] border-[#2F584E]/30 bg-[#407F55]/[0.12] px-5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#2F584E] lg:mb-10 lg:self-end">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#407F55]" />
          Ranked #1 in Student Outcomes
        </span>

        <div className="relative aspect-[599/434] w-full overflow-hidden rounded-[48px_5px_48px_5px] lg:rounded-[80px_5px_80px_5px]">
          <img
            src={heroCampus}
            alt="Oxford College campus building lit up at dusk"
            width={900}
            height={584}
            className="h-full w-full object-cover"
          />
          {/* “25 years” badge — circle is clipped by the image frame, as in the design */}
          <div className="absolute -right-[21px] -top-[25px] flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full bg-[#407F55] pt-1 text-white">
            <span className={`${display} text-[28px] italic leading-none`}>25</span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em]">Years</span>
          </div>
          {/* “Admissions Open” card */}
          <div className="absolute bottom-[37px] left-0 flex h-[66px] w-[158px] flex-col justify-center rounded-r-[14px] bg-white pl-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <span className="text-[12px] font-medium leading-tight text-[#0A1628]">Admissions Open</span>
            <span className="mt-0.5 text-[10px] text-[#6B7280]">2026-27 Batch</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const marqueeItems = ['Engineering', 'Management', 'Law', 'Medicine', 'Architecture', 'Data Science', 'Economics']

function Marquee() {
  // Two identical halves → translating by -50% loops seamlessly.
  const half = [...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden bg-[#407F55]" aria-label="Fields of study: Engineering, Management, Law, Medicine, Architecture, Data Science, Economics">
      <div className="flex h-[49px] w-max animate-[oxford-marquee_45s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden="true" className="flex shrink-0 items-center">
            {half.map((item, i) => (
              <li key={`${copy}-${i}`} className="flex items-center text-[12px] uppercase tracking-[0.12em] text-white">
                {item}
                <span className="mx-[46px] h-1 w-1 rounded-full bg-white/70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Legacy / About                                                             */
/* -------------------------------------------------------------------------- */

function Legacy() {
  return (
    <section id="about-us" className={`${wrap} py-14 lg:py-[88px]`}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,617px)_minmax(0,1fr)] lg:gap-[65px]">
        <div className="relative">
          <img
            src={legacyCampus}
            alt="Oxford College entrance with students walking"
            width={1075}
            height={849}
            loading="lazy"
            decoding="async"
            className="aspect-[617/545] w-full rounded-[5px_50px_5px_5px] object-cover shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          />
          <div className="absolute left-4 top-[81px] flex h-[87px] w-[164px] flex-col items-center justify-center rounded-2xl bg-[#407F55] text-white shadow-[0_20px_60px_rgba(10,22,40,0.3)] xl:-left-[69px]">
            <span className={`${display} text-[32px] italic leading-none`}>25+</span>
            <span className="mt-1 text-[11px]">Years of Excellence</span>
          </div>
        </div>

        <div>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className={`${h2} mb-6`}>
            A Legacy of <em className={emDark}>Academic Excellence</em>
          </h2>
          <p className="mb-4 max-w-[560px] text-[14px] leading-[1.85] text-[#3D4F6B]">
            Founded in 1998, Oxford Institutions has been at the forefront of transformative education. We believe
            learning is not merely the transfer of knowledge — it is the cultivation of minds that dare to question,
            create, and lead.
          </p>
          <p className="mb-8 max-w-[560px] text-[14px] leading-[1.85] text-[#3D4F6B]">
            Our faculty comprises distinguished scholars, industry veterans, and Nobel laureates who bring unmatched
            depth to every classroom. Our campuses are laboratories of innovation and incubators of ideas.
          </p>
          <Link to="/campus" className={btnPrimary}>
            Discover Our Story <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Programs                                                                   */
/* -------------------------------------------------------------------------- */

type Program = { title: string; desc: string; Icon: LucideIcon; to: string }

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
    to: '/departments',
  },
  {
    title: 'B.COM',
    desc: 'Oxford College of Commerce is one of the premier institutes rendering education in the realm of Commerce studies since 2008.',
    Icon: Landmark,
    to: '/departments',
  },
  {
    title: 'PUC SCIENCE',
    desc: 'Oxford College of PUC Science empowers students to excel in engineering, medicine, pure sciences, and other professional fields.',
    Icon: Atom,
    to: '/departments',
  },
  {
    title: 'PUC COMMERCE',
    desc: 'Oxford College of PUC Commerce course designed to build a strong foundation for careers in business, finance, and management.',
    Icon: BarChart3,
    to: '/departments',
  },
  {
    title: 'M.COM',
    desc: 'Oxford College of M.COM program focused on advanced studies in commerce, finance, research, and management.',
    Icon: Calculator,
    to: '/departments',
  },
  {
    title: 'MBA',
    desc: 'An MBA is a postgraduate degree that builds leadership, management, and strategic decision-making skills.',
    Icon: GraduationCap,
    to: '/departments',
  },
  {
    title: 'MCA (AI & ML Specialisation)',
    desc: 'An MCA is a postgraduate degree focused on advanced computing, software development, and IT management.',
    Icon: Cpu,
    to: '/departments',
  },
]

function Programs() {
  return (
    <section className="bg-[#F2F3E2]/50 py-14 lg:py-20">
      <div className={wrap}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
          <div>
            <Eyebrow>Academic Programs</Eyebrow>
            <h2 className={h2}>Explore Our Programs</h2>
          </div>
          <Link to="/departments" className={btnPrimary}>
            View All Programs <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {programs.map(({ title, desc, Icon, to }) => (
            <article
              key={title}
              className="flex min-h-[314px] flex-col rounded-[20px] border-[0.8px] border-[#0A1628]/10 border-t-[3px] border-t-[#407F55] bg-white px-9 pb-7 pt-7 shadow-[0_4px_20px_rgba(47,88,78,0.1)]"
            >
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#F5E9C8,#F0ECE0)] text-[#6B5A2B]">
                <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className={`${serif} mb-2 mt-6 text-[26px] font-semibold leading-tight text-[#0A1628]`}>{title}</h3>
              <p className="mb-5 text-[12.5px] leading-[1.7] text-[#3D4F6B]">{desc}</p>
              <Link
                to={to}
                className={`mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#407F55] hover:underline ${focusRing}`}
              >
                Explore Program <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Why Oxford                                                                 */
/* -------------------------------------------------------------------------- */

const whyCards = [
  ['01', '98% Placement', 'Our dedicated career services team ensures every graduate is connected with top-tier opportunities before graduation.'],
  ['02', 'Elite Faculty', 'Learn from 400+ accomplished professors, 60% of whom hold doctoral degrees from global top-50 universities.'],
  ['03', 'World-Class Campus', '80-acre campus featuring smart labs, innovation hubs, libraries, sports complexes, and sustainable architecture.'],
  ['04', 'Global Network', 'Partnerships with 120+ international universities offering exchange programs, dual degrees, and research collaboration.'],
] as const

function WhyOxford() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={whyLibrary}
        alt=""
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className={`${wrap} relative pb-16 pt-14 lg:pb-[70px] lg:pt-20`}>
        <Eyebrow light>Why Oxford</Eyebrow>
        <h2 className={`${serif} mb-10 text-[36px] font-medium leading-[1.1] text-white sm:text-[44px] lg:mb-[42px] lg:text-[48px]`}>
          What Sets Us <em className="italic font-semibold">Apart</em>
        </h2>

        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map(([num, title, copy]) => (
            <article
              key={num}
              className="flex min-h-[278px] flex-col rounded-[20px] border-[0.8px] border-white/30 bg-[#407F55]/70 p-7 backdrop-blur-[6px]"
            >
              <span className={`${display} text-[40px] italic leading-none text-white`}>{num}</span>
              <h3 className={`${serif} mb-3 mt-5 text-[20px] font-semibold leading-tight text-white`}>{title}</h3>
              <p className="text-[12.5px] leading-[1.7] text-white/85">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Campus life (bento grid)                                                   */
/* -------------------------------------------------------------------------- */

function Tile({
  src,
  alt,
  label,
  className = '',
  w,
  h,
}: {
  src: string
  alt: string
  label: string
  className?: string
  w: number
  h: number
}) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl ${className}`}>
      <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      <figcaption className="absolute bottom-4 left-4 rounded-lg border-[0.8px] border-white/10 bg-white/80 px-4 py-2 text-[13px] font-medium text-[#2F6443] backdrop-blur-[8px]">
        {label}
      </figcaption>
    </figure>
  )
}

function CampusLife() {
  return (
    <section id="events" className={`${wrap} py-14 lg:py-20`}>
      <Eyebrow>Campus Life</Eyebrow>
      <h2 className={`${h2} mb-10 lg:mb-12`}>
        Beyond the <em className={emDark}>Classroom</em>
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-[1.9fr_1fr_1fr] md:grid-rows-[repeat(2,279px)]">
        <Tile
          src={campusLibrary}
          alt="Students studying together around a table"
          label="Main Library & Research Center"
          w={1100}
          h={1100}
          className="col-span-2 h-[300px] md:col-span-1 md:row-span-2 md:h-auto"
        />
        <Tile src={campusLab} alt="Teacher demonstrating a chemistry experiment" label="Innovation Labs" w={1100} h={503} className="h-[200px] md:h-auto" />
        <Tile src={campusSports} alt="Cricket players celebrating with their team" label="Sports Complex" w={891} h={899} className="h-[200px] md:h-auto" />
        <Tile src={campusCulture} alt="Students performing a classical dance on stage" label="Cultural Amphitheatre" w={960} h={638} className="h-[200px] md:h-auto" />
        <Tile src={campusCafeteria} alt="Students having lunch in the cafeteria" label="Student Cafeteria" w={1000} h={750} className="h-[200px] md:h-auto" />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                               */
/* -------------------------------------------------------------------------- */

const testimonials = [
  {
    quote:
      '“Oxford Institutions didn\u2019t just give me a degree — it gave me a mindset. The faculty challenged me to think differently, and today I lead a team of 200 at Google.”',
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
      'From zero industry exposure to being placed at McKinsey — Oxford\u2019s placement cell and the rigorous curriculum made it possible. I am forever grateful.',
    name: 'Kavya Menon',
    initials: 'KM',
    role: 'Associate Consultant, McKinsey · BBA 2021',
  },
]

function Testimonials() {
  return (
    <section className="bg-[#F2F3E2]/50 py-14 lg:py-[72px]">
      <div className={wrap}>
        <Eyebrow>Student Stories</Eyebrow>
        <h2 className={`${h2} mb-10`}>
          Voices of Our <em className={emDark}>Alumni</em>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-[20px] border-[0.8px] border-[#0A1628]/10 bg-white p-7 shadow-[0_4px_20px_rgba(47,88,78,0.1)]"
            >
              <div className="mb-4 flex gap-1" role="img" aria-label="Rated 5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={20} className="fill-[#C9A84C] text-[#C9A84C]" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mb-6 text-[14px] leading-[1.75] text-[#3D4F6B]">{t.quote}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#407F55] text-[12px] font-semibold text-white"
                >
                  {t.initials}
                </span>
                <span className="flex flex-col">
                  <span className={`${serif} text-[17px] font-semibold leading-tight text-[#0A1628]`}>{t.name}</span>
                  <span className="text-[11px] text-[#8A8F98]">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Partners                                                                   */
/* -------------------------------------------------------------------------- */

const partners = [
  { src: partnerWipro, name: 'Wipro', w: 241, h: 240, cls: 'h-[84px]' },
  { src: partnerAirtel, name: 'Airtel', w: 352, h: 88, cls: 'h-[28px]' },
  { src: partnerAtm, name: 'ATM', w: 268, h: 240, cls: 'h-[80px]' },
  { src: partnerXentrix, name: 'Xentrix', w: 572, h: 200, cls: 'h-[66px]' },
  { src: partnerOmega, name: 'Omega', w: 286, h: 140, cls: 'h-[50px]' },
  { src: partnerItc, name: 'ITC Limited', w: 231, h: 240, cls: 'h-[86px]' },
  { src: partnerTata, name: 'Tata', w: 287, h: 240, cls: 'h-[64px]' },
]

function Partners() {
  return (
    <section id="placements" className={`${wrap} py-14 text-center lg:pb-16 lg:pt-14`}>
      <Eyebrow>Our Partners</Eyebrow>
      <h2 className={`${h2} mb-10 lg:mb-12`}>Meet Our Partners</h2>
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:justify-between">
        {partners.map((p) => (
          <li key={p.name} className="flex items-center">
            <img
              src={p.src}
              alt={p.name}
              width={p.w}
              height={p.h}
              loading="lazy"
              decoding="async"
              className={`${p.cls} w-auto max-w-none object-contain`}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  CTA                                                                        */
/* -------------------------------------------------------------------------- */

function CallToAction() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={ctaLibrary}
        alt=""
        width={1537}
        height={1023}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto flex max-w-[708px] flex-col items-center px-5 py-16 text-center sm:px-8 lg:py-[100px]">
        <h2 className={`${serif} mb-5 text-[38px] font-medium leading-[1.1] text-white sm:text-[46px] lg:text-[52px]`}>
          Start Your <em className="italic text-[#4C9A67]">Journey</em> Today
        </h2>
        <p className="mb-8 max-w-[640px] text-[14px] leading-[1.8] text-white">
          Applications for the 2025-26 academic year are now open. Join over 12,500 alumni who have built
          extraordinary careers with Oxford Institutions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/admissions" className={btnPrimary}>
            Apply Now <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/admissions" className={btnGhostLight}>
            Request Information
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      onClick={(e) => e.preventDefault()}
      className={`text-white transition-opacity hover:opacity-70 ${focusRing} focus-visible:outline-white`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  )
}

const footerLinkCls = `text-[12.5px] text-white transition-opacity hover:opacity-70 ${focusRing} focus-visible:outline-white`

const footerPrograms = ['Engineering', 'Business & MBA', 'Medical Sciences', 'Law', 'Data Science', 'Design']
const footerInstitution = ['About Us', 'Leadership', 'Research', 'Campus Life', 'Alumni Network', 'Careers']

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className={`${wrap} pb-8 pt-8`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[398px_231px_272px_minmax(0,1fr)]">
          <div className="flex w-full max-w-[263px] flex-col items-center text-center">
            <img src={logoCrest} alt="Oxford Institutions crest" width={105} height={122} className="h-[122px] w-[105px] object-contain" />
            <p className="mt-4 text-[12px] leading-[1.75]">
              Committed to academic excellence, holistic development, and shaping leaders who make a difference in the
              world since 1998.
            </p>
          </div>

          <nav aria-label="Programs">
            <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.15em]">Programs</h3>
            <ul className="space-y-3">
              {footerPrograms.map((label) => (
                <li key={label}>
                  <Link to={label === 'Business & MBA' ? '/bba-department' : '/departments'} className={footerLinkCls}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Institution">
            <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.15em]">Institution</h3>
            <ul className="space-y-3">
              {footerInstitution.map((label) => (
                <li key={label}>
                  <Link to={label === 'Campus Life' ? '/campus' : '/'} className={footerLinkCls}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.15em]">Contact</h3>
            <ul className="space-y-[19px] text-[12.5px]">
              <li className="flex items-center gap-3">
                <MapPin size={16} aria-hidden="true" /> Oxford Road, Bangalore 560001
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} aria-hidden="true" /> <a href="tel:+918045678900">+91 80 4567 8900</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} aria-hidden="true" /> <a href="mailto:admissions@oxford.edu.in">admissions@oxford.edu.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock3 size={16} aria-hidden="true" /> Mon-Sat: 9 AM – 6 PM
              </li>
            </ul>

            <div className="mt-9 flex items-center gap-8">
              <SocialIcon label="Instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </SocialIcon>
              <SocialIcon label="Facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </SocialIcon>
              <SocialIcon label="YouTube">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </SocialIcon>
              <SocialIcon label="Twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/40 pt-5 text-center text-[12px]">
          © 2025 Oxford Institutions. All rights reserved. Designed By Spitel
        </p>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function HomeSections() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Legacy />
      <Programs />
      <WhyOxford />
      <CampusLife />
      <Testimonials />
      <Partners />
      <CallToAction />
    </main>
  )
}

const pageCss = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@400;500;600&family=Playball&display=swap');
@keyframes oxford-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
`

/**
 * Standalone style injection for pages that reuse <Header /> / <Footer />
 * (e.g. Departments.tsx) without going through <HomePage />.
 */
export function PageStyles() {
  return <style>{pageCss}</style>
}

export default function HomePage() {
  return (
    <div className="overflow-x-clip bg-white font-['Montserrat',Arial,sans-serif] text-[14px] text-[#0A1628] antialiased">
      <style>{pageCss}</style>
      <Header />
      <HomeSections />
      <Footer />
    </div>
  )
}
