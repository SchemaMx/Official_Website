import { useRef, useState, type FormEvent } from 'react'

const COPY = {
  es: {
    eyebrow: 'Conoce Omega',
    title: 'Platícanos de tu clínica.',
    body: 'Déjanos tus datos y te contactaremos para resolver tus dudas y coordinar una demo de la plataforma. Sin compromiso.',
    name: 'Nombre',
    email: 'Correo electrónico',
    clinic: 'Clínica o consultorio',
    phone: 'Teléfono (opcional)',
    message: '¿Qué te gustaría conocer? (opcional)',
    placeholder: 'Cuéntanos qué necesita tu clínica o qué te gustaría ver en la demo.',
    note: 'Usaremos estos datos para contactarte sobre Omega. No incluyas información de pacientes.',
    required: 'Los campos con * son obligatorios.',
    submit: 'Solicitar contacto',
    sending: 'Enviando…',
    successTitle: 'Solicitud enviada',
    successBody: 'Gracias por tu interés en Omega. Te contactaremos al correo que nos compartiste para coordinar los siguientes pasos.',
    error: 'No pudimos confirmar el envío. Tus datos siguen aquí: intenta de nuevo o escríbenos por correo.',
    emailAlternative: '¿Prefieres escribirnos directamente?',
  },
  en: {
    eyebrow: 'Meet Omega',
    title: 'Tell us about your clinic.',
    body: 'Leave your details and we’ll contact you to answer your questions and arrange a demo of the platform. No commitment required.',
    name: 'Name',
    email: 'Email address',
    clinic: 'Clinic or practice',
    phone: 'Phone (optional)',
    message: 'What would you like to learn about? (optional)',
    placeholder: 'Tell us what your clinic needs or what you’d like to see in the demo.',
    note: 'We’ll use these details to contact you about Omega. Please do not include patient information.',
    required: 'Fields marked * are required.',
    submit: 'Request contact',
    sending: 'Sending…',
    successTitle: 'Request sent',
    successBody: 'Thank you for your interest in Omega. We’ll contact you at the email you provided to arrange the next steps.',
    error: 'We couldn’t confirm your submission. Your details are still here: please try again or email us.',
    emailAlternative: 'Prefer to email us directly?',
  },
}

const inputClass = 'w-full rounded-xl border border-[#d0e8e4] bg-white px-4 py-3 text-sm text-[#0e1c1a] placeholder:text-[#5a7a76] focus:border-[#1ab89a] transition-colors'
const labelClass = 'block text-sm font-medium text-[#0e1c1a] mb-2'

export function OmegaContactForm({ lang, contactHref }: { lang: 'es' | 'en'; contactHref: string }) {
  const t = COPY[lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const submitting = useRef(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    if (data.get('_honey')) return

    for (const field of ['name', 'email', 'clinic', 'phone', 'message']) {
      data.set(field, String(data.get(field) ?? '').trim())
    }
    data.set('_replyto', String(data.get('email')))
    data.set('source', window.location.href)
    data.set('language', lang)

    submitting.current = true
    setStatus('sending')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    try {
      // Use the same email delivery service as Schema's main contact page.
      const response = await fetch('https://formsubmit.co/ajax/hola@schema.mx', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: controller.signal,
      })
      if (!response.ok) throw new Error('Submission failed')
      const result = await response.json()
      if (result.success !== true && result.success !== 'true') throw new Error('Submission rejected')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      submitting.current = false
    }
  }

  return (
    <section id="contacto" aria-labelledby="omega-contact-title" className="scroll-mt-24 border-y border-[#e8f0ef] bg-[#f8fefe]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <p className="text-xs font-semibold text-[#137c69] tracking-widest uppercase mb-4">{t.eyebrow}</p>
          <h2 id="omega-contact-title" className="text-2xl sm:text-3xl font-extrabold text-[#0e1c1a] mb-4">{t.title}</h2>
          <p className="text-[#5a7a76] leading-relaxed max-w-md">{t.body}</p>
          <p className="text-sm text-[#5a7a76] mt-6">
            {t.emailAlternative}{' '}
            <a href={contactHref} className="text-[#137c69] underline underline-offset-4">hola@schema.mx</a>
          </p>
        </div>
        <div>
          <div role="status" aria-live="polite" aria-atomic="true">
            {status === 'success' && (
              <div className="rounded-2xl border border-[#d0e8e4] bg-white p-8">
                <h3 className="font-bold text-lg text-[#137c69] mb-3">{t.successTitle}</h3>
                <p className="text-sm text-[#5a7a76] leading-relaxed">{t.successBody}</p>
              </div>
            )}
          </div>
          {status !== 'success' && (
            <form action="https://formsubmit.co/hola@schema.mx" method="POST" onSubmit={handleSubmit} aria-label={t.title} aria-busy={status === 'sending'}>
              <input type="text" name="_honey" aria-hidden="true" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="_subject" value="Omega — Nueva solicitud de demo" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="request" value="Demo de Omega / Omega demo request" />
              <fieldset disabled={status === 'sending'} className="min-w-0 space-y-5 disabled:opacity-70">
                <p className="text-xs text-[#5a7a76]">{t.required}</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="omega-contact-name" className={labelClass}>{t.name} *</label>
                    <input id="omega-contact-name" name="name" type="text" autoComplete="name" required pattern=".*\S.*" maxLength={120} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="omega-contact-email" className={labelClass}>{t.email} *</label>
                    <input id="omega-contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="omega-contact-clinic" className={labelClass}>{t.clinic} *</label>
                    <input id="omega-contact-clinic" name="clinic" type="text" autoComplete="organization" required pattern=".*\S.*" maxLength={160} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="omega-contact-phone" className={labelClass}>{t.phone}</label>
                    <input id="omega-contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="omega-contact-message" className={labelClass}>{t.message}</label>
                  <textarea id="omega-contact-message" name="message" rows={4} maxLength={3000} placeholder={t.placeholder} className={`${inputClass} resize-y`} />
                </div>
                <p className="text-xs text-[#5a7a76] leading-relaxed">{t.note}</p>
                {status === 'error' && <p role="alert" className="text-sm text-red-700">{t.error}</p>}
                <button type="submit" className="w-full sm:w-auto bg-[#137c69] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#0e6656] transition-colors disabled:cursor-wait">
                  {status === 'sending' ? t.sending : t.submit}
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
