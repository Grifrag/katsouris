'use server'

import { sendContactEmail } from '@/lib/sendEmail'
import { CARGO_TYPES } from '@/lib/constants'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const phone = formData.get('phone')?.toString().trim() ?? ''
  const route = formData.get('route')?.toString().trim() ?? ''
  const cargoType = formData.get('cargoType')?.toString().trim() ?? ''
  const notes = formData.get('notes')?.toString().trim()

  if (!name || !phone || !route || !cargoType) {
    return { status: 'error', message: 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.' }
  }
  if (phone.replace(/\D/g, '').length < 10) {
    return { status: 'error', message: 'Παρακαλώ εισάγετε έγκυρο τηλέφωνο.' }
  }
  if (!CARGO_TYPES.includes(cargoType)) {
    return { status: 'error', message: 'Μη έγκυρο είδος φορτίου.' }
  }

  try {
    await sendContactEmail({ name, phone, route, cargoType, notes })
    return { status: 'success' }
  } catch (err) {
    console.error('Email send error:', err)
    return { status: 'error', message: 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά ή καλέστε μας.' }
  }
}
