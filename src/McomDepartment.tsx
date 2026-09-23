import hero from './assets/departments/mcom.jpg'
import classroom from './assets/mcom/1.png'
import students from './assets/mcom/2.png'
import trophies from './assets/mcom/3.png'
import gathering from './assets/mcom/4.png'
import './BbaDepartment.css'
import './BcaDepartment.css'
import './McomDepartment.css'

const objectives = [
  'To create for the students of Oxford College, Hubballi an avenue for employment in the academics and also to benefit Industry by providing them with suitably trained persons in the field of Accounting & Finance.',
  'To prepare students to exploit ready created opportunities in the Commerce field.',
  'To give adequate exposure to the operational environment in the field of commerce.',
  'To inculcate training & practical approach by using modern technology amongst the students in the field of Commerce.',
]

export default function McomDepartment() {
  return (
    <main className="bba-detail bca-detail">
      <section className="bba-banner" aria-labelledby="mcom-title">
        <img src={hero} alt="M.Com students and faculty in a classroom" fetchPriority="high" />
        <h1 id="mcom-title">M.Com Department</h1>
      </section>

      <section className="bba-course home-container">
        <h2>M.Com Course Structure</h2>
        <p>The course shall be of four semesters and each semester is of Sixteen weeks duration. No student shall be permitted to obtain degree earlier than four semesters or to take more than eight semesters i.e., the student shall complete the course within four years from the date of admission to the first semester of Post Graduate Programme. The academic session in each semester will provide 90 teaching days.</p>
        <p>However, the students could discontinue the programme after one or more semesters due to extraordinary circumstances are allowed to continue and complete in the programming with due approval from the Registrar. Candidates shall not register for any other regular course other than Diploma and Certificate Courses during the duration of the PG Programme.</p>
      </section>

      <section className="bca-band" aria-labelledby="mcom-objectives">
        <div className="home-container">
          <h2 id="mcom-objectives">Key Objectives</h2>
          <ol className="mcom-objectives">
            {objectives.map((text, index) => <li className="bca-card" key={text}><span className="mcom-objective-number" aria-hidden="true">0{index + 1}</span><p>{text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="bba-introduction home-container" aria-labelledby="mcom-eligibility">
        <div className="bba-introduction-copy">
          <p className="bba-eyebrow">M.Com Admissions</p>
          <h2 id="mcom-eligibility">Eligibility</h2>
          <p>A candidate who has passed the B.Com degree examination from a recognized university.</p>
          <p className="mcom-eligibility-marks">A candidate who has secured not less than <strong>50% marks in aggregate in commerce subjects</strong> in all the examinations of the B.Com course.</p>
        </div>
        <img src={classroom} alt="Students and faculty in an M.Com classroom" loading="lazy" decoding="async" width={1448} height={1086} />
      </section>
      <section className="bca-section home-container" aria-labelledby="mcom-activities">
        <h2 id="mcom-activities">M.Com Student Activities</h2>
        <div className="bba-activity-gallery">
          {[[students, 'Students and faculty together at an outdoor event'], [trophies, 'Trophies displayed at the Kshatra sports event'], [gathering, 'Students assembled for an outdoor college activity']].map(([src, alt]) => <div key={src}><img src={src} alt={alt} loading="lazy" decoding="async" /></div>)}
        </div>
      </section>
    </main>
  )
}
