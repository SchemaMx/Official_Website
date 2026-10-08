// Translations for the Omega interactive demo (ES / EN / PT-BR).
//
// Clinical nomenclature that is identical across these languages (HOMA-IR,
// AST/TGO, LDL, FINDRISC, EOSS, InBody, GLP-1 brand names) is left out of the
// dictionary and stays inline in the component. Sample patient names ARE
// localized, because a Brazilian doctor evaluating the product should not be
// looking at a roster of Mexican names.

import { createContext, useContext } from 'react'

export type DemoLang = 'es' | 'en' | 'pt'

export type DemoDict = {
  disclaimer: string
  clinic: string
  exit: string
  exitShort: string
  navPanel: string
  navCalendar: string
  navUpload: string
  navWhatsApp: string
  menu: string

  tabs: string[]

  patients: string
  searchPlaceholder: string
  newPatient: string
  years: string
  edit: string
  backToPatients: string
  genderF: string
  genderM: string
  condNormal: string
  condOverweight: string
  condObesity1: string
  noTreatment: string

  // Resumen
  initialWeight: string
  currentWeight: string
  goal: string
  firstRecord: string
  remaining: string
  closePanel: string
  openPanel: string
  weightEvolution: string
  weightSources: string
  goalProgress: string
  fatVsMuscle: string
  visceralFat: string
  visceralSource: string
  relativeStrength: string
  strengthSource: string
  kgActual: string
  obesity: string
  overweight: string
  normal: string
  aiSummary: string
  updated: string
  clinicalSummary: string
  identifiedProblems: string
  treatmentConsiderations: string
  summaryBody: (p: { gender: string; age: number; bmi: number; condition: string; medication: string }) => string
  problemInsulin: string
  problemVisceral: string
  considerationsBody: string
  metricFat: string
  metricWater: string
  metricFatMass: string
  metricMuscleMass: string
  metricLeanMass: string

  // Antecedentes
  personalData: string
  birthDate: string
  birthDateValue: string
  maritalStatus: string
  maritalValue: string
  occupation: string
  occupationValue: string
  phone: string
  email: string
  city: string
  cityValue: string
  bloodType: string
  anthropometrics: string
  height: string
  bmi: string
  waist: string
  hip: string
  neck: string
  maxWeight: string
  minWeight: string
  comorbidities: string
  comorbInsulin: string
  comorbDyslipidemia: string
  priorSurgery: string
  noneRegistered: string
  weightLossAttempts: string
  attempt1: string
  attempt2: string

  // Signos vitales
  dynamometry: string
  squats: string
  squatsCutoff: string
  newVitals: string
  registerVitals: string
  history: string
  takes: string
  vitalWeight: string

  // InBody
  inbodyAnalysis: string
  uploadPdf: string
  backToList: string
  originalReport: string
  inbodyScore: string
  bodyComposition: string
  weight: string
  bodyFatPct: string
  skeletalMuscle: string
  researchParams: string
  waistHipRatio: string
  bmr: string
  recommendedCalories: string
  bodyWater: string
  proteins: string
  minerals: string
  leanMass: string
  age: string
  gender: string

  // Estudios
  studiesCount: string
  addFinding: string
  addStudy: string
  viewDetail: string
  labName: string
  valuesCount: string
  more: string
  backToStudies: string
  originalDocument: string
  labHeader: string
  folio: string
  date: string
  patientActive: string
  sex: string
  results: string
  editValues: string
  labMetabolic: string
  labLipids: string
  labHepatic: string
  labProteins: string
  labRenal: string

  // Riesgo
  riskPanel: string
  riskDisclaimer: string
  bmiLabel: string
  framingham: string
  framinghamNote: string
  stopBangNote: string
  metabolicSyndrome: string
  metabolicNote: string
  findriscNote: string
  fliNote: string
  nafldNote: string
  eossNote: string
  closeBreakdown: string
  openBreakdown: string
  eossTitle: string
  eossSuggested: string
  eossHint: string
  insulinAdiposity: string
  homaNote: string
  tygNote: string
  vaiNote: string
  sarcopeniaScreen: string
  sarcLow: string
  sarcStrength: string
  sarcWalk: string
  sarcChair: string
  sarcStairs: string
  sarcNone: string
  sarcSome: string

  // Plan
  weightGoal: string
  nextAppt: string
  nextApptValue: string
  establishedPlan: string
  modifyPlan: string
  treatmentType: string
  pharmacological: string
  medication: string
  initialDose: string
  startDate: string
  estimatedTerm: string
  sixMonths: string
  doseOverTime: string

  // Nutrición
  circumferences: string
  newMeasures: string
  registerMeasures: string
  measureNeck: string
  measureArm: string
  measureWaist: string
  measureHip: string
  measureCalf: string
  circ: string
  measuresPanel: string
  bodyDiagram: string
  noPreviousData: string

  // Act. Física
  nextSession: string
  nextApptReminder: string
  inN: string
  exactDate: string
  oneWeek: string
  twoWeeks: string
  oneMonth: string
  other: string
  habits: string
  smoking: string
  vaping: string
  alcohol: string
  physicalActivity: string
  sleepHours: string
  active: string
  veryActive: string
  occasional: string
  smokingDetail: string
  vapingDetail: string
  alcoholDetail: string
  activityDetail: string

  // Seguimiento
  newConsult: string
  consultType: string
  weightKg: string
  auto: string
  treatmentLine: string
  currentDose: string
  started: string
  clinicalNote: string
  clinicalNotePlaceholder: string
  registerConsult: string
  consultsAndBaseline: string
  today: string
  visitFollowUp: string
  visitNutrition: string
  visitConditioning: string
  visitNote1: string
  visitNote2: string
  visitNote3: string

  // Calendar
  calDays: string[]
  calMonth: string
  calToday: string
  calTodayLabel: string
  apptsScheduled: string
  apptInitial: string

  // Upload view
  uploadTitle: string
  uploadSub: string
  activePatient: string
  change: string
  dropHere: string
  orClick: string
  recentUploads: string
  processed: string
  inReview: string

  // WhatsApp
  waConnected: string
  waConfirmations: string
  waReminders: string
  waPayments: string
  waNeedsAttention: string
  waDisabled: string
  waComingSoon: string
  waSent: string
  waPending: string
  waApptTomorrow: string
  waAppt2Days: string
  waAppt7Days: string
  waFollowUpReminder: string
  waControlReminder: string
  waNoAnswer: string

  // Localized sample people
  patientNames: string[]
  doctors: string[]
  waNames: string[]
  patientEmail: string
  tygLabel: string
  vaiLabel: string
  bloodPressure: string
  heartRate: string
  o2sat: string
  labNames: Record<string, string>
}

const es: DemoDict = {
  disclaimer:
    'Demo interactivo: pacientes y datos ficticios, solo para fines ilustrativos · Prototipo de menor fidelidad visual, pensado para mostrar la funcionalidad, no el acabado final',
  clinic: 'Clínica Demo',
  exit: 'Salir del demo',
  exitShort: 'Salir',
  navPanel: 'Panel',
  navCalendar: 'Calendario',
  navUpload: 'Subir Estudios',
  navWhatsApp: 'WhatsApp',
  menu: 'Menú',
  tabs: ['Resumen', 'Antecedentes', 'Signos Vitales', 'InBody', 'Estudios', 'Riesgo', 'Plan', 'Nutrición', 'Act. Física', 'Seguimiento'],
  patients: 'Pacientes',
  searchPlaceholder: 'Buscar paciente...',
  newPatient: '+ Nuevo',
  years: 'años',
  edit: 'Editar',
  backToPatients: 'Pacientes',
  genderF: 'Femenino',
  genderM: 'Masculino',
  condNormal: 'Normal',
  condOverweight: 'Sobrepeso',
  condObesity1: 'Obesidad I',
  noTreatment: 'Sin tratamiento',

  initialWeight: 'Peso inicial',
  currentWeight: 'Peso actual',
  goal: 'Meta',
  firstRecord: 'primer registro · InBody inicial',
  remaining: 'faltan',
  closePanel: 'Cerrar panel',
  openPanel: 'Ver panel de tendencias',
  weightEvolution: 'Evolución de peso',
  weightSources: 'consultas · vitales · InBody',
  goalProgress: 'Progreso a meta',
  fatVsMuscle: 'Grasa vs Músculo',
  visceralFat: 'Grasa visceral',
  visceralSource: 'InBody · nivel de grasa visceral',
  relativeStrength: 'Fuerza relativa',
  strengthSource: 'dinamometría ÷ peso corporal',
  kgActual: 'kg actual',
  obesity: 'Obesidad',
  overweight: 'Sobrepeso',
  normal: 'Normal',
  aiSummary: 'Resumen clínico con IA',
  updated: 'Actualizado',
  clinicalSummary: 'Resumen clínico',
  identifiedProblems: 'Problemas identificados',
  treatmentConsiderations: 'Consideraciones para el tratamiento',
  summaryBody: (p) =>
    `Paciente ${p.gender === 'Femenino' ? 'femenina' : 'masculino'} de ${p.age} años con IMC de ${p.bmi} kg/m², clasificada en ${p.condition.toLowerCase()}. Actualmente en tratamiento con ${p.medication}, con buena tolerancia hasta el momento. La composición corporal más reciente muestra un porcentaje de grasa de 44.5% y grasa visceral en 18, relevantes para el manejo metabólico.`,
  problemInsulin: 'Resistencia a la insulina (HOMA-IR elevado)',
  problemVisceral: 'Grasa visceral elevada',
  considerationsBody:
    'Continuar seguimiento de tolerancia al tratamiento farmacológico actual y reforzar plan de actividad física para mejorar composición corporal.',
  metricFat: '% Grasa',
  metricWater: 'Agua',
  metricFatMass: 'Masa grasa',
  metricMuscleMass: 'Masa músculo',
  metricLeanMass: 'Masa magra',

  personalData: 'Datos personales',
  birthDate: 'Fecha de nacimiento',
  birthDateValue: '14 mar 1996 (29 años)',
  maritalStatus: 'Estado civil',
  maritalValue: 'Soltera',
  occupation: 'Ocupación',
  occupationValue: 'Diseñadora',
  phone: 'Teléfono',
  email: 'Correo',
  city: 'Ciudad',
  cityValue: 'Monterrey, Nuevo León',
  bloodType: 'Grupo sanguíneo',
  anthropometrics: 'Medidas antropométricas',
  height: 'Talla',
  bmi: 'IMC',
  waist: 'Cintura',
  hip: 'Cadera',
  neck: 'Cuello',
  maxWeight: 'Peso máximo',
  minWeight: 'Peso mínimo',
  comorbidities: 'Comorbilidades',
  comorbInsulin: 'Resistencia a la insulina',
  comorbDyslipidemia: 'Dislipidemia mixta',
  priorSurgery: 'Cirugía bariátrica previa',
  noneRegistered: 'Ninguna registrada',
  weightLossAttempts: 'Intentos de pérdida de peso con medicamentos',
  attempt1: 'Orlistat (2023), abandonado por efectos gastrointestinales',
  attempt2: 'Metformina (2024), en combinación con manejo nutricional',

  dynamometry: 'Dinamometría (fuerza de prensión)',
  squats: 'Sentadillas 30s (fuerza de piernas)',
  squatsCutoff: 'corte < 12 reps (edad/sexo)',
  newVitals: 'Nueva toma de signos vitales',
  registerVitals: '+ Registrar toma',
  history: 'Historial',
  takes: 'tomas',
  vitalWeight: 'PESO',

  inbodyAnalysis: 'Análisis InBody',
  uploadPdf: '+ Subir PDF',
  backToList: 'Volver a la lista',
  originalReport: 'Reporte InBody original',
  inbodyScore: 'Puntuación InBody',
  bodyComposition: 'Composición corporal',
  weight: 'Peso',
  bodyFatPct: '% Grasa corporal',
  skeletalMuscle: 'Masa muscular esq.',
  researchParams: 'Parámetros de investigación',
  waistHipRatio: 'Relación cintura/cadera',
  bmr: 'TMB',
  recommendedCalories: 'Calorías recomendadas',
  bodyWater: 'Agua corporal',
  proteins: 'Proteínas',
  minerals: 'Minerales',
  leanMass: 'Masa magra',
  age: 'Edad',
  gender: 'Género',

  studiesCount: 'estudio(s) · del más reciente al más antiguo',
  addFinding: 'Añadir hallazgo',
  addStudy: '+ Añadir estudio',
  viewDetail: 'Ver detalle →',
  labName: 'Laboratorio Clínico San Rafael',
  valuesCount: 'valores',
  more: 'más',
  backToStudies: 'Volver a estudios',
  originalDocument: 'Documento original',
  labHeader: 'LABORATORIO DE ANÁLISIS CLÍNICOS',
  folio: 'Folio',
  date: 'Fecha',
  patientActive: 'Paciente: expediente activo',
  sex: 'Sexo',
  results: 'Resultados',
  editValues: 'Editar valores',
  labMetabolic: 'METABÓLICO',
  labLipids: 'LÍPIDOS',
  labHepatic: 'HEPÁTICO',
  labProteins: 'PROTEÍNAS',
  labRenal: 'RENAL Y ELECTROLITOS',

  riskPanel: 'Panel de riesgo — resumen',
  riskDisclaimer:
    'Calculadoras de apoyo clínico calculadas automáticamente a partir del expediente. No sustituyen el juicio médico.',
  bmiLabel: 'IMC kg/m²',
  framingham: 'Riesgo CV Framingham',
  framinghamNote: 'Bajo (<10%)',
  stopBangNote: 'Riesgo bajo SAOS',
  metabolicSyndrome: 'Synd. Metabólico',
  metabolicNote: 'Componentes presentes',
  findriscNote: 'Moderado (~17%)',
  fliNote: 'Esteatosis probable',
  nafldNote: 'Fibrosis poco probable',
  eossNote: 'Comorbilidades establecidas',
  closeBreakdown: 'Cerrar desglose',
  openBreakdown: 'Desglose de riesgos · ver detalle',
  eossTitle: 'Edmonton Obesity Staging System (EOSS)',
  eossSuggested: 'Sugerido · confirmar',
  eossHint: 'Mostrando la sugerencia automática. Confirma o ajusta; requiere valoración clínica completa.',
  insulinAdiposity: 'Resistencia a la insulina y adiposidad',
  homaNote: 'HOMA-IR elevado (>2.5)',
  tygNote: 'Sin IR (<4.9)',
  vaiNote: 'Adiposidad visceral elevada',
  sarcopeniaScreen: 'Sarcopenia — tamizaje (EWGSOP2)',
  sarcLow: 'Bajo riesgo',
  sarcStrength: 'Fuerza (cargar 4.5 kg)',
  sarcWalk: 'Caminar (cruzar cuarto)',
  sarcChair: 'Levantarse silla/cama',
  sarcStairs: 'Subir 10 escalones',
  sarcNone: 'Ninguna',
  sarcSome: 'Alguna',

  weightGoal: 'Meta de peso',
  nextAppt: 'Próxima cita',
  nextApptValue: '19 sep · 10:00 AM',
  establishedPlan: 'Plan establecido',
  modifyPlan: 'Modificar plan',
  treatmentType: 'Tipo de tratamiento',
  pharmacological: 'Farmacológico',
  medication: 'Medicamento',
  initialDose: 'Dosis inicial',
  startDate: 'Fecha de inicio',
  estimatedTerm: 'Plazo estimado',
  sixMonths: '6 meses',
  doseOverTime: 'Dosis en el tiempo',

  circumferences: 'Circunferencias',
  newMeasures: 'Nueva toma de medidas',
  registerMeasures: '+ Registrar medidas',
  measureNeck: 'Cuello',
  measureArm: 'Brazo',
  measureWaist: 'Cintura',
  measureHip: 'Cadera',
  measureCalf: 'Pantorrilla',
  circ: 'Circunf.',
  measuresPanel: 'Panel de medidas',
  bodyDiagram: 'Diagrama corporal',
  noPreviousData: 'Sin dato previo',

  nextSession: 'Próxima sesión de acondicionamiento',
  nextApptReminder: 'Próxima cita (para recordatorio)',
  inN: 'En N...',
  exactDate: 'Fecha exacta',
  oneWeek: '1 semana',
  twoWeeks: '2 semanas',
  oneMonth: '1 mes',
  other: 'Otro',
  habits: 'Hábitos',
  smoking: 'Tabaquismo',
  vaping: 'Vapeo / cigarro electrónico',
  alcohol: 'Alcohol',
  physicalActivity: 'Actividad física',
  sleepHours: 'Horas de sueño',
  active: 'Activo/a',
  veryActive: 'Muy activo/a',
  occasional: 'Ocasional',
  smokingDetail: '10 cig/semana (fines de semana)',
  vapingDetail: 'diario',
  alcoholDetail: '1-2 cervezas o destilado / semana',
  activityDetail: 'fuerza 5x/sem + cardio 20-30 min',

  newConsult: 'Nueva consulta',
  consultType: 'Tipo de consulta',
  weightKg: 'Peso (kg)',
  auto: 'auto',
  treatmentLine: 'Tratamiento',
  currentDose: 'dosis actual',
  started: 'inicio',
  clinicalNote: 'Nota clínica (evolución, síntomas, efectos secundarios)',
  clinicalNotePlaceholder: 'Evolución, síntomas, efectos secundarios, indicaciones...',
  registerConsult: '+ Registrar consulta',
  consultsAndBaseline: 'consultas + basal',
  today: 'Hoy',
  visitFollowUp: 'Seguimiento',
  visitNutrition: 'Revisión nutricional',
  visitConditioning: 'Acondicionamiento físico',
  visitNote1:
    'Paciente referida para plan de entrenamiento, inicia tx con GLP-1. Refiere ir al gimnasio 5/7, rutina de fuerza 80 min y cardio ocasional 20-30 minutos.',
  visitNote2: 'Buena tolerancia al tratamiento. Sin efectos adversos reportados.',
  visitNote3: 'Consulta inicial. Se establece plan de tratamiento.',

  calDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  calMonth: 'Septiembre 2026',
  calToday: 'Hoy',
  calTodayLabel: 'Hoy · 12 sep',
  apptsScheduled: 'citas agendadas',
  apptInitial: 'Consulta inicial',

  uploadTitle: 'Subir Estudios de Laboratorio',
  uploadSub:
    'Sube el PDF del laboratorio o la foto del ticket de báscula InBody para extraer automáticamente los valores del expediente del paciente.',
  activePatient: 'Paciente activo',
  change: 'Cambiar',
  dropHere: 'Arrastra un PDF o imagen aquí',
  orClick: 'o haz clic para seleccionar un archivo',
  recentUploads: 'Subidas recientes',
  processed: 'Procesado',
  inReview: 'En revisión',

  waConnected: 'WhatsApp conectado',
  waConfirmations: 'Confirmaciones de cita',
  waReminders: 'Recordatorios (VIBs)',
  waPayments: 'Seguimiento de pagos',
  waNeedsAttention: 'Necesita atención',
  waDisabled: 'Desactivado',
  waComingSoon: 'Disponible próximamente para tu clínica.',
  waSent: 'Enviado',
  waPending: 'Pendiente',
  waApptTomorrow: 'Cita mañana, 5:00 PM',
  waAppt2Days: 'Cita en 2 días, 9:00 AM',
  waAppt7Days: 'Cita en 7 días, 11:00 AM',
  waFollowUpReminder: 'Recordatorio de seguimiento',
  waControlReminder: 'Recordatorio de control',
  waNoAnswer: 'No respondió tras 2 intentos',

  patientNames: [
    'Debany Montserrat Luevano Contreras', 'Mitzy Lilian Gervacci Zazueta', 'Silvia Alejandra Martínez Villa',
    'Eduar Yossimar Martínez Flores', 'Sergio Javier Bustamante García', 'Martha Patricia Balderas García',
    'Valeria Guadalupe Leos Palomo', 'Leticia Lagunes Ortiz', 'Alan Alejandro Charles Salas',
    'Diana Laura Arredondo Castillo', 'Adriana Charbel Sosa Ramírez', 'Consuelo Margarita Cortez Sanchez',
  ],
  doctors: ['Dra. Elena Reyes', 'Dr. Mauricio Solís', 'Dra. Camila Torres'],
  waNames: ['Ana Paola Ibarra', 'Roberto Salinas', 'Miguel Torres'],
  tygLabel: 'Índice TyG',
  vaiLabel: 'Índice VAI',
  bloodPressure: 'Presión arterial',
  heartRate: 'Frecuencia cardíaca',
  o2sat: 'Saturación O₂',
  labNames: {
    Glucosa: 'Glucosa', Insulina: 'Insulina', 'Ác. Úrico': 'Ác. Úrico',
    'Col. Total': 'Col. Total', 'Col. No-HDL': 'Col. No-HDL', 'Triglicéridos': 'Triglicéridos',
    'Fosfatasa Alc.': 'Fosfatasa Alc.', 'Bili. Total': 'Bili. Total',
    'Albúmina': 'Albúmina', Globulinas: 'Globulinas', 'Proteínas Tot.': 'Proteínas Tot.',
    Urea: 'Urea', Creatinina: 'Creatinina', Sodio: 'Sodio', Potasio: 'Potasio', Calcio: 'Calcio',
  },
  patientEmail: 'debany.luevano@correo.com',
}

const en: DemoDict = {
  ...es,
  disclaimer:
    'Interactive demo: fictional patients and data, for illustration only · Lower-fidelity prototype, meant to show functionality, not the final finish',
  clinic: 'Demo Clinic',
  exit: 'Exit demo',
  exitShort: 'Exit',
  navPanel: 'Dashboard',
  navCalendar: 'Calendar',
  navUpload: 'Upload Studies',
  menu: 'Menu',
  tabs: ['Summary', 'History', 'Vital Signs', 'InBody', 'Studies', 'Risk', 'Plan', 'Nutrition', 'Activity', 'Follow-up'],
  patients: 'Patients',
  searchPlaceholder: 'Search patient...',
  newPatient: '+ New',
  years: 'years',
  edit: 'Edit',
  backToPatients: 'Patients',
  genderF: 'Female',
  genderM: 'Male',
  condNormal: 'Normal',
  condOverweight: 'Overweight',
  condObesity1: 'Obesity I',
  noTreatment: 'No treatment',

  initialWeight: 'Initial weight',
  currentWeight: 'Current weight',
  goal: 'Goal',
  firstRecord: 'first record · initial InBody',
  remaining: 'remaining',
  closePanel: 'Close panel',
  openPanel: 'Show trend panel',
  weightEvolution: 'Weight evolution',
  weightSources: 'visits · vitals · InBody',
  goalProgress: 'Progress to goal',
  fatVsMuscle: 'Fat vs Muscle',
  visceralFat: 'Visceral fat',
  visceralSource: 'InBody · visceral fat level',
  relativeStrength: 'Relative strength',
  strengthSource: 'grip strength ÷ body weight',
  kgActual: 'kg current',
  obesity: 'Obesity',
  overweight: 'Overweight',
  normal: 'Normal',
  aiSummary: 'AI clinical summary',
  updated: 'Updated',
  clinicalSummary: 'Clinical summary',
  identifiedProblems: 'Identified problems',
  treatmentConsiderations: 'Treatment considerations',
  summaryBody: (p) =>
    `${p.gender === 'Female' ? 'Female' : 'Male'} patient, ${p.age} years old, BMI ${p.bmi} kg/m², classified as ${p.condition.toLowerCase()}. Currently on ${p.medication}, well tolerated so far. The most recent body composition shows 44.5% body fat and visceral fat at 18, both relevant to metabolic management.`,
  problemInsulin: 'Insulin resistance (elevated HOMA-IR)',
  problemVisceral: 'Elevated visceral fat',
  considerationsBody:
    'Continue monitoring tolerance to the current pharmacological treatment and reinforce the physical activity plan to improve body composition.',
  metricFat: '% Fat',
  metricWater: 'Water',
  metricFatMass: 'Fat mass',
  metricMuscleMass: 'Muscle mass',
  metricLeanMass: 'Lean mass',

  personalData: 'Personal data',
  birthDate: 'Date of birth',
  birthDateValue: '14 Mar 1996 (29 years)',
  maritalStatus: 'Marital status',
  maritalValue: 'Single',
  occupation: 'Occupation',
  occupationValue: 'Designer',
  phone: 'Phone',
  email: 'Email',
  city: 'City',
  cityValue: 'Monterrey, Nuevo León',
  bloodType: 'Blood type',
  anthropometrics: 'Anthropometric measurements',
  height: 'Height',
  bmi: 'BMI',
  waist: 'Waist',
  hip: 'Hip',
  neck: 'Neck',
  maxWeight: 'Max weight',
  minWeight: 'Min weight',
  comorbidities: 'Comorbidities',
  comorbInsulin: 'Insulin resistance',
  comorbDyslipidemia: 'Mixed dyslipidemia',
  priorSurgery: 'Previous bariatric surgery',
  noneRegistered: 'None recorded',
  weightLossAttempts: 'Previous weight-loss medication attempts',
  attempt1: 'Orlistat (2023), discontinued due to gastrointestinal effects',
  attempt2: 'Metformin (2024), combined with nutritional management',

  dynamometry: 'Dynamometry (grip strength)',
  squats: '30s squats (leg strength)',
  squatsCutoff: 'cutoff < 12 reps (age/sex)',
  newVitals: 'New vital signs reading',
  registerVitals: '+ Record reading',
  history: 'History',
  takes: 'readings',
  vitalWeight: 'WEIGHT',

  inbodyAnalysis: 'InBody analysis',
  uploadPdf: '+ Upload PDF',
  backToList: 'Back to list',
  originalReport: 'Original InBody report',
  inbodyScore: 'InBody score',
  bodyComposition: 'Body composition',
  weight: 'Weight',
  bodyFatPct: '% Body fat',
  skeletalMuscle: 'Skeletal muscle mass',
  researchParams: 'Research parameters',
  waistHipRatio: 'Waist/hip ratio',
  bmr: 'BMR',
  recommendedCalories: 'Recommended calories',
  bodyWater: 'Body water',
  proteins: 'Proteins',
  minerals: 'Minerals',
  leanMass: 'Lean mass',
  age: 'Age',
  gender: 'Sex',

  studiesCount: 'study(ies) · newest to oldest',
  addFinding: 'Add finding',
  addStudy: '+ Add study',
  viewDetail: 'View detail →',
  labName: 'San Rafael Clinical Laboratory',
  valuesCount: 'values',
  more: 'more',
  backToStudies: 'Back to studies',
  originalDocument: 'Original document',
  labHeader: 'CLINICAL ANALYSIS LABORATORY',
  folio: 'Ref',
  date: 'Date',
  patientActive: 'Patient: active record',
  sex: 'Sex',
  results: 'Results',
  editValues: 'Edit values',
  labMetabolic: 'METABOLIC',
  labLipids: 'LIPIDS',
  labHepatic: 'HEPATIC',
  labProteins: 'PROTEINS',
  labRenal: 'RENAL & ELECTROLYTES',

  riskPanel: 'Risk panel — summary',
  riskDisclaimer:
    'Clinical support calculators computed automatically from the record. They do not replace clinical judgement.',
  bmiLabel: 'BMI kg/m²',
  framingham: 'Framingham CV risk',
  framinghamNote: 'Low (<10%)',
  stopBangNote: 'Low OSA risk',
  metabolicSyndrome: 'Metabolic syndrome',
  metabolicNote: 'Components present',
  findriscNote: 'Moderate (~17%)',
  fliNote: 'Steatosis likely',
  nafldNote: 'Fibrosis unlikely',
  eossNote: 'Established comorbidities',
  closeBreakdown: 'Close breakdown',
  openBreakdown: 'Risk breakdown · view detail',
  eossTitle: 'Edmonton Obesity Staging System (EOSS)',
  eossSuggested: 'Suggested · confirm',
  eossHint: 'Showing the automatic suggestion. Confirm or adjust; requires full clinical assessment.',
  insulinAdiposity: 'Insulin resistance and adiposity',
  homaNote: 'Elevated HOMA-IR (>2.5)',
  tygNote: 'No IR (<4.9)',
  vaiNote: 'Elevated visceral adiposity',
  sarcopeniaScreen: 'Sarcopenia — screening (EWGSOP2)',
  sarcLow: 'Low risk',
  sarcStrength: 'Strength (lift 4.5 kg)',
  sarcWalk: 'Walking (cross a room)',
  sarcChair: 'Rising from chair/bed',
  sarcStairs: 'Climbing 10 stairs',
  sarcNone: 'None',
  sarcSome: 'Some',

  weightGoal: 'Weight goal',
  nextAppt: 'Next appointment',
  nextApptValue: '19 Sep · 10:00 AM',
  establishedPlan: 'Established plan',
  modifyPlan: 'Modify plan',
  treatmentType: 'Treatment type',
  pharmacological: 'Pharmacological',
  medication: 'Medication',
  initialDose: 'Initial dose',
  startDate: 'Start date',
  estimatedTerm: 'Estimated term',
  sixMonths: '6 months',
  doseOverTime: 'Dose over time',

  circumferences: 'Circumferences',
  newMeasures: 'New measurements',
  registerMeasures: '+ Record measurements',
  measureNeck: 'Neck',
  measureArm: 'Arm',
  measureWaist: 'Waist',
  measureHip: 'Hip',
  measureCalf: 'Calf',
  circ: 'Circ.',
  measuresPanel: 'Measurements panel',
  bodyDiagram: 'Body diagram',
  noPreviousData: 'No previous data',

  nextSession: 'Next conditioning session',
  nextApptReminder: 'Next appointment (for reminder)',
  inN: 'In N...',
  exactDate: 'Exact date',
  oneWeek: '1 week',
  twoWeeks: '2 weeks',
  oneMonth: '1 month',
  other: 'Other',
  habits: 'Habits',
  smoking: 'Smoking',
  vaping: 'Vaping / e-cigarette',
  alcohol: 'Alcohol',
  physicalActivity: 'Physical activity',
  sleepHours: 'Hours of sleep',
  active: 'Active',
  veryActive: 'Very active',
  occasional: 'Occasional',
  smokingDetail: '10 cig/week (weekends)',
  vapingDetail: 'daily',
  alcoholDetail: '1-2 beers or spirits / week',
  activityDetail: 'strength 5x/wk + cardio 20-30 min',

  newConsult: 'New visit',
  consultType: 'Visit type',
  weightKg: 'Weight (kg)',
  auto: 'auto',
  treatmentLine: 'Treatment',
  currentDose: 'current dose',
  started: 'started',
  clinicalNote: 'Clinical note (progress, symptoms, side effects)',
  clinicalNotePlaceholder: 'Progress, symptoms, side effects, instructions...',
  registerConsult: '+ Record visit',
  consultsAndBaseline: 'visits + baseline',
  today: 'Today',
  visitFollowUp: 'Follow-up',
  visitNutrition: 'Nutrition review',
  visitConditioning: 'Physical conditioning',
  visitNote1:
    'Patient referred for a training plan, starting GLP-1 treatment. Reports going to the gym 5/7, 80 min strength routine and occasional 20-30 min cardio.',
  visitNote2: 'Good tolerance to treatment. No adverse effects reported.',
  visitNote3: 'Initial visit. Treatment plan established.',

  calDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  calMonth: 'September 2026',
  calToday: 'Today',
  calTodayLabel: 'Today · 12 Sep',
  apptsScheduled: 'appointments scheduled',
  apptInitial: 'Initial consultation',

  uploadTitle: 'Upload Laboratory Studies',
  uploadSub:
    'Upload the lab PDF or a photo of the InBody scale ticket to automatically extract the values into the patient record.',
  activePatient: 'Active patient',
  change: 'Change',
  dropHere: 'Drag a PDF or image here',
  orClick: 'or click to select a file',
  recentUploads: 'Recent uploads',
  processed: 'Processed',
  inReview: 'In review',

  waConnected: 'WhatsApp connected',
  waConfirmations: 'Appointment confirmations',
  waReminders: 'Reminders (VIBs)',
  waPayments: 'Payment follow-up',
  waNeedsAttention: 'Needs attention',
  waDisabled: 'Disabled',
  waComingSoon: 'Coming soon for your clinic.',
  waSent: 'Sent',
  waPending: 'Pending',
  waApptTomorrow: 'Appointment tomorrow, 5:00 PM',
  waAppt2Days: 'Appointment in 2 days, 9:00 AM',
  waAppt7Days: 'Appointment in 7 days, 11:00 AM',
  waFollowUpReminder: 'Follow-up reminder',
  waControlReminder: 'Check-up reminder',
  waNoAnswer: 'No reply after 2 attempts',

  tygLabel: 'TyG index',
  vaiLabel: 'VAI index',
  bloodPressure: 'Blood pressure',
  heartRate: 'Heart rate',
  o2sat: 'O₂ saturation',
  labNames: {
    Glucosa: 'Glucose', Insulina: 'Insulin', 'Ác. Úrico': 'Uric acid',
    'Col. Total': 'Total chol.', 'Col. No-HDL': 'Non-HDL chol.', 'Triglicéridos': 'Triglycerides',
    'Fosfatasa Alc.': 'Alk. phosphatase', 'Bili. Total': 'Total bilirubin',
    'Albúmina': 'Albumin', Globulinas: 'Globulins', 'Proteínas Tot.': 'Total protein',
    Urea: 'Urea', Creatinina: 'Creatinine', Sodio: 'Sodium', Potasio: 'Potassium', Calcio: 'Calcium',
  },
  patientEmail: 'debany.luevano@email.com',
}

const pt: DemoDict = {
  ...es,
  disclaimer:
    'Demo interativo: pacientes e dados fictícios, apenas para fins ilustrativos · Protótipo de menor fidelidade visual, feito para mostrar a funcionalidade, não o acabamento final',
  clinic: 'Clínica Demo',
  exit: 'Sair do demo',
  exitShort: 'Sair',
  navPanel: 'Painel',
  navCalendar: 'Agenda',
  navUpload: 'Enviar Exames',
  menu: 'Menu',
  tabs: ['Resumo', 'Antecedentes', 'Sinais Vitais', 'InBody', 'Exames', 'Risco', 'Plano', 'Nutrição', 'Ativ. Física', 'Acompanhamento'],
  patients: 'Pacientes',
  searchPlaceholder: 'Buscar paciente...',
  newPatient: '+ Novo',
  years: 'anos',
  edit: 'Editar',
  backToPatients: 'Pacientes',
  genderF: 'Feminino',
  genderM: 'Masculino',
  condNormal: 'Normal',
  condOverweight: 'Sobrepeso',
  condObesity1: 'Obesidade I',
  noTreatment: 'Sem tratamento',

  initialWeight: 'Peso inicial',
  currentWeight: 'Peso atual',
  goal: 'Meta',
  firstRecord: 'primeiro registro · InBody inicial',
  remaining: 'faltam',
  closePanel: 'Fechar painel',
  openPanel: 'Ver painel de tendências',
  weightEvolution: 'Evolução de peso',
  weightSources: 'consultas · sinais vitais · InBody',
  goalProgress: 'Progresso até a meta',
  fatVsMuscle: 'Gordura vs Músculo',
  visceralFat: 'Gordura visceral',
  visceralSource: 'InBody · nível de gordura visceral',
  relativeStrength: 'Força relativa',
  strengthSource: 'dinamometria ÷ peso corporal',
  kgActual: 'kg atual',
  obesity: 'Obesidade',
  overweight: 'Sobrepeso',
  normal: 'Normal',
  aiSummary: 'Resumo clínico com IA',
  updated: 'Atualizado',
  clinicalSummary: 'Resumo clínico',
  identifiedProblems: 'Problemas identificados',
  treatmentConsiderations: 'Considerações para o tratamento',
  summaryBody: (p) =>
    `Paciente ${p.gender === 'Feminino' ? 'do sexo feminino' : 'do sexo masculino'} de ${p.age} anos com IMC de ${p.bmi} kg/m², classificada em ${p.condition.toLowerCase()}. Atualmente em tratamento com ${p.medication}, com boa tolerância até o momento. A composição corporal mais recente mostra percentual de gordura de 44,5% e gordura visceral em 18, relevantes para o manejo metabólico.`,
  problemInsulin: 'Resistência à insulina (HOMA-IR elevado)',
  problemVisceral: 'Gordura visceral elevada',
  considerationsBody:
    'Manter o acompanhamento da tolerância ao tratamento farmacológico atual e reforçar o plano de atividade física para melhorar a composição corporal.',
  metricFat: '% Gordura',
  metricWater: 'Água',
  metricFatMass: 'Massa gorda',
  metricMuscleMass: 'Massa muscular',
  metricLeanMass: 'Massa magra',

  personalData: 'Dados pessoais',
  birthDate: 'Data de nascimento',
  birthDateValue: '14 mar 1996 (29 anos)',
  maritalStatus: 'Estado civil',
  maritalValue: 'Solteira',
  occupation: 'Profissão',
  occupationValue: 'Designer',
  phone: 'Telefone',
  email: 'E-mail',
  city: 'Cidade',
  cityValue: 'São Paulo, SP',
  bloodType: 'Tipo sanguíneo',
  anthropometrics: 'Medidas antropométricas',
  height: 'Altura',
  bmi: 'IMC',
  waist: 'Cintura',
  hip: 'Quadril',
  neck: 'Pescoço',
  maxWeight: 'Peso máximo',
  minWeight: 'Peso mínimo',
  comorbidities: 'Comorbidades',
  comorbInsulin: 'Resistência à insulina',
  comorbDyslipidemia: 'Dislipidemia mista',
  priorSurgery: 'Cirurgia bariátrica prévia',
  noneRegistered: 'Nenhuma registrada',
  weightLossAttempts: 'Tentativas de perda de peso com medicamentos',
  attempt1: 'Orlistate (2023), abandonado por efeitos gastrointestinais',
  attempt2: 'Metformina (2024), em combinação com manejo nutricional',

  dynamometry: 'Dinamometria (força de preensão)',
  squats: 'Agachamentos 30s (força de pernas)',
  squatsCutoff: 'corte < 12 reps (idade/sexo)',
  newVitals: 'Nova aferição de sinais vitais',
  registerVitals: '+ Registrar aferição',
  history: 'Histórico',
  takes: 'aferições',
  vitalWeight: 'PESO',

  inbodyAnalysis: 'Análise InBody',
  uploadPdf: '+ Enviar PDF',
  backToList: 'Voltar à lista',
  originalReport: 'Relatório InBody original',
  inbodyScore: 'Pontuação InBody',
  bodyComposition: 'Composição corporal',
  weight: 'Peso',
  bodyFatPct: '% Gordura corporal',
  skeletalMuscle: 'Massa muscular esq.',
  researchParams: 'Parâmetros de pesquisa',
  waistHipRatio: 'Relação cintura/quadril',
  bmr: 'TMB',
  recommendedCalories: 'Calorias recomendadas',
  bodyWater: 'Água corporal',
  proteins: 'Proteínas',
  minerals: 'Minerais',
  leanMass: 'Massa magra',
  age: 'Idade',
  gender: 'Sexo',

  studiesCount: 'exame(s) · do mais recente ao mais antigo',
  addFinding: 'Adicionar achado',
  addStudy: '+ Adicionar exame',
  viewDetail: 'Ver detalhe →',
  labName: 'Laboratório Clínico São Rafael',
  valuesCount: 'valores',
  more: 'mais',
  backToStudies: 'Voltar aos exames',
  originalDocument: 'Documento original',
  labHeader: 'LABORATÓRIO DE ANÁLISES CLÍNICAS',
  folio: 'Protocolo',
  date: 'Data',
  patientActive: 'Paciente: prontuário ativo',
  sex: 'Sexo',
  results: 'Resultados',
  editValues: 'Editar valores',
  labMetabolic: 'METABÓLICO',
  labLipids: 'LÍPIDES',
  labHepatic: 'HEPÁTICO',
  labProteins: 'PROTEÍNAS',
  labRenal: 'RENAL E ELETRÓLITOS',

  riskPanel: 'Painel de risco — resumo',
  riskDisclaimer:
    'Calculadoras de apoio clínico calculadas automaticamente a partir do prontuário. Não substituem o julgamento médico.',
  bmiLabel: 'IMC kg/m²',
  framingham: 'Risco CV Framingham',
  framinghamNote: 'Baixo (<10%)',
  stopBangNote: 'Risco baixo de AOS',
  metabolicSyndrome: 'Sínd. Metabólica',
  metabolicNote: 'Componentes presentes',
  findriscNote: 'Moderado (~17%)',
  fliNote: 'Esteatose provável',
  nafldNote: 'Fibrose pouco provável',
  eossNote: 'Comorbidades estabelecidas',
  closeBreakdown: 'Fechar detalhamento',
  openBreakdown: 'Detalhamento de riscos · ver detalhe',
  eossTitle: 'Edmonton Obesity Staging System (EOSS)',
  eossSuggested: 'Sugerido · confirmar',
  eossHint: 'Mostrando a sugestão automática. Confirme ou ajuste; requer avaliação clínica completa.',
  insulinAdiposity: 'Resistência à insulina e adiposidade',
  homaNote: 'HOMA-IR elevado (>2,5)',
  tygNote: 'Sem RI (<4,9)',
  vaiNote: 'Adiposidade visceral elevada',
  sarcopeniaScreen: 'Sarcopenia — rastreio (EWGSOP2)',
  sarcLow: 'Baixo risco',
  sarcStrength: 'Força (carregar 4,5 kg)',
  sarcWalk: 'Caminhar (atravessar o cômodo)',
  sarcChair: 'Levantar da cadeira/cama',
  sarcStairs: 'Subir 10 degraus',
  sarcNone: 'Nenhuma',
  sarcSome: 'Alguma',

  weightGoal: 'Meta de peso',
  nextAppt: 'Próxima consulta',
  nextApptValue: '19 set · 10:00',
  establishedPlan: 'Plano estabelecido',
  modifyPlan: 'Modificar plano',
  treatmentType: 'Tipo de tratamento',
  pharmacological: 'Farmacológico',
  medication: 'Medicamento',
  initialDose: 'Dose inicial',
  startDate: 'Data de início',
  estimatedTerm: 'Prazo estimado',
  sixMonths: '6 meses',
  doseOverTime: 'Dose ao longo do tempo',

  circumferences: 'Circunferências',
  newMeasures: 'Nova aferição de medidas',
  registerMeasures: '+ Registrar medidas',
  measureNeck: 'Pescoço',
  measureArm: 'Braço',
  measureWaist: 'Cintura',
  measureHip: 'Quadril',
  measureCalf: 'Panturrilha',
  circ: 'Circunf.',
  measuresPanel: 'Painel de medidas',
  bodyDiagram: 'Diagrama corporal',
  noPreviousData: 'Sem dado anterior',

  nextSession: 'Próxima sessão de condicionamento',
  nextApptReminder: 'Próxima consulta (para lembrete)',
  inN: 'Em N...',
  exactDate: 'Data exata',
  oneWeek: '1 semana',
  twoWeeks: '2 semanas',
  oneMonth: '1 mês',
  other: 'Outro',
  habits: 'Hábitos',
  smoking: 'Tabagismo',
  vaping: 'Vape / cigarro eletrônico',
  alcohol: 'Álcool',
  physicalActivity: 'Atividade física',
  sleepHours: 'Horas de sono',
  active: 'Ativo/a',
  veryActive: 'Muito ativo/a',
  occasional: 'Ocasional',
  smokingDetail: '10 cig/semana (fins de semana)',
  vapingDetail: 'diário',
  alcoholDetail: '1-2 cervejas ou destilado / semana',
  activityDetail: 'força 5x/sem + cardio 20-30 min',

  newConsult: 'Nova consulta',
  consultType: 'Tipo de consulta',
  weightKg: 'Peso (kg)',
  auto: 'auto',
  treatmentLine: 'Tratamento',
  currentDose: 'dose atual',
  started: 'início',
  clinicalNote: 'Nota clínica (evolução, sintomas, efeitos colaterais)',
  clinicalNotePlaceholder: 'Evolução, sintomas, efeitos colaterais, orientações...',
  registerConsult: '+ Registrar consulta',
  consultsAndBaseline: 'consultas + basal',
  today: 'Hoje',
  visitFollowUp: 'Acompanhamento',
  visitNutrition: 'Revisão nutricional',
  visitConditioning: 'Condicionamento físico',
  visitNote1:
    'Paciente encaminhada para plano de treino, inicia tratamento com GLP-1. Relata ir à academia 5/7, rotina de força de 80 min e cardio ocasional de 20-30 minutos.',
  visitNote2: 'Boa tolerância ao tratamento. Sem efeitos adversos relatados.',
  visitNote3: 'Consulta inicial. Plano de tratamento estabelecido.',

  calDays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  calMonth: 'Setembro 2026',
  calToday: 'Hoje',
  calTodayLabel: 'Hoje · 12 set',
  apptsScheduled: 'consultas agendadas',
  apptInitial: 'Primeira consulta',

  uploadTitle: 'Enviar Exames Laboratoriais',
  uploadSub:
    'Envie o PDF do laboratório ou a foto do ticket da balança InBody para extrair automaticamente os valores para o prontuário do paciente.',
  activePatient: 'Paciente ativo',
  change: 'Alterar',
  dropHere: 'Arraste um PDF ou imagem aqui',
  orClick: 'ou clique para selecionar um arquivo',
  recentUploads: 'Envios recentes',
  processed: 'Processado',
  inReview: 'Em revisão',

  waConnected: 'WhatsApp conectado',
  waConfirmations: 'Confirmações de consulta',
  waReminders: 'Lembretes (VIBs)',
  waPayments: 'Acompanhamento de pagamentos',
  waNeedsAttention: 'Precisa de atenção',
  waDisabled: 'Desativado',
  waComingSoon: 'Em breve para a sua clínica.',
  waSent: 'Enviado',
  waPending: 'Pendente',
  waApptTomorrow: 'Consulta amanhã, 17:00',
  waAppt2Days: 'Consulta em 2 dias, 09:00',
  waAppt7Days: 'Consulta em 7 dias, 11:00',
  waFollowUpReminder: 'Lembrete de acompanhamento',
  waControlReminder: 'Lembrete de retorno',
  waNoAnswer: 'Não respondeu após 2 tentativas',

  patientNames: [
    'Ana Paula Ribeiro Carvalho', 'Mariana Gonçalves Azevedo', 'Patrícia Almeida Rocha',
    'Eduardo Martins Figueiredo', 'Sérgio Bastos Nogueira', 'Marta Siqueira Barbosa',
    'Valéria Pimentel Moraes', 'Letícia Lagoas Teixeira', 'Alan Cardoso Salles',
    'Daniela Arruda Castilho', 'Adriana Sousa Ramires', 'Consuelo Cortez Sanches',
  ],
  doctors: ['Dra. Elena Reis', 'Dr. Maurício Solis', 'Dra. Camila Torres'],
  waNames: ['Ana Paula Ibarra', 'Roberto Salgado', 'Miguel Tavares'],
  tygLabel: 'Índice TyG',
  vaiLabel: 'Índice VAI',
  bloodPressure: 'Pressão arterial',
  heartRate: 'Frequência cardíaca',
  o2sat: 'Saturação de O₂',
  labNames: {
    Glucosa: 'Glicose', Insulina: 'Insulina', 'Ác. Úrico': 'Ácido úrico',
    'Col. Total': 'Col. Total', 'Col. No-HDL': 'Col. Não-HDL', 'Triglicéridos': 'Triglicerídeos',
    'Fosfatasa Alc.': 'Fosfatase Alc.', 'Bili. Total': 'Bilirrubina Total',
    'Albúmina': 'Albumina', Globulinas: 'Globulinas', 'Proteínas Tot.': 'Proteínas Tot.',
    Urea: 'Ureia', Creatinina: 'Creatinina', Sodio: 'Sódio', Potasio: 'Potássio', Calcio: 'Cálcio',
  },
  patientEmail: 'ana.ribeiro@email.com',
}

export const DEMO_T: Record<DemoLang, DemoDict> = { es, en, pt }

// Context so the ~20 demo components can read translations without the whole
// file turning into prop drilling.
export const DemoTContext = createContext<DemoDict>(es)
export const useT = () => useContext(DemoTContext)

export function isDemoLang(v: string | null): v is DemoLang {
  return v === 'es' || v === 'en' || v === 'pt'
}
