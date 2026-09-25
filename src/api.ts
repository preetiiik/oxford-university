// Empty locally: Vite serves the API on the same origin.
export const API_URL = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, '')

export function submitEnquiry(data: FormData) {
  const file = data.get('document')
  const hasDocument = file instanceof File && file.size > 0
  return fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    ...(hasDocument
      ? { body: data }
      : {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries([...data.entries()].filter(([, value]) => typeof value === 'string'))),
        }),
    signal: AbortSignal.timeout(30000),
  })
}
