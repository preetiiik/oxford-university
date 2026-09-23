import hero from './assets/departments/mba.jpg'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ImageIcon } from 'lucide-react'
import content from './mba-content.json'
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

function Placeholder({ label }: { label: string }) {
  return <div className="bca-photo-placeholder" role="img" aria-label={`${label}: image placeholder`}><ImageIcon size={32} aria-hidden="true" /><span>{label}</span><small>Image coming soon</small></div>
}

export default function MbaDepartment() {
  return <main className="bba-detail bca-detail mba-detail">
    <section className="bba-banner" aria-labelledby="mba-title"><img src={hero} alt="Oxford Mba department students" fetchPriority="high" /><h1 id="mba-title">MBA Department</h1></section>
    {content.map(({ title, body }, index) => {
      if (index === 0) return <section className="bba-course home-container mba-copy" key={title}><h2>About MBA Program</h2><Body text={body} /></section>
      if (title === 'Vision Statement') return <section className="bba-introduction home-container" key={title}><div className="bba-introduction-copy"><p className="bba-eyebrow">MBA Department</p><h2>{title}</h2><Body text={body} /></div><Placeholder label="MBA students and campus" /></section>
      const admission = title.startsWith('Admission Procedure')
      return <section className={index % 2 === 0 ? 'bca-band' : 'mba-section'} key={title}><div className="home-container mba-copy"><h2>{title.replace(/[:–—]\s*$/, '')}</h2>
        {admission && <p className="mba-date-note">The admission schedule below refers to 2024. Contact the Admissions Office for current dates.</p>}
        <Body text={body} />
        {title === 'Specialisation:' && <div className="mba-specialisations">{['Marketing', 'Finance', 'Human Resource'].map(label => <article className="bca-card" key={label}><h3>{label}</h3><Placeholder label={`${label} learning`} /></article>)}</div>}
        {title === 'Apply for Admission' && <Link className="mba-apply" to="/admissions">Apply Now <span aria-hidden="true">→</span></Link>}
      </div></section>
    })}
  </main>
}
