import type { ButtonHTMLAttributes, ReactNode } from 'react'

const CALENDLY_URL = 'https://calendly.com/hola-schema/30min?text_color=000000&primary_color=5d4e8c'

/**
 * Opens Calendly as its own tab rather than an embedded popup iframe.
 * The popup widget embeds Calendly cross-origin, which browsers treat as a
 * third-party context — Calendly's session cookie gets blocked there, so
 * the booking calendar inside it never finishes loading (stuck spinner).
 * As a first-party top-level page it always renders correctly.
 */
export function openCalendly() {
  window.open(CALENDLY_URL, '_blank', 'noopener')
}

type CalendlyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function CalendlyButton({ children, onClick, ...props }: CalendlyButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        openCalendly()
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
