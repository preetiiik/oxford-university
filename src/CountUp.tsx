import { useEffect, useRef, useState } from 'react'

/** Count a displayed statistic once it enters the viewport. */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const element = ref.current
    const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setDisplay(value)
    if (!element || !match || motion.matches || !('IntersectionObserver' in window)) return

    const [, prefix, number, suffix] = match
    const target = Number(number.replace(/,/g, ''))
    const decimals = number.split('.')[1]?.length ?? 0
    const integer = number.split('.')[0]
    const format = (current: number) => {
      let formatted = current.toFixed(decimals)
      if (number.includes(',')) {
        formatted = current.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      } else if (integer.startsWith('0')) {
        formatted = formatted.padStart(number.length, '0')
      }
      return prefix + formatted + suffix
    }
    let frame = 0
    let startedAt: number | undefined
    setDisplay(format(0))
    const tick = (now: number) => {
      startedAt ??= now
      const progress = Math.min((now - startedAt) / 1500, 1)
      setDisplay(progress === 1 ? value : format(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect()
        frame = window.requestAnimationFrame(tick)
      }
    }, { threshold: 0.25 })
    observer.observe(element)
    const stopForReducedMotion = () => {
      if (!motion.matches) return
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      setDisplay(value)
    }
    motion.addEventListener('change', stopForReducedMotion)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      motion.removeEventListener('change', stopForReducedMotion)
    }
  }, [value])

  // Keep the final value accessible without announcing every animation frame.
  const inherited = { display: 'inline', margin: 0, padding: 0, font: 'inherit', color: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' as const }
  return <span ref={ref} aria-label={value} style={inherited}><span aria-hidden="true" style={inherited}>{display}</span></span>
}
