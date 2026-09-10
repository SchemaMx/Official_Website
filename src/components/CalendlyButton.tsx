import type { ButtonHTMLAttributes, ReactNode } from 'react'

const CALENDLY_URL = 'https://calendly.com/hola-schema/30min?text_color=000000&primary_color=5d4e8c'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

export function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  } else {
    window.open(CALENDLY_URL, '_blank', 'noopener')
  }
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
