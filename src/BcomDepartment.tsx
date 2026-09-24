import photo1 from './assets/bcom/bcom-img1.webp'
import photo2 from './assets/bcom/bcom-img2.webp'
import photo3 from './assets/bcom/bcom-img3.webp'
import photo4 from './assets/bcom/bcom-img4.webp'
import hero from './assets/departments/img6.webp'
import { Fragment } from 'react'
import { ArrowUpRight } from 'lucide-react'
import content from './bcom-content.json'
import './BbaDepartment.css'
import './BcaDepartment.css'
import './BcomDepartment.css'

// Render the supplied document as text, with only its bold and email formatting.
function Inline({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(mailto:[^)]+\))/g).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    const email = part.match(/^\[([^\]]+)\]\((mailto:[^)]+)\)$/)
    if (email) return <a key={index} href={email[2]}>{email[1]}</a>
    return <Fragment key={index}>{part}</Fragment>
  })}</>
}

function DocumentBody({ body }: { body: string }) {
  let stage = 0
  return <>{body.split(/\n\s*\n/).filter(block => block.trim() && block.trim() !== '---').map((block, index) => {
    const text = block.trim()
    if (text.startsWith('### ')) {
      let heading = text.slice(4)
      if (heading.startsWith('Stage ')) heading = `Stage ${['I', 'II', 'III', 'IV', 'V'][stage++]}`
      return <h3 key={index}>{heading}</h3>
    }
    if (/^[*✓] /.test(text)) return <ul key={index}>{text.split('\n').filter(Boolean).map((line, item) => <li key={item}><Inline text={line.replace(/^[*✓]\s*/, '')} /></li>)}</ul>
    return <p key={index}><Inline text={text.replace(/^1\. Com graduates/, 'B.Com graduates')} /></p>
  })}</>
}

function CommerceStages({ body }: { body: string }) {
  const stages = body.split(/^### Stage[^\n]*$/m).slice(1)
  return (
    <ol className="bcom-stages">
      {stages.map((description, index) => (
        <li className="bcom-stage" key={index}>
          <ArrowUpRight className="bcom-stage-icon" size={24} aria-hidden="true" />
          <div>
            <h3>Stage {['I', 'II', 'III', 'IV', 'V'][index]}</h3>
            <div className="bcom-stage-description"><DocumentBody body={description} /></div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function BcomDepartment() {
  return <main className="bba-detail bca-detail bcom-detail">
    <section className="bba-banner" aria-labelledby="bcom-title"><img src={hero} alt="Oxford Bcom department students" fetchPriority="high" /><h1 id="bcom-title">B.Com Department</h1></section>
    {content.map(({ title, body }, index) => {
      if (index === 0) return <section className="bba-course home-container bcom-copy" key={title}><h2>{title}</h2><DocumentBody body={body} /></section>
      if (title.startsWith('Unlock')) return <section className="bba-introduction home-container" key={title}><div className="bba-introduction-copy"><p className="bba-eyebrow">B.Com Department</p><h2>Unlock Your Future in <em>Commerce &amp; Business</em></h2><DocumentBody body={body} /></div><img className="bcom-intro-photo" src={photo1} alt="Commerce students gathered outside a campus building" loading="lazy" decoding="async" /></section>
      if (title.startsWith('How Oxford')) return <section className="bba-ocba home-container" key={title}><h2>{title}</h2><div className="bba-activity-gallery bcom-photo-gallery">{[[photo2, 'Students and faculty receiving the Yugas championship trophy'], [photo3, 'Guests lighting a ceremonial lamp at a college event'], [photo4, 'College cultural event and award presentation collage']].map(([src, alt]) => <div key={src}><img src={src} alt={alt} loading="lazy" decoding="async" /></div>)}</div><CommerceStages body={body} /></section>
      if (title === 'Our Academic Achievements' || title === 'Result Analysis') return null
      return <section className={index % 2 ? 'bca-band' : 'bcom-section'} key={title}><div className="home-container bcom-copy">
        <h2>{title}</h2>
        <div className={title === 'Contact Details' ? 'bcom-contact' : ''}><DocumentBody body={body} /></div>
      </div></section>
    })}
  </main>
}