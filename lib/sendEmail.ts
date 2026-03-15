import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  phone: string
  route: string
  cargoType: string
  notes?: string
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const recipient = process.env.CONTACT_EMAIL
  if (!recipient) throw new Error('CONTACT_EMAIL env var not set')

  await resend.emails.send({
    from: 'onboarding@resend.dev', // TODO(pre-deploy): Replace with verified domain sender
    to: recipient,
    subject: `Νέο αίτημα προσφοράς — ${data.name}`,
    html: `
      <h2>Νέο αίτημα προσφοράς</h2>
      <table cellpadding="8" style="border-collapse:collapse;">
        <tr><td><strong>Όνομα:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Τηλέφωνο:</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Διαδρομή:</strong></td><td>${data.route}</td></tr>
        <tr><td><strong>Είδος φορτίου:</strong></td><td>${data.cargoType}</td></tr>
        ${data.notes ? `<tr><td><strong>Σημειώσεις:</strong></td><td>${data.notes}</td></tr>` : ''}
      </table>
    `,
  })
}
