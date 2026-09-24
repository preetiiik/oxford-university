import CountUp from './CountUp'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { assets } from './assets'

const eventGroups = [
  { category: 'Featured Event', title: 'Cine Arena', description: 'A short film contest that brings together creativity, storytelling and the confident voices of Oxford students.', images: [assets.bba.gallery[0], assets.bba.gallery[1]], tone: 'event-featured' },
  { category: 'Community & Wellness', title: 'Philanthropic Activities', description: 'Our students and faculty making a meaningful difference through awareness, health and community initiatives.', images: [assets.campusPage.images[0], assets.campusPage.images[1], assets.campusPage.images[2]], tone: 'event-community' },
  { category: 'Industry Exposure', title: 'Industrial Visit to Parle', description: 'Learning moves beyond the classroom through industry visits, conversations and hands-on exposure.', images: [assets.campusPage.images[3], assets.campusPage.images[4], assets.campusPage.images[5]], tone: 'event-industry' },
  { category: 'Achievements', title: 'Celebrating Student Success', description: 'From “Logo Lark” to “Wolf of Wall Street”, our students continue to represent Oxford with distinction.', images: [assets.campusPage.images[6], assets.campusPage.images[7], assets.campusPage.images[8], assets.campusPage.images[9]], tone: 'event-achievements' },
]

export function EventsPage() {
  return <main className="events-page">
    <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(5,12,10,.72),rgba(5,12,10,.5)),url(${assets.admissions.hero})`}}><div><h1>Events</h1><p>Moments that bring learning, community and achievement to life.</p></div></section>
    <section className="events-intro section-shell section-pad"><div><p className="eyebrow">Life at Oxford</p><h2>Every experience becomes part of the journey.</h2></div><p>From community initiatives and industry visits to cultural celebrations and student achievements, Oxford events create space to learn, connect and grow together.</p></section>
    <section className="events-overview section-shell"><div><strong><CountUp value="04" /></strong><span>Event stories</span></div><div><strong><CountUp value="06+" /></strong><span>Campus experiences</span></div><div><strong><CountUp value="01" /></strong><span>Community spirit</span></div><a href="#event-stories">View stories <ArrowRight size={16}/></a></section>
    <section className="events-redesign section-shell" id="event-stories">
      <article className="events-featured-card"><div className="featured-copy"><p className="eyebrow">{eventGroups[0].category}</p><span className="featured-label">01</span><h2>{eventGroups[0].title}</h2><p>{eventGroups[0].description}</p><div className="event-meta"><span><CalendarDays size={15}/> Oxford Institutions</span><span><MapPin size={15}/> Hubli Campus</span></div><a href="#event-stories">Explore moments <ArrowRight size={16}/></a></div><div className="featured-images">{eventGroups[0].images.map((image,imageIndex)=><figure key={image}><img src={image} alt={`${eventGroups[0].title} event ${imageIndex+1}`}/></figure>)}</div></article>
      <div className="event-card-grid">{eventGroups.slice(1).map((event,index)=><article className={`event-card ${event.tone}`} key={event.title}><div className="event-card-gallery">{event.images.slice(0,3).map((image,imageIndex)=><img key={`${event.title}-${imageIndex}`} src={image} alt={`${event.title} event ${imageIndex+1}`}/>)}</div><div className="event-card-copy"><span className="card-index">0{index+2}</span><p className="eyebrow">{event.category}</p><h3>{event.title}</h3><p>{event.description}</p><div className="event-meta"><span><MapPin size={14}/> Hubli Campus</span></div><a href="#event-stories">View gallery <ArrowRight size={15}/></a></div></article>)}</div>
    </section>
    <section className="events-cta section-shell section-pad"><div><p className="eyebrow">Create Your Moment</p><h2>There is always something happening at Oxford.</h2></div><p>Join a community where every event adds a new story to campus life.</p></section>
  </main>
}
