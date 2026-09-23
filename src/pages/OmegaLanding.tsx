import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendlyButton } from '@/components/CalendlyButton'

type Lang = 'es' | 'en'

type TourTab = { id: string; label: string; title: string; desc: string; items: string[] }
type Tier = { name: string; price: string; cadence: string; intro: string; features: string[]; highlight?: boolean; cta: string }
type WhyRow = { generic: string; omega: string }
type HeroApt = { time: string; name: string; type: string; confirmed: boolean }

type Content = {
  navProduct: string
  navWhy: string
  navPricing: string
  navDemo: string
  heroBadge: string
  heroTitle1: string
  heroTitle2: string
  heroBody: string
  heroCtaPrimary: string
  heroCtaSecondary: string
  heroCardTitle: string
  heroCardDate: string
  heroCardCount: string
  heroCardApts: HeroApt[]
  heroStatusConfirmed: string
  heroStatusPending: string
  heroBadgeTitle: string
  heroBadgeSub: string
  heroCardNote: string
  featuresEyebrow: string
  featuresTitle: string
  featuresSub: string
  features: { num: string; title: string; desc: string }[]
  tourEyebrow: string
  tourTitle: string
  tourSub: string
  tour: TourTab[]
  whyEyebrow: string
  whyTitle: string
  whySub: string
  whyGenericLabel: string
  whyOmegaLabel: string
  whyRows: WhyRow[]
  whyMexicoTitle: string
  whyMexicoBody: string
  stepsEyebrow: string
  stepsTitle: string
  steps: { step: string; title: string; desc: string }[]
  pricingEyebrow: string
  pricingTitle: string
  pricingSub: string
  setupBadgeBold: string
  setupBadgeRest: string
  tiers: Tier[]
  ctaEyebrow: string
  ctaTitle: string
  ctaBody: string
  ctaPrimary: string
  ctaSecondary: string
  footerCredit: string
}

const CONTENT: Record<Lang, Content> = {
  es: {
    navProduct: 'Producto',
    navWhy: 'Por qué Omega',
    navPricing: 'Precios',
    navDemo: 'Probar demo',
    heroBadge: 'Software para clínicas de bariatría y metabolismo',
    heroTitle1: 'Menos captura manual.',
    heroTitle2: 'Más tiempo con tus pacientes.',
    heroBody:
      'Omega Gestionador de Clínica Inteligente lee tus laboratorios y básculas InBody automáticamente, arma el expediente del paciente por ti, y confirma citas por WhatsApp sin que nadie tenga que llamar.',
    heroCtaPrimary: 'Probar demo interactivo',
    heroCtaSecondary: 'Agendar una llamada',
    heroCardTitle: 'Agenda de hoy',
    heroCardDate: 'Martes, 22 de septiembre',
    heroCardCount: '4 citas',
    heroCardApts: [
      { time: '09:00', name: 'Ana Paola Ibarra', type: 'Seguimiento', confirmed: true },
      { time: '10:30', name: 'Mitzy Gervacci Zazueta', type: 'Consulta inicial', confirmed: true },
      { time: '11:30', name: 'Roberto Salinas', type: 'Revisión nutricional', confirmed: false },
      { time: '14:00', name: 'Miguel Torres', type: 'Control de tratamiento', confirmed: true },
    ],
    heroStatusConfirmed: 'Confirmada',
    heroStatusPending: 'Pendiente',
    heroBadgeTitle: 'Confirmadas por WhatsApp',
    heroBadgeSub: 'sin que tu equipo llame',
    heroCardNote: 'Ejemplo ilustrativo con datos ficticios.',
    featuresEyebrow: 'Qué hace Omega',
    featuresTitle: 'Todo lo que hoy haces a mano, automatizado.',
    featuresSub: 'Diseñado a partir del trabajo real con clínicas de bariatría y metabolismo en Monterrey.',
    features: [
      { num: '01', title: 'Expediente completo del paciente', desc: 'Historial, antecedentes, signos vitales y seguimiento en un solo lugar, sin carpetas ni hojas sueltas.' },
      { num: '02', title: 'Lectura automática de laboratorios e InBody', desc: 'Sube el PDF o el ticket de báscula y el expediente se actualiza solo, sin captura manual.' },
      { num: '03', title: 'Resumen del paciente con IA', desc: 'Un resumen claro del progreso del paciente antes de cada consulta, generado automáticamente.' },
      { num: '04', title: 'Calendario integrado', desc: 'Agenda tus citas y consúltalas desde el mismo sistema donde ves al paciente.' },
      { num: '05', title: 'Automatización por WhatsApp', desc: 'Confirmaciones y recordatorios de cita enviados solos, sin que tu equipo tenga que llamar.' },
      { num: '06', title: 'Reconocimiento de voz con IA', desc: 'Dicta tus notas de consulta y deja que el sistema las estructure en el expediente.' },
    ],
    tourEyebrow: 'Recorre Omega',
    tourTitle: 'Cada área de tu clínica, cubierta',
    tourSub: 'Esto es lo que ya funciona en el sistema: no es una idea, es una demo de la operación real.',
    tour: [
      {
        id: 'pacientes', label: 'Pacientes',
        title: 'Un expediente que de verdad se usa',
        desc: 'Todo el historial del paciente en un solo lugar, buscable, sin carpetas físicas ni hojas de cálculo dispersas.',
        items: [
          'Expediente completo: antecedentes, signos vitales, estudios, seguimiento',
          'Búsqueda instantánea de pacientes',
          'Soporte multi-doctor con etiqueta por especialista',
          'Formulario de captura personalizable por clínica',
        ],
      },
      {
        id: 'riesgo', label: 'Riesgo Clínico',
        title: 'Calculadoras clínicas validadas, automáticas',
        desc: 'Omega calcula los índices de riesgo metabólico y cardiovascular más usados en consulta, a partir de los datos que ya capturaste.',
        items: [
          'Framingham, FINDRISC, HOMA-IR, TyG, VAI, FLI y NAFLD',
          'Estadificación EOSS (Edmonton Obesity Staging System) sugerida automáticamente',
          'Evaluación de sarcopenia a partir del InBody',
          'El médico siempre confirma o ajusta antes de que quede en el expediente',
        ],
      },
      {
        id: 'plan', label: 'Plan de Tratamiento',
        title: 'El plan y el progreso, conectados',
        desc: 'Metas de peso, tipo de tratamiento y próxima cita en una sola vista, no en la cabeza del doctor.',
        items: [
          'Seguimiento de meta de peso vs. peso actual',
          'Tratamiento farmacológico (dosis y fechas de GLP-1), quirúrgico o endoscópico',
          'Próxima cita ligada automáticamente al plan activo',
        ],
      },
      {
        id: 'nutricion', label: 'Nutrición con IA',
        title: 'Lee el recordatorio de 24 horas por ti',
        desc: 'El paciente describe cómo come y Omega lo analiza automáticamente, como apoyo, nunca en lugar del nutriólogo.',
        items: [
          'Detección automática de comidas y horarios mencionados',
          'Señales de alerta y opciones saludables identificadas por palabras clave',
          'Cuestionario de perfil alimentario integrado al expediente',
        ],
      },
      {
        id: 'whatsapp', label: 'WhatsApp',
        title: 'Confirmaciones y recordatorios que se envían solos',
        desc: 'Tu equipo deja de llamar uno por uno: Omega confirma, recuerda y avisa cuando algo necesita atención humana.',
        items: [
          'Confirmación automática de citas por WhatsApp',
          'Recordatorios previos a la consulta',
          'Seguimiento de pagos por chat',
          'Panel con aviso de "necesita atención" cuando la automatización no basta',
        ],
      },
      {
        id: 'calendario', label: 'Calendario',
        title: 'La agenda de la clínica, no solo la tuya',
        desc: 'Sincronizado con las herramientas que tu equipo ya usa, con vista clara de quién atiende qué.',
        items: [
          'Sincronización con Google Calendar',
          'Roles por especialista: médico, nutrición, acondicionamiento',
          'Vista de escritorio y móvil',
        ],
      },
    ],
    whyEyebrow: 'Por qué Omega',
    whyTitle: 'No solo especializado. Hecho a tu medida.',
    whySub: 'Las plataformas grandes te dan un software genérico y te dejan solo con la configuración. Nosotros hacemos las cosas distinto.',
    whyGenericLabel: 'Software genérico grande',
    whyOmegaLabel: 'Omega',
    whyRows: [
      { generic: 'Configúralo tú mismo, con manuales de cientos de páginas.', omega: 'Nosotros lo configuramos por ti, sin costo.' },
      { generic: 'Un producto igual para cualquier clínica.', omega: 'Adaptado a tu especialidad y tu forma de trabajar.' },
      { generic: 'Soporte por ticket, en otro país, en otro idioma.', omega: 'Fácil de contactarnos y pedirnos cambios cuando los necesites.' },
      { generic: 'Tú te encargas solo de la curva de aprendizaje.', omega: 'Sabemos que estás ocupado: te acompañamos hasta que tu equipo lo domine.' },
    ],
    whyMexicoTitle: 'Hecho en México, para médicos mexicanos',
    whyMexicoBody: 'Creemos que mereces herramientas tan buenas como las de cualquier país, pensadas para cómo se trabaja aquí: en español, con soporte cercano y sin fricciones de facturación o pagos internacionales.',
    stepsEyebrow: 'Proceso simple',
    stepsTitle: 'Así empiezas a usarlo',
    steps: [
      { step: '1', title: 'Nos cuentas cómo trabajas', desc: 'Formularios, métricas, especialidad: configuramos Omega a tu forma de trabajar, sin costo de instalación.' },
      { step: '2', title: 'Migramos tu información', desc: 'Te ayudamos a subir tus expedientes actuales para que no empieces de cero.' },
      { step: '3', title: 'Tu equipo empieza a usarlo', desc: 'Capacitación incluida para ti y tu personal, con dudas resueltas mientras te acostumbras.' },
    ],
    pricingEyebrow: 'Precios',
    pricingTitle: 'Un plan para cada etapa de tu clínica',
    pricingSub: 'Cada plan incluye todo lo del anterior. Cambia de plan cuando tu clínica lo necesite.',
    setupBadgeBold: '$0 costo de instalación',
    setupBadgeRest: 'configuramos la app a tu forma de trabajar',
    tiers: [
      {
        name: 'Base', price: '$800', cadence: 'MXN / mes',
        intro: 'Lo esencial para dejar de usar papel y hojas de cálculo.',
        features: ['Expediente completo de pacientes', 'Detalle clínico del paciente', 'Lectura de estudios de laboratorio e InBody', 'Resumen del paciente con IA', 'Calendario integrado'],
        cta: 'Solicitar información',
      },
      {
        name: 'Essentials', price: '$1,000', cadence: 'MXN / mes',
        intro: 'Todo lo de Base, más:',
        features: ['Formulario personalizado (más o menos campos según tu clínica)', 'Conexión con Google Calendar, Apple Calendar y otros', 'Métricas personalizadas: signos vitales, seguimiento, nutrición, otros especialistas'],
        cta: 'Solicitar información',
      },
      {
        name: 'Automation', price: '$1,500', cadence: 'MXN / mes',
        intro: 'Todo lo de Essentials, más:',
        features: ['Confirmación de citas por WhatsApp', 'Recordatorios a pacientes por WhatsApp', 'Reconocimiento de voz con IA', 'Gestión de leads y agenda'],
        highlight: true,
        cta: 'Solicitar información',
      },
      {
        name: 'Custom', price: '$2,500+', cadence: 'MXN / mes',
        intro: 'El tier que elijas como base, más:',
        features: ['Herramientas personalizadas a tu medida', 'Cuota única de desarrollo (OTOF) según alcance'],
        cta: 'Hablar con nosotros',
      },
    ],
    ctaEyebrow: '¿Listo para ver más?',
    ctaTitle: 'Prueba el demo o platícanos de tu clínica.',
    ctaBody: 'Sin compromiso. Te mostramos cómo se vería Omega funcionando con tu forma de trabajar.',
    ctaPrimary: 'Probar demo interactivo',
    ctaSecondary: 'Hablar con nosotros',
    footerCredit: 'Un producto construido por Schema',
  },
  en: {
    navProduct: 'Product',
    navWhy: 'Why Omega',
    navPricing: 'Pricing',
    navDemo: 'Try the demo',
    heroBadge: 'Software for bariatric and metabolic clinics',
    heroTitle1: 'Less manual data entry.',
    heroTitle2: 'More time with your patients.',
    heroBody:
      'Omega Intelligent Clinic Management automatically reads your lab work and InBody scales, builds the patient record for you, and confirms appointments over WhatsApp so nobody has to call.',
    heroCtaPrimary: 'Try the interactive demo',
    heroCtaSecondary: 'Book a call',
    heroCardTitle: "Today's schedule",
    heroCardDate: 'Tuesday, 22 September',
    heroCardCount: '4 appointments',
    heroCardApts: [
      { time: '09:00', name: 'Ana Paola Ibarra', type: 'Follow-up', confirmed: true },
      { time: '10:30', name: 'Mitzy Gervacci Zazueta', type: 'Initial consultation', confirmed: true },
      { time: '11:30', name: 'Roberto Salinas', type: 'Nutrition review', confirmed: false },
      { time: '14:00', name: 'Miguel Torres', type: 'Treatment check-in', confirmed: true },
    ],
    heroStatusConfirmed: 'Confirmed',
    heroStatusPending: 'Pending',
    heroBadgeTitle: 'Confirmed over WhatsApp',
    heroBadgeSub: 'without your team calling',
    heroCardNote: 'Illustrative example with fictional data.',
    featuresEyebrow: 'What Omega does',
    featuresTitle: 'Everything you do by hand today, automated.',
    featuresSub: 'Designed from real work with bariatric and metabolic clinics in Monterrey.',
    features: [
      { num: '01', title: 'Complete patient record', desc: 'History, background, vitals, and follow-up in one place, no folders or loose spreadsheets.' },
      { num: '02', title: 'Automatic lab and InBody reading', desc: 'Upload the PDF or the scale ticket and the record updates itself, no manual entry.' },
      { num: '03', title: 'AI patient summary', desc: 'A clear summary of the patient’s progress before every visit, generated automatically.' },
      { num: '04', title: 'Built-in calendar', desc: 'Schedule and check appointments from the same system where you see the patient.' },
      { num: '05', title: 'WhatsApp automation', desc: 'Appointment confirmations and reminders sent on their own, no calls from your team.' },
      { num: '06', title: 'AI voice recognition', desc: 'Dictate your visit notes and let the system structure them into the record.' },
    ],
    tourEyebrow: 'Explore Omega',
    tourTitle: 'Every area of your clinic, covered',
    tourSub: 'This is what already works in the system: not an idea, a demo of the real operation.',
    tour: [
      {
        id: 'pacientes', label: 'Patients',
        title: 'A record your team actually uses',
        desc: 'The patient’s full history in one searchable place, no physical folders or scattered spreadsheets.',
        items: [
          'Complete record: background, vitals, studies, follow-up',
          'Instant patient search',
          'Multi-doctor support with per-specialist tagging',
          'Intake form customizable per clinic',
        ],
      },
      {
        id: 'riesgo', label: 'Clinical Risk',
        title: 'Validated clinical calculators, automatic',
        desc: 'Omega calculates the metabolic and cardiovascular risk indices most used in consultation, from data you already captured.',
        items: [
          'Framingham, FINDRISC, HOMA-IR, TyG, VAI, FLI, and NAFLD',
          'EOSS (Edmonton Obesity Staging System) staging, auto-suggested',
          'Sarcopenia assessment from InBody',
          'The doctor always confirms or adjusts before it lands in the record',
        ],
      },
      {
        id: 'plan', label: 'Treatment Plan',
        title: 'The plan and the progress, connected',
        desc: 'Weight goals, treatment type, and next appointment in one view, not in the doctor’s head.',
        items: [
          'Weight-goal tracking vs. current weight',
          'Pharmacological (GLP-1 dose and dates), surgical, or endoscopic treatment',
          'Next appointment automatically linked to the active plan',
        ],
      },
      {
        id: 'nutricion', label: 'AI Nutrition',
        title: 'Reads the 24-hour recall for you',
        desc: 'The patient describes how they eat and Omega analyzes it automatically, as support, never in place of the dietitian.',
        items: [
          'Automatic detection of meals and mentioned schedules',
          'Warning signs and healthy choices flagged by keyword',
          'Dietary profile questionnaire built into the record',
        ],
      },
      {
        id: 'whatsapp', label: 'WhatsApp',
        title: 'Confirmations and reminders that send themselves',
        desc: 'Your team stops calling one by one: Omega confirms, reminds, and flags when something needs a human.',
        items: [
          'Automatic appointment confirmation over WhatsApp',
          'Reminders ahead of the visit',
          'Payment follow-up over chat',
          '"Needs attention" panel when automation isn’t enough',
        ],
      },
      {
        id: 'calendario', label: 'Calendar',
        title: 'The clinic’s calendar, not just yours',
        desc: 'Synced with the tools your team already uses, with a clear view of who’s seeing whom.',
        items: [
          'Google Calendar sync',
          'Roles per specialist: doctor, nutrition, conditioning',
          'Desktop and mobile view',
        ],
      },
    ],
    whyEyebrow: 'Why Omega',
    whyTitle: 'Not just specialized. Built around you.',
    whySub: 'Big platforms hand you generic software and leave you alone with the setup. We do things differently.',
    whyGenericLabel: 'Big generic software',
    whyOmegaLabel: 'Omega',
    whyRows: [
      { generic: 'Set it up yourself, with hundred-page manuals.', omega: 'We set it up for you, at no cost.' },
      { generic: 'One-size-fits-all for every clinic.', omega: 'Adapted to your specialty and how you work.' },
      { generic: 'Ticket-based support, another country, another language.', omega: 'Easy to reach us and ask for changes whenever you need them.' },
      { generic: 'You handle the learning curve on your own.', omega: 'We know you’re busy: we stay with you until your team has it down.' },
    ],
    whyMexicoTitle: 'Made in Mexico, for Mexican doctors',
    whyMexicoBody: 'We believe you deserve tools as good as anywhere else, built for how clinics actually work here: in Spanish, with close support, and without international billing or payment friction.',
    stepsEyebrow: 'Simple process',
    stepsTitle: 'How you get started',
    steps: [
      { step: '1', title: 'You tell us how you work', desc: 'Forms, metrics, specialty: we configure Omega to how you work, at no setup cost.' },
      { step: '2', title: 'We migrate your data', desc: 'We help you bring in your existing records so you don’t start from zero.' },
      { step: '3', title: 'Your team starts using it', desc: 'Training included for you and your staff, with questions answered as you get used to it.' },
    ],
    pricingEyebrow: 'Pricing',
    pricingTitle: 'A plan for every stage of your clinic',
    pricingSub: 'Each plan includes everything in the one before it. Change plans whenever your clinic needs to.',
    setupBadgeBold: '$0 setup cost',
    setupBadgeRest: 'we configure the app to how you work',
    tiers: [
      {
        name: 'Base', price: '$800', cadence: 'MXN / month',
        intro: 'The essentials to stop using paper and spreadsheets.',
        features: ['Complete patient records', 'Patient clinical detail', 'Lab study and InBody reading', 'AI patient summary', 'Built-in calendar'],
        cta: 'Request information',
      },
      {
        name: 'Essentials', price: '$1,000', cadence: 'MXN / month',
        intro: 'Everything in Base, plus:',
        features: ['Customized intake form (more or fewer fields per clinic)', 'Google Calendar, Apple Calendar, and other connections', 'Custom metrics: vitals, follow-up, nutrition, other specialists'],
        cta: 'Request information',
      },
      {
        name: 'Automation', price: '$1,500', cadence: 'MXN / month',
        intro: 'Everything in Essentials, plus:',
        features: ['WhatsApp appointment confirmation', 'WhatsApp patient reminders', 'AI voice recognition', 'Lead and scheduling management'],
        highlight: true,
        cta: 'Request information',
      },
      {
        name: 'Custom', price: '$2,500+', cadence: 'MXN / month',
        intro: 'The tier you choose as a base, plus:',
        features: ['Tools custom-built for you', 'One-time development fee (OTOF) based on scope'],
        cta: 'Talk to us',
      },
    ],
    ctaEyebrow: 'Ready to see more?',
    ctaTitle: 'Try the demo or tell us about your clinic.',
    ctaBody: 'No commitment. We’ll show you what Omega would look like running the way your clinic works.',
    ctaPrimary: 'Try the interactive demo',
    ctaSecondary: 'Talk to us',
    footerCredit: 'A product built by Schema',
  },
}

function OmegaLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-7 h-7 rounded-lg bg-[#1ab89a] flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className="font-semibold text-[15px] tracking-tight text-[#0e1c1a]">Omega</span>
    </div>
  )
}

export function OmegaLanding() {
  const [lang, setLang] = useState<Lang>('es')
  const t = CONTENT[lang]
  const [activeTour, setActiveTour] = useState(0)
  const tour = t.tour[activeTour]
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-white text-[#0e1c1a]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8f0ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
          <OmegaLogo />
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
            <a href="#producto" className="hidden md:block text-sm text-[#5a7a76] hover:text-[#0e1c1a] transition-colors">
              {t.navProduct}
            </a>
            <a href="#por-que" className="hidden md:block text-sm text-[#5a7a76] hover:text-[#0e1c1a] transition-colors">
              {t.navWhy}
            </a>
            <a href="#precios" className="hidden md:block text-sm text-[#5a7a76] hover:text-[#0e1c1a] transition-colors">
              {t.navPricing}
            </a>
            <div className="flex items-center border border-[#e8f0ef] rounded-full overflow-hidden text-xs font-semibold shrink-0">
              <button
                onClick={() => setLang('es')}
                className={`px-2 sm:px-2.5 py-1.5 transition-colors ${lang === 'es' ? 'bg-[#0e1c1a] text-white' : 'text-[#8aada9] hover:text-[#0e1c1a]'}`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-[#0e1c1a] text-white' : 'text-[#8aada9] hover:text-[#0e1c1a]'}`}
              >
                EN
              </button>
            </div>
            <Link
              to="/omega/demo"
              className="bg-[#0e1c1a] text-white text-[13px] sm:text-sm px-3.5 sm:px-5 py-2.5 rounded-full hover:bg-[#1ab89a] transition-colors font-medium whitespace-nowrap"
            >
              {/* Narrow phones can't fit the full label alongside the logo, language toggle and menu. */}
              <span className="min-[360px]:hidden">Demo</span>
              <span className="hidden min-[360px]:inline">{t.navDemo}</span>
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menú"
              className="md:hidden w-8 h-8 shrink-0 flex items-center justify-center text-[#0e1c1a]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {menuOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#e8f0ef] shadow-[0_8px_24px_rgba(14,28,26,0.08)] p-2">
              {[
                ['#producto', t.navProduct],
                ['#por-que', t.navWhy],
                ['#precios', t.navPricing],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-[15px] font-medium text-[#0e1c1a] hover:bg-[#f7f8f9] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f0faf7] text-[#1ab89a] text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1ab89a]" />
              {t.heroBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-[#0e1c1a] mb-6">
              {t.heroTitle1}
              <br />
              <span className="text-[#1ab89a]">{t.heroTitle2}</span>
            </h1>
            <p className="text-[#5a7a76] text-lg leading-relaxed mb-10 max-w-md font-light">{t.heroBody}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/omega/demo"
                className="bg-[#1ab89a] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#13a389] transition-colors"
              >
                {t.heroCtaPrimary}
              </Link>
              <CalendlyButton className="border border-[#d0e8e4] text-[#0e1c1a] px-7 py-3.5 rounded-full font-medium text-sm hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">
                {t.heroCtaSecondary}
              </CalendlyButton>
            </div>
          </div>

          {/* Product snapshot: the day's agenda with WhatsApp confirmation states,
              mirroring what the app actually shows. */}
          <div>
            <div className="relative">
            <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_4px_24px_rgba(14,28,26,0.06)] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs text-[#8aada9] mb-0.5">{t.heroCardTitle}</p>
                  <p className="text-[15px] font-bold text-[#0e1c1a]">{t.heroCardDate}</p>
                </div>
                <span className="shrink-0 text-[11px] font-medium bg-[#f0faf7] text-[#1ab89a] px-2.5 py-1 rounded-full whitespace-nowrap">
                  {t.heroCardCount}
                </span>
              </div>

              <div className="flex flex-col">
                {t.heroCardApts.map((a) => (
                  <div
                    key={a.time}
                    className="flex items-center gap-3 sm:gap-4 py-3 border-b border-[#f0f8f6] last:border-0"
                  >
                    <span
                      className="text-[12px] font-semibold text-[#1ab89a] shrink-0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {a.time}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-semibold text-[#0e1c1a] truncate leading-tight">{a.name}</p>
                      <p className="text-[11.5px] text-[#8aada9] truncate mt-0.5">{a.type}</p>
                    </div>
                    <span
                      className={`shrink-0 text-[10.5px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                        a.confirmed ? 'bg-[#f0faf7] text-[#1ab89a]' : 'bg-[#f7f8f9] text-[#8aada9]'
                      }`}
                    >
                      {a.confirmed ? t.heroStatusConfirmed : t.heroStatusPending}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-6 flex items-center gap-3 bg-white border border-[#e8f0ef] rounded-2xl shadow-[0_8px_24px_rgba(14,28,26,0.10)] px-4 py-3">
              <span className="w-8 h-8 rounded-lg bg-[#f0faf7] text-[#1ab89a] flex items-center justify-center shrink-0">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold text-[#0e1c1a]">{t.heroBadgeTitle}</p>
                <p className="text-[11.5px] text-[#8aada9]">{t.heroBadgeSub}</p>
              </div>
            </div>

            </div>
            <p className="text-[11px] text-[#c8ddd9] mt-3 lg:mt-10 lg:text-center">{t.heroCardNote}</p>
          </div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="border-y border-[#e8f0ef] bg-[#f8fefe]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
            <div className="lg:pt-2">
              <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">{t.featuresEyebrow}</p>
              <h2 className="text-3xl font-extrabold text-[#0e1c1a] leading-tight mb-4">{t.featuresTitle}</h2>
              <p className="text-[#5a7a76] text-sm leading-relaxed font-light">{t.featuresSub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#e8f0ef] border border-[#e8f0ef] rounded-2xl overflow-hidden">
              {t.features.map((f) => (
                <div key={f.num} className="bg-white p-7 hover:bg-[#f8fefe] transition-colors group">
                  <p className="text-xs text-[#c8ddd9] font-medium mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {f.num}
                  </p>
                  <h3 className="text-[15px] font-semibold text-[#0e1c1a] mb-2 group-hover:text-[#1ab89a] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#8aada9] leading-relaxed font-light">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT TOUR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24" id="producto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">{t.tourEyebrow}</p>
          <h2 className="text-3xl font-extrabold text-[#0e1c1a] mb-3">{t.tourTitle}</h2>
          <p className="text-[#5a7a76] text-sm leading-relaxed font-light max-w-lg mx-auto">{t.tourSub}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {t.tour.map((tt, i) => (
            <button
              key={tt.id}
              onClick={() => setActiveTour(i)}
              className={`text-sm px-4 py-2.5 rounded-full font-medium transition-colors ${
                activeTour === i
                  ? 'bg-[#0e1c1a] text-white'
                  : 'bg-[#f8fefe] text-[#5a7a76] border border-[#e8f0ef] hover:border-[#1ab89a] hover:text-[#0e1c1a]'
              }`}
            >
              {tt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 rounded-2xl border border-[#e8f0ef] bg-[#f8fefe] p-5 sm:p-8 md:p-12" key={tour.id}>
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-extrabold text-[#0e1c1a] mb-4 leading-tight">{tour.title}</h3>
            <p className="text-[#5a7a76] text-sm leading-relaxed font-light">{tour.desc}</p>
          </div>
          <div className="lg:col-span-3">
            <ul className="flex flex-col gap-4">
              {tour.items.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-white border border-[#e8f0ef] rounded-xl p-4">
                  <svg className="shrink-0 mt-0.5 text-[#1ab89a]" width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[13px] text-[#0e1c1a] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY OMEGA */}
      <section className="border-y border-[#e8f0ef] bg-[#f8fefe]" id="por-que">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">{t.whyEyebrow}</p>
            <h2 className="text-3xl font-extrabold text-[#0e1c1a] mb-3">{t.whyTitle}</h2>
            <p className="text-[#5a7a76] text-sm leading-relaxed font-light max-w-lg mx-auto">{t.whySub}</p>
          </div>

          <div className="rounded-2xl border border-[#e8f0ef] bg-white overflow-hidden mb-10">
            <div className="grid grid-cols-2">
              <div className="px-5 md:px-8 py-4 bg-[#f8fefe] border-b border-r border-[#e8f0ef]">
                <span className="text-xs font-semibold text-[#8aada9] uppercase tracking-wide">{t.whyGenericLabel}</span>
              </div>
              <div className="px-5 md:px-8 py-4 bg-[#0e1c1a] border-b border-[#0e1c1a]">
                <span className="text-xs font-semibold text-[#1ab89a] uppercase tracking-wide">{t.whyOmegaLabel}</span>
              </div>
            </div>
            {t.whyRows.map((row, i) => (
              <div key={i} className="grid grid-cols-2">
                <div className={`px-5 md:px-8 py-5 text-[13px] text-[#8aada9] leading-snug border-r border-[#e8f0ef] ${i < t.whyRows.length - 1 ? 'border-b' : ''}`}>
                  {row.generic}
                </div>
                <div className={`px-5 md:px-8 py-5 text-[13px] font-medium text-[#0e1c1a] leading-snug flex items-start gap-2 ${i < t.whyRows.length - 1 ? 'border-b border-[#e8f0ef]' : ''}`}>
                  <svg className="shrink-0 mt-0.5 text-[#1ab89a]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {row.omega}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#0e1c1a] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <span className="text-4xl shrink-0">🇲🇽</span>
            <div>
              <h3 className="text-white text-lg font-bold mb-1.5">{t.whyMexicoTitle}</h3>
              <p className="text-[#8aada9] text-sm leading-relaxed">{t.whyMexicoBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">{t.stepsEyebrow}</p>
          <h2 className="text-3xl font-extrabold text-[#0e1c1a]">{t.stepsTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-[#e8f0ef]" />
          {t.steps.map((s) => (
            <div key={s.step} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-[#f0faf7] border border-[#d0e8e4] mx-auto mb-5 flex items-center justify-center bg-white">
                <span className="text-xl font-extrabold text-[#1ab89a]">{s.step}</span>
              </div>
              <h3 className="font-semibold text-[#0e1c1a] mb-2">{s.title}</h3>
              <p className="text-sm text-[#8aada9] leading-relaxed font-light max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="border-y border-[#e8f0ef] bg-[#f8fefe]" id="precios">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">{t.pricingEyebrow}</p>
            <h2 className="text-3xl font-extrabold text-[#0e1c1a] mb-4">{t.pricingTitle}</h2>
            <p className="text-[#5a7a76] text-sm leading-relaxed font-light max-w-lg mx-auto">{t.pricingSub}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-white border border-[#d0e8e4] text-[#0e1c1a] text-sm px-5 py-3 sm:py-2.5 rounded-2xl sm:rounded-full mb-12 mx-auto w-full sm:w-fit text-center">
            <span className="font-semibold text-[#1ab89a]">{t.setupBadgeBold}</span>
            <span className="text-[#8aada9] hidden sm:inline">·</span>
            <span className="text-[#8aada9]">{t.setupBadgeRest}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl p-5 sm:p-7 ${
                  tier.highlight ? 'bg-[#0e1c1a] text-white border border-[#0e1c1a]' : 'bg-white border border-[#e8f0ef]'
                }`}
              >
                <h3 className={`font-semibold text-base mb-1 ${tier.highlight ? 'text-white' : 'text-[#0e1c1a]'}`}>{tier.name}</h3>
                <div className="mb-4">
                  <span className={`text-3xl font-extrabold ${tier.highlight ? 'text-white' : 'text-[#0e1c1a]'}`}>{tier.price}</span>
                  <span className={`text-xs ml-1.5 ${tier.highlight ? 'text-white/50' : 'text-[#8aada9]'}`}>{tier.cadence}</span>
                </div>
                <p className={`text-xs font-medium mb-5 ${tier.highlight ? 'text-[#1ab89a]' : 'text-[#5a7a76]'}`}>{tier.intro}</p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((text) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <svg className="shrink-0 mt-0.5 text-[#1ab89a]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={`text-[13px] leading-snug ${tier.highlight ? 'text-white/80' : 'text-[#5a7a76]'}`}>{text}</span>
                    </li>
                  ))}
                </ul>
                <CalendlyButton
                  className={`w-full text-center px-5 py-3 rounded-full font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? 'bg-[#1ab89a] text-white hover:bg-[#13a389]'
                      : 'border border-[#d0e8e4] text-[#0e1c1a] hover:border-[#1ab89a] hover:text-[#1ab89a]'
                  }`}
                >
                  {tier.cta}
                </CalendlyButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="bg-[#0e1c1a] rounded-2xl px-6 sm:px-10 py-10 sm:py-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 50%, #1ab89a 0%, transparent 60%), radial-gradient(circle at 70% 50%, #3ab8c8 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-4">{t.ctaEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">{t.ctaTitle}</h2>
            <p className="text-[#5a8a82] text-base mb-8 max-w-sm mx-auto font-light">{t.ctaBody}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/omega/demo"
                className="bg-[#1ab89a] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#13a389] transition-colors"
              >
                {t.ctaPrimary}
              </Link>
              <CalendlyButton className="border border-white/20 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:border-white/40 transition-colors">
                {t.ctaSecondary}
              </CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      {/* OMEGA FOOTER STRIP */}
      <div className="border-t border-[#e8f0ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <OmegaLogo />
          <a href="https://schema.mx" className="text-xs text-[#c8ddd9] hover:text-[#8aada9] transition-colors">
            {t.footerCredit}
          </a>
        </div>
      </div>
    </div>
  )
}
