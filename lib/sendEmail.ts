export interface ContactFormData {
  name: string
  phone: string
  route: string
  cargoType: string
  notes?: string
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const apiKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!apiKey) throw new Error('WEB3FORMS_ACCESS_KEY env var not set')

  const body = {
    access_key: apiKey,
    subject: `Νέο αίτημα προσφοράς — ${data.name}`,
    from_name: 'Αιγαιομεταφορική — Φόρμα Επικοινωνίας',
    name: data.name,
    phone: data.phone,
    route: data.route,
    cargoType: data.cargoType,
    ...(data.notes ? { notes: data.notes } : {}),
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })

  const json = await res.json()
  if (!json.success) throw new Error(json.message ?? 'Web3Forms error')
}
