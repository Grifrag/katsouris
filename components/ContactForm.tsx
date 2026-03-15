'use client'

import { useActionState } from 'react'
import { submitContactForm, ContactState } from '@/app/actions/contact'
import { CARGO_TYPES } from '@/lib/constants'

const initialState: ContactState = { status: 'idle' }

const inputClass =
  'w-full px-3.5 py-3 rounded-lg border-[1.5px] border-slate-200 bg-slate-50 text-navy-900 text-sm focus:outline-none focus:border-gold-400 transition-colors'

export default function ContactForm() {
  const [state, action, isPending] = useActionState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <span className="text-5xl">✅</span>
        <p className="text-navy-900 font-extrabold text-xl">Το αίτημά σας στάλθηκε!</p>
        <p className="text-slate-500 text-sm leading-relaxed">
          Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-3.5">
      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Ονοματεπώνυμο <span className="text-red-500">*</span>
        </label>
        <input name="name" type="text" placeholder="Γιώργος Παπαδόπουλος" required className={inputClass} />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Τηλέφωνο <span className="text-red-500">*</span>
        </label>
        <input name="phone" type="tel" placeholder="69X XXX XXXX" required className={inputClass} />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Προέλευση → Προορισμός <span className="text-red-500">*</span>
        </label>
        <input name="route" type="text" placeholder="π.χ. Αθήνα → Θεσσαλονίκη" required className={inputClass} />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Είδος φορτίου <span className="text-red-500">*</span>
        </label>
        <select name="cargoType" required className={inputClass}>
          <option value="">Επιλέξτε...</option>
          {CARGO_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Σημειώσεις
        </label>
        <textarea name="notes" placeholder="Βάρος, διαστάσεις, ιδιαίτερες απαιτήσεις..." rows={3} className={`${inputClass} resize-none`} />
      </div>

      {state.status === 'error' && (
        <p className="text-red-600 text-xs font-semibold bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ❌ {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-navy-900 text-gold-400 py-3.5 rounded-lg font-extrabold text-sm tracking-wide mt-1 disabled:opacity-60 hover:bg-navy-800 transition-colors"
      >
        {isPending ? 'Αποστολή...' : 'Αποστολή Αιτήματος →'}
      </button>
      <p className="text-center text-[11px] text-slate-400">
        🔒 Τα στοιχεία σας παραμένουν εμπιστευτικά
      </p>
    </form>
  )
}
