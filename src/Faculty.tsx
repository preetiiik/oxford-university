import { ArrowRight, BookOpen, BriefcaseBusiness, UsersRound } from 'lucide-react'

type StaffMember = { name: string; designation: string }

const nonTeaching: StaffMember[] = [
  { name: 'Mr. D.M. Betageri', designation: 'Office Superintendent' },
  { name: 'Mr. Raghavendra Hegde', designation: 'Office Admin' },
  { name: 'Mrs. Sowmya M', designation: 'Office Admin' },
  { name: 'Mr. Gururaj P N', designation: 'Librarian' },
  { name: 'Mrs. Sofiya B', designation: 'Accountant' },
  { name: 'Ms. Gangashree P B', designation: 'Jr. Accountant' },
]

const supportingStaff: StaffMember[] = [
  { name: 'Mr Anand S Dharekar', designation: 'Supervisor' },
  { name: 'Mr. Rajshekhar', designation: 'Security' },
  { name: 'Mr. Munna Hazrathali', designation: 'Driver' },
  { name: 'Mr. Allahbaksh Nadaf', designation: 'Driver' },
  { name: 'Mrs Savithri', designation: 'Menial Staff' },
  { name: 'Mrs. Kavitha', designation: 'Menial Staff' },
  { name: 'Mrs. Shanthala', designation: 'Menial Staff' },
  { name: 'Mr. Devappa', designation: 'Menial Staff' },
]

function StaffTable({ members }: { members: StaffMember[] }) {
  return <div className="faculty-table-wrap"><table className="faculty-table"><thead><tr><th>SL. No</th><th>Name</th><th>Designation</th></tr></thead><tbody>{members.map((member, index) => <tr key={member.name}><td>{String(index + 1).padStart(2, '0')}</td><td>{member.name}</td><td>{member.designation}</td></tr>)}</tbody></table></div>
}

export function FacultyPage() {
  return <main className="faculty-page">
    <section className="faculty-hero"><div className="faculty-hero-content"><p className="eyebrow">People who make the difference</p><h1>Our <em>Faculty</em></h1><p>Meet the dedicated educators and support teams who guide every Oxford student towards academic and professional success.</p></div><div className="faculty-hero-orbit" aria-hidden="true"><span>EXCELLENCE</span><span>MENTORSHIP</span><span>IMPACT</span></div></section>

    <section className="faculty-intro section-shell section-pad"><div><p className="eyebrow">A community of mentors</p><h2>Learning is stronger when people learn <em>together.</em></h2></div><p>Our faculty combines subject expertise, practical experience and a personal approach to help students discover their strengths. Explore each team below.</p></section>

    <section className="faculty-categories section-shell"><a href="#/faculty#teaching-faculty"><BookOpen/><span><strong>Teaching Faculty</strong><small>Academic guidance and subject expertise</small></span><ArrowRight/></a><a href="#/faculty#non-teaching-faculty"><BriefcaseBusiness/><span><strong>Non Teaching Faculty</strong><small>Administration and academic support</small></span><ArrowRight/></a><a href="#/faculty#supporting-staff"><UsersRound/><span><strong>Supporting Staff</strong><small>People who keep campus moving</small></span><ArrowRight/></a></section>

    <section id="teaching-faculty" className="faculty-feature section-shell section-pad"><div className="faculty-feature-copy"><p className="eyebrow">Teaching Faculty</p><h2>Guidance that goes <em>beyond the classroom.</em></h2><p>Our teachers bring clarity to complex ideas, encourage curiosity and connect academic learning with the world beyond campus.</p><div className="faculty-stat-row"><div><strong>01</strong><span>Personal mentorship</span></div><div><strong>02</strong><span>Practical learning</span></div><div><strong>03</strong><span>Student-first approach</span></div></div></div><div className="faculty-quote"><span>“</span><p>Education is not just about completing a course; it is about becoming ready for what comes next.</p><small>— Oxford Institutions</small></div></section>

    <section id="non-teaching-faculty" className="faculty-directory section-pad"><div className="section-shell"><div className="faculty-section-heading"><div><p className="eyebrow">Administration</p><h2>Non Teaching <em>Faculty</em></h2></div><p>Our administrative team supports smooth academic operations and a welcoming student experience.</p></div><StaffTable members={nonTeaching}/></div></section>

    <section id="supporting-staff" className="faculty-directory faculty-directory-alt section-pad"><div className="section-shell"><div className="faculty-section-heading"><div><p className="eyebrow">Campus support</p><h2>Supporting <em>Staff</em></h2></div><p>Behind every successful campus is a dependable team working with care, commitment and pride.</p></div><StaffTable members={supportingStaff}/></div></section>
  </main>
}

export default FacultyPage
