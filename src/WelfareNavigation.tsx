import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const links = [
  ['Alumni', '/student-welfare/alumni'],
  ['Administration Cell', '/student-welfare/administration-cells'],
  ['Co-Curricular Activity', '/student-welfare/cocurricular-activity'],
  ['Extra Curricular Activity', '/student-welfare/extra-curricular-activity'],
  ['Scholarships and Schemes', '/student-welfare/scholarships-and-schemes'],
  ['Student Administration Cells', '/student-welfare/student-administration-cells'],
  ['Sports', '/student-welfare/sports'],
]

export default function WelfareNavigation({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])
  return <div className="oxford-department-dropdown" ref={ref}
    onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true) }}
    onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setOpen(false) }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
    onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); button.current?.focus() } }}>
    <button ref={button} type="button" className={`oxford-nav-link oxford-department-toggle${pathname.startsWith('/student-welfare') ? ' is-active' : ''}`} aria-expanded={open} aria-controls="welfare-navigation" onClick={() => setOpen(!open)}>Student Welfare <ChevronDown size={14} aria-hidden="true" /></button>
    <ul id="welfare-navigation" className="oxford-department-links oxford-welfare-links" hidden={!open}>{links.map(([label, to]) => <li key={to}><NavLink to={to} onClick={() => { setOpen(false); onNavigate() }}>{label}</NavLink></li>)}</ul>
  </div>
}
