import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './PageAnimations.css'

export default function PageAnimations() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elements = [...document.querySelectorAll<HTMLElement>('#root section, .campus-content > div, .campus-feature-layout > article')]
      .filter(element => !element.closest('.home-design') && !element.matches('.department-row, .apply-layout, .application'))
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('page-entered'); observer.unobserve(entry.target) }
      })
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
    elements.forEach(element => observer.observe(element))
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('page-entered')) }
  }, [pathname])
  return null
}
