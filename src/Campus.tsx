/**
 * Oxford Institutions — Campus page (single file, Tailwind CSS)
 *
 * Reuses <Header />, <Footer /> and <PageStyles /> from ./Home.
 * Images: ./assets/campus/*.png  (see the imports below).
 *
 * Exports:
 *   default  CampusPage     – header + hero + sections + footer
 *   named    CampusSections – only the <main className="campus-page"> content
 */
import type { ReactNode } from 'react'
import './Campus.css'

import { Footer, Header, PageStyles } from './Home'

import heroImg from './assets/campus/hero.png'
import aboutLabImg from './assets/campus/about-lab.png'
import classroomImg from './assets/campus/classroom.png'
import courtyardImg from './assets/campus/courtyard.png'
import studentLaptopImg from './assets/campus/student-laptop.png'
import gallery1 from './assets/campus/gallery-1.png'
import gallery2 from './assets/campus/gallery-2.png'
import gallery3 from './assets/campus/gallery-3.png'
import gallery4 from './assets/campus/gallery-4.png'
import gallery5 from './assets/campus/gallery-5.png'
import gallery6 from './assets/campus/gallery-6.png'

/* -------------------------------------------------------------------------- */
/*  Shared class strings (same tokens as Home.tsx)                             */
/* -------------------------------------------------------------------------- */

const wrap = 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-[92px]'
const display = "font-['Cormorant_Garamond',Georgia,serif]"

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

const gallery = [
  { src: gallery1, alt: 'Students in pink shirts posing on stage with gifts' },
  { src: gallery2, alt: 'Faculty and students in a group photo outside a building' },
  { src: gallery3, alt: 'Students on an industry visit to a factory floor' },
  { src: gallery4, alt: 'Chief guest addressing the audience at a Zenith event' },
  { src: gallery5, alt: 'Guests seated beside a ceremonial lamp at the Accendo event' },
  { src: gallery6, alt: 'A group of smiling students posing together' },
]

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                     */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#407F55]">{children}</p>
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className={`${display} mb-4 text-[24px] font-normal leading-[1.15] text-black`}>{children}</h2>
}

function PhotoTile({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string
  alt: string
  caption: string
  className?: string
}) {
  return (
    <figure className={`relative overflow-hidden rounded-[20px] ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.4)_28%,rgba(0,0,0,0)_60%)]"
      />
      <figcaption
        className={`${display} absolute inset-x-5 bottom-5 max-w-[255px] text-[18px] leading-[1.2] text-white`}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${heroImg})` }}>
      <div><h1>Campus</h1><p>Explore the spaces where our students learn, connect and grow.</p></div>
    </section>
  )
}

function Feature() {
  return (
    <div className="campus-feature-layout grid gap-x-[23px] gap-y-[17px] md:grid-cols-2 xl:grid-cols-[minmax(0,618fr)_minmax(0,298fr)_minmax(0,298fr)] xl:grid-rows-[287px_287px]">
      {/* About us */}
      <article className="campus-about-card grid gap-6 rounded-[20px] bg-[#F8F8F0] p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,296px)] sm:items-center sm:gap-2 md:col-span-2 xl:col-span-1 xl:py-[22px] xl:pl-6 xl:pr-[21px]">
        <div>
          <Eyebrow>About Us</Eyebrow>
          <CardTitle>Oxford College shapes minds for a brighter tomorrow.</CardTitle>
          <p className="text-[12px] leading-[1.6] text-black">We educate, empower, and build future leaders.</p>
        </div>
        <img
          src={aboutLabImg}
          alt="Students working in a modern computer lab"
          loading="lazy"
          decoding="async"
          className="h-[220px] w-full rounded-[20px] object-cover sm:h-full sm:min-h-[220px] xl:h-[243px] xl:min-h-0"
        />
      </article>

      {/* Courtyard */}
      <PhotoTile
        src={courtyardImg}
        alt="Palm trees and a green lawn in the campus courtyard"
        caption="A place to work quietly on your own and your projects"
        className="campus-courtyard-tile h-[287px]"
      />

      {/* Tall student photo */}
      <PhotoTile
        src={studentLaptopImg}
        alt="A student studying on a laptop in class"
        caption="Empowering students through knowledge and innovation."
        className="campus-student-tile h-[360px] md:h-[287px] xl:row-span-2 xl:h-auto"
      />

      {/* Classrooms */}
      <article className="campus-classroom-card grid gap-6 rounded-[20px] bg-[#F8F8F0] p-5 md:col-span-2 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-center md:gap-8 xl:col-span-2 xl:grid-cols-[minmax(0,579px)_minmax(0,1fr)] xl:gap-[51px] xl:py-[22px] xl:pl-5 xl:pr-[54px]">
        <img
          src={classroomImg}
          alt="A teacher lecturing in a full classroom"
          loading="lazy"
          decoding="async"
          className="h-[220px] w-full rounded-[20px] object-cover md:h-full md:min-h-[220px] xl:h-[243px] xl:min-h-0"
        />
        <div>
          <Eyebrow>Classrooms</Eyebrow>
          <CardTitle>Modern Learning Spaces</CardTitle>
          <p className="text-[12px] leading-[1.6] text-black">
            Our classrooms are designed for comfortable and interactive learning, with modern tools and a focused
            environment to support student growth.
          </p>
        </div>
      </article>
    </div>
  )
}

function Gallery() {
  return (
    <ul className="grid gap-[22px] md:grid-cols-2">
      {gallery.map((g) => (
        <li key={g.src}>
          <img
            src={g.src}
            alt={g.alt}
            width={617}
            height={411}
            loading="lazy"
            decoding="async"
            className="aspect-[617/411] w-full object-cover"
          />
        </li>
      ))}
    </ul>
  )
}

export function CampusSections() {
  return (
    <main className="campus-page">
      <Hero />
      <div className={`campus-content ${wrap} pb-14 pt-10 lg:pb-[90px] lg:pt-[51px]`}>
        <Feature />

        <div className="mt-14 lg:mt-[80px]">
          <Gallery />
        </div>

        <div className="mx-auto mt-12 max-w-[1257px] space-y-[22px] text-center text-[14px] font-normal leading-[22.4px] tracking-[0.28px] text-black lg:mt-16">
          <p>
            Oxford Institutions Hubli, located in Hubballi, is a reputed educational group known for delivering quality
            higher education across multiple disciplines. The institution offers a wide range of undergraduate and
            postgraduate programs in fields such as engineering, management, commerce, and science. With modern
            infrastructure, well-equipped laboratories, and experienced faculty members, it focuses on providing both
            theoretical knowledge and practical exposure to students.
          </p>
          <p>
            Beyond academics, Oxford Institutions emphasizes holistic student development by encouraging participation
            in workshops, seminars, internships, and placement training programs. The institution aims to nurture
            innovation, critical thinking, and leadership skills, ensuring that students are well-prepared to meet
            industry demands and excel in their professional careers.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function CampusPage() {
  return (
    <div className="overflow-x-clip bg-white font-['Montserrat',Arial,sans-serif] text-[14px] text-[#0A1628] antialiased">
      <PageStyles />
      <Header />
      <CampusSections />
      <Footer />
    </div>
  )
}
