import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import './SubmissionPopup.css'

export default function SubmissionPopup({ open, success, message, onDismiss }: {
  open: boolean; success: boolean; message: string; onDismiss: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const messageId = useId()
  useEffect(() => {
    if (open) dialog.current?.showModal()
    else dialog.current?.close()
  }, [open])
  return createPortal(
    <dialog ref={dialog} className="submission-popup" aria-labelledby={titleId} aria-describedby={messageId}
      onCancel={onDismiss} onClose={onDismiss}>
      {success ? <CheckCircle2 className="submission-popup-icon" size={48} aria-hidden="true" /> : <CircleAlert className="submission-popup-icon is-error" size={48} aria-hidden="true" />}
      <h2 id={titleId}>{success ? 'Enquiry submitted!' : 'Unable to submit'}</h2>
      <p id={messageId}>{message}</p>
      <button type="button" autoFocus onClick={onDismiss}>{success ? 'Done' : 'Back to form'}</button>
    </dialog>, document.body,
  )
}
