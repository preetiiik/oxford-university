import hero from './assets/departments/mba.jpg'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, LineChart, Users } from 'lucide-react'
import content from './mba-content.json'

const SPECIALISATIONS = [
  { label: 'Marketing', icon: Megaphone, blurb: 'Brand strategy, consumer behaviour and digital marketing.' },
  { label: 'Finance', icon: LineChart, blurb: 'Corporate finance, investment analysis and risk management.' },
  { label: 'Human Resource', icon: Users, blurb: 'Talent management, organisational behaviour and HR strategy.' },
]
import './BbaDepartment.css'
import './BcaDepartment.css'
import './MbaDepartment.css'

function Inline({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\((?:mailto:|https?:\/\/)[^)]+\))/g).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    const link = part.match(/^\[([^\]]+)\]\(((?:mailto:|https?:\/\/)[^)]+)\)$/)
    return link ? <a key={index} href={link[2]}>{link[1]}</a> : <Fragment key={index}>{part}</Fragment>
  })}</>
}

function Body({ text }: { text: string }) {
  return <>{text.split(/\n\s*\n/).filter(block => block.trim() && block.trim() !== '---').map((block, index) => {
    const value = block.trim()
    if (value.startsWith('## ')) return <h3 key={index}>{value.slice(3)}</h3>
    if (value.startsWith('* ')) return <ul key={index}>{value.split('\n').map((line, item) => <li key={item}><Inline text={line.replace(/^\* /, '')} /></li>)}</ul>
    return <p key={index}><Inline text={value} /></p>
  })}</>
}

export default function MbaDepartment() {
  return <main className="bba-detail bca-detail mba-detail">
    <section className="bba-banner" aria-labelledby="mba-title"><img src={hero} alt="Oxford Mba department students" fetchPriority="high" /><h1 id="mba-title">MBA Department</h1></section>
    {content.map(({ title, body }, index) => {
      if (index === 0) return <section className="bba-course home-container mba-copy" key={title}><h2>About MBA Program</h2><Body text={body} /></section>
      if (title === 'Vision Statement') return <section className="mba-vision home-container" key={title}><div className="mba-vision-card"><span className="mba-vision-mark" aria-hidden="true">"</span><div><p className="bba-eyebrow">MBA Department</p><h2>{title}</h2><Body text={body} /></div></div></section>
      const admission = title.startsWith('Admission Procedure')
      return <section className={index % 2 === 0 ? 'bca-band' : 'mba-section'} key={title}><div className="home-container mba-copy"><h2>{title.replace(/[:–—]\s*$/, '')}</h2>
        {admission && <p className="mba-date-note">The admission schedule below refers to 2024. Contact the Admissions Office for current dates.</p>}
        <Body text={body} />
        {title === 'Specialisation:' && <div className="mba-specialisations">{SPECIALISATIONS.map(({ label, icon: Icon, blurb }) => <article className="mba-spec-card" key={label}><span className="mba-spec-icon"><Icon size={22} aria-hidden="true" /></span><h3>{label}</h3><p>{blurb}</p></article>)}</div>}
        {title === 'Apply for Admission' && <Link className="mba-apply" to="/admissions">Apply Now <span aria-hidden="true">→</span></Link>}
      </div></section>
    })}
  </main>
}