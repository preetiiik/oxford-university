import { useRef, useState, type FormEvent } from 'react'

export function useContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const busy = useRef(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    const file = data.get('document')
    if (file instanceof File && file.size > 5 * 1024 * 1024) {
      setStatus('error'); setFeedback('Please choose a document smaller than 5 MB.'); setPopupOpen(true); return
    }
    busy.current = true
    setStatus('sending'); setFeedback(''); setPopupOpen(false)
    try {
      const response = await fetch('/api/contact', { method: 'POST', body: data, signal: AbortSignal.timeout(30000) })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.id) throw new Error(result?.error || 'Unable to submit your enquiry. Please try again.')
      setStatus('success'); setFeedback('Thank you. Your enquiry has been received.'); form.reset()
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof TypeError || (error instanceof Error && error.name === 'TimeoutError') ? 'Cannot reach the server. Please try again shortly.' : error instanceof Error ? error.message : 'Unable to submit your enquiry.')
    } finally { busy.current = false; setPopupOpen(true) }
  }
  return { submit, status, feedback, popupOpen, dismissPopup: () => setPopupOpen(false) }
}
