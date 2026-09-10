import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { CalendlyButton } from '@/components/CalendlyButton'

const CONTACT_EMAIL = 'hola@schema.mx'
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const SOCIALS = [
  {
    key: 'whatsapp' as const,
    href: 'https://wa.me/8120384836',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.47 14.38c-.29-.15-1.71-.84-1.97-.94-.26-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.14-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.51-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.26.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.19 3.01.15.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
        <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.94 9.94 0 0 0 12.02 22C17.54 22 22 17.52 22 12S17.54 2 12.02 2zm0 18.15c-1.6 0-3.09-.44-4.36-1.2l-.31-.18-3.01.79.8-2.93-.2-.3a8.13 8.13 0 0 1-1.25-4.33c0-4.5 3.66-8.15 8.15-8.15 4.5 0 8.15 3.66 8.15 8.15 0 4.5-3.66 8.15-8.15 8.15z" />
      </svg>
    ),
  },
  {
    key: 'instagram' as const,
    href: 'https://www.instagram.com/schema.mx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: 'linkedin' as const,
    href: 'https://www.linkedin.com/company/schema-consulting-mx',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
        <path d="M5.25 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M9.7 8.5H12.94V10.03H12.98C13.44 9.16 14.56 8.24 16.24 8.24C19.66 8.24 20.3 10.48 20.3 13.39V20.5H16.93V14.07C16.93 12.6 16.9 10.71 14.88 10.71C12.83 10.71 12.51 12.31 12.51 13.96V20.5H9.14V8.5H9.7Z" />
      </svg>
    ),
  },
]

function ContactForm() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots tend to fill every field, real users never see or fill this one.
    if (data.get('_honey')) return

    setStatus('sending')
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-teal/20 bg-teal/5 p-10 text-center">
        <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-4">
          {t.contact.formSuccessTitle}
        </div>
        <p className="text-white/60 text-[14px] max-w-sm mx-auto">{t.contact.formSuccessBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_subject" value="Nuevo mensaje desde schema.mx" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <div>
        <label className="font-mono text-[10px] tracking-[0.15em] text-white/30 uppercase block mb-2">
          {t.contact.formName} *
        </label>
        <input
          required
          type="text"
          name="name"
          placeholder={t.contact.formNamePlaceholder}
          className="w-full bg-card border border-white/10 text-white/80 text-[14px] px-4 py-3 focus:border-teal/40 transition-colors duration-200 placeholder:text-white/20"
        />
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-[0.15em] text-white/30 uppercase block mb-2">
          {t.contact.formEmail} *
        </label>
        <input
          required
          type="email"
          name="email"
          placeholder={t.contact.formEmailPlaceholder}
          className="w-full bg-card border border-white/10 text-white/80 text-[14px] px-4 py-3 focus:border-teal/40 transition-colors duration-200 placeholder:text-white/20"
        />
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-[0.15em] text-white/30 uppercase block mb-2">
          {t.contact.formMessage} *
        </label>
        <textarea
          required
          rows={4}
          name="message"
          placeholder={t.contact.formMessagePlaceholder}
          className="w-full bg-card border border-white/10 text-white/80 text-[14px] px-4 py-3 focus:border-teal/40 transition-colors duration-200 placeholder:text-white/20 resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-[13px] text-purple/80">
          {t.contact.formErrorBody}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-purple">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start px-8 py-3.5 bg-teal text-ink font-mono text-[12px] tracking-[0.1em] uppercase hover:bg-teal/80 transition-colors duration-200 disabled:opacity-50"
      >
        {status === 'sending' ? t.contact.formSending : t.contact.formSubmit}
      </button>
    </form>
  )
}

export function Contact() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="pt-12 pb-20 border-b border-white/7">
          <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-6">{t.contact.eyebrow}</div>
          <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05] text-white">
            {t.contact.title1}
            <br />
            <span className="font-serif italic text-purple">{t.contact.title2}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mt-16">
          <div className="lg:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-4">
              {t.contact.formTitle}
            </div>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-xs">{t.contact.formBody}</p>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-white/7">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3 border border-teal/20 bg-teal/5 p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-4">
                  {t.contact.scheduleTitle}
                </div>
                <p className="text-white/60 text-[15px] leading-relaxed mb-10 max-w-lg">{t.contact.scheduleBody}</p>
              </div>
              <CalendlyButton className="self-start px-8 py-3.5 bg-teal text-ink font-mono text-[12px] tracking-[0.1em] uppercase hover:bg-teal/80 transition-colors duration-200">
                {t.contact.scheduleCta}
              </CalendlyButton>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-10">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-4">
                  {t.contact.responseTitle}
                </div>
                <div className="text-white/50 text-[14px] leading-relaxed">{t.contact.responseBody}</div>
              </div>

              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-4">
                  {t.contact.socialsTitle}
                </div>
                <div className="flex flex-col gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 border border-white/10 text-white/50 hover:text-teal hover:border-teal/30 transition-colors duration-200"
                    >
                      {s.icon}
                      <span className="font-mono text-[11px] tracking-[0.1em] uppercase">
                        {t.contact[`${s.key}Label` as 'whatsappLabel' | 'instagramLabel' | 'linkedinLabel']}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
