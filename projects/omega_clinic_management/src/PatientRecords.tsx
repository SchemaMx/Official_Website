import { useState } from "react";

const TABS = [
  "Resumen", "Antecedentes", "Signos Vitales", "InBody",
  "Estudios", "Riesgo", "Plan", "Nutrición", "Seguimiento",
];

const PATIENTS = [
  { id: 1, initials: "DL", name: "Debany Montserrat Luevano Contreras", age: 29, gender: "Femenino", bmi: 30.9, condition: "Obesidad I", color: "#1ab89a" },
  { id: 2, initials: "MG", name: "Mitzy Lilian Gervacci Zazueta", age: 34, gender: "Femenino", bmi: 27.4, condition: "Sobrepeso", color: "#3ab8c8" },
  { id: 3, initials: "SM", name: "Silvia Alejandra Martínez Villa", age: 38, gender: "Femenino", bmi: 25.1, condition: "Normal", color: "#1ab89a" },
  { id: 4, initials: "EM", name: "Eduar Yossimar Martínez Flores", age: 39, gender: "Masculino", bmi: 28.8, condition: "Sobrepeso", color: "#3ab8c8" },
  { id: 5, initials: "SB", name: "Sergio Javier Bustamante García", age: 54, gender: "Masculino", bmi: 32.1, condition: "Obesidad I", color: "#1ab89a" },
  { id: 6, initials: "MB", name: "Martha Patricia Balderas García", age: 53, gender: "Femenino", bmi: 31.4, condition: "Obesidad I", color: "#3ab8c8" },
  { id: 7, initials: "VL", name: "Valeria Guadalupe Leos Palomo", age: 46, gender: "Femenino", bmi: 29.3, condition: "Sobrepeso", color: "#1ab89a" },
  { id: 8, initials: "LL", name: "Leticia Lagunes Ortiz", age: 42, gender: "Femenino", bmi: 26.8, condition: "Sobrepeso", color: "#3ab8c8" },
  { id: 9, initials: "AC", name: "Alan Alejandro Charles Salas", age: 27, gender: "Masculino", bmi: 24.2, condition: "Normal", color: "#1ab89a" },
  { id: 10, initials: "DA", name: "Diana Laura Arredondo Castillo", age: 29, gender: "Femenino", bmi: 28.0, condition: "Sobrepeso", color: "#3ab8c8" },
  { id: 11, initials: "AS", name: "Adriana Charbel Sosa Ramírez", age: 30, gender: "Femenino", bmi: 30.2, condition: "Obesidad I", color: "#1ab89a" },
  { id: 12, initials: "CC", name: "Consuelo Margarita Cortez Sanchez", age: 29, gender: "Femenino", bmi: 31.8, condition: "Obesidad I", color: "#3ab8c8" },
];

// Weight data points over time
const WEIGHT_DATA = [
  { date: "13 ago", weight: 81.0 },
  { date: "20 ago", weight: 80.4 },
  { date: "29 ago", weight: 79.8 },
  { date: "5 sep", weight: 79.5 },
];

// InBody data over time
const INBODY_DATA = [
  { date: "13 ago", fat: 45.8, muscle: 30.1 },
  { date: "29 ago", fat: 45.1, muscle: 30.3 },
  { date: "5 sep", fat: 44.5, muscle: 30.3 },
];

const INBODY_METRICS = [
  { label: "Masa grasa", value: "35.4 kg", ref: "18–28 kg", status: "high" },
  { label: "Masa muscular", value: "24.1 kg", ref: "21–31 kg", status: "ok" },
  { label: "Agua corporal", value: "33.6 L", ref: "29–38 L", status: "ok" },
  { label: "Masa magra", value: "44.1 kg", ref: "39–53 kg", status: "ok" },
  { label: "Grasa visceral", value: "18", ref: "< 10", status: "high" },
  { label: "Fuerza relativa", value: "0.31", ref: "> 0.40", status: "low" },
];

const ESTUDIOS = [
  {
    type: "Laboratorio",
    name: "Biometría Hemática Completa",
    date: "3 sep 2026",
    status: "Disponible",
    notes: "Hemoglobina 13.2 g/dL, leucocitos 6,400/μL, plaquetas 248,000/μL. Valores dentro de parámetros normales.",
  },
  {
    type: "Laboratorio",
    name: "Química Sanguínea",
    date: "3 sep 2026",
    status: "Disponible",
    notes: "Glucosa 92 mg/dL, creatinina 0.8 mg/dL, urea 28 mg/dL. Sin alteraciones significativas.",
  },
  {
    type: "Imagen",
    name: "Ultrasonido Abdominal",
    date: "29 ago 2026",
    status: "Disponible",
    notes: "Hígado con leve esteatosis grado I. Vesícula biliar sin litiasis. Páncreas, riñones y bazo normales.",
  },
  {
    type: "Laboratorio",
    name: "Perfil Lipídico",
    date: "13 ago 2026",
    status: "Transcrito",
    notes: "Colesterol total 198 mg/dL, HDL 48 mg/dL, LDL 128 mg/dL, triglicéridos 165 mg/dL.",
  },
];

const VITALS = [
  { label: "Presión arterial", value: "118/76", unit: "mmHg", ok: true },
  { label: "Frecuencia cardíaca", value: "74", unit: "bpm", ok: true },
  { label: "Temperatura", value: "36.6", unit: "°C", ok: true },
  { label: "Saturación O₂", value: "98", unit: "%", ok: true },
  { label: "Glucosa", value: "92", unit: "mg/dL", ok: true },
  { label: "Peso", value: "79.5", unit: "kg", ok: true },
];

// --- Mini line chart using SVG ---
function LineChart({ data, color = "#1ab89a" }: { data: { date: string; weight: number }[]; color?: string }) {
  const W = 340, H = 100, PAD = 16;
  const min = Math.min(...data.map((d) => d.weight)) - 0.5;
  const max = Math.max(...data.map((d) => d.weight)) + 0.5;
  const x = (i: number) => PAD + (i / (data.length - 1)) * (W - PAD * 2);
  const y = (v: number) => PAD + ((max - v) / (max - min)) * (H - PAD * 2);
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.weight)}`).join(" ");
  const area = `${path} L${x(data.length - 1)},${H} L${x(0)},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 100 }}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lg)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.weight)} r="4" fill="white" stroke={color} strokeWidth="2" />
          <text x={x(i)} y={H - 2} textAnchor="middle" fontSize="9" fill="#8aada9" fontFamily="'DM Mono', monospace">
            {d.date}
          </text>
          <text x={x(i)} y={y(d.weight) - 8} textAnchor="middle" fontSize="9" fill={color} fontFamily="'DM Mono', monospace" fontWeight="500">
            {d.weight}
          </text>
        </g>
      ))}
    </svg>
  );
}

// --- Goal progress bar ---
function GoalBar({ current, initial, goal }: { current: number; initial: number; goal: number }) {
  const pct = Math.min(100, ((initial - current) / (initial - goal)) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-[#8aada9] mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
        <span>Inicial {initial} kg</span>
        <span>Meta {goal} kg</span>
      </div>
      <div className="relative h-3 rounded-full bg-[#f0faf7] overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#1ab89a] to-[#3ab8c8] transition-all"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#0e1c1a]/20"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-[#1ab89a] font-semibold">{current} kg actual</span>
        <span className="text-xs text-[#8aada9]">faltan {(current - goal).toFixed(1)} kg</span>
      </div>
    </div>
  );
}

// --- Dual scatter/bar mini for fat vs muscle ---
function CompositionBar({ data }: { data: typeof INBODY_DATA }) {
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.date}>
          <div className="flex justify-between text-[10px] text-[#8aada9] mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>
            <span>{d.date}</span>
            <span className="text-[#1ab89a]">Grasa {d.fat}% · Músculo {d.muscle}%</span>
          </div>
          <div className="flex h-2 rounded-full overflow-hidden gap-px bg-[#f0faf7]">
            <div className="bg-[#ff6b6b]/60 rounded-l-full" style={{ width: `${d.fat}%` }} />
            <div className="bg-[#1ab89a]/70 rounded-r-full" style={{ width: `${d.muscle}%` }} />
          </div>
        </div>
      ))}
      <div className="flex gap-4 pt-1">
        <span className="flex items-center gap-1.5 text-[10px] text-[#8aada9]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b]/60 inline-block" /> % Grasa
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-[#8aada9]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1ab89a]/70 inline-block" /> % Músculo
        </span>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    ok: "bg-[#1ab89a]",
    high: "bg-[#ff6b6b]",
    low: "bg-[#ffaa00]",
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${map[status] ?? "bg-[#8aada9]"}`} />;
}

function ConditionBadge({ condition }: { condition: string }) {
  const map: Record<string, string> = {
    "Normal": "bg-[#f0faf7] text-[#1ab89a]",
    "Sobrepeso": "bg-[#fff8ed] text-[#e8960c]",
    "Obesidad I": "bg-[#fff1f1] text-[#e85555]",
    "Obesidad II": "bg-[#fff1f1] text-[#c93c3c]",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${map[condition] ?? "bg-[#f5f5f5] text-[#8aada9]"}`}>
      {condition}
    </span>
  );
}

// ── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function ResumenTab({ patient }: { patient: typeof PATIENTS[0] }) {
  return (
    <div className="space-y-6">
      {/* Key metric cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Peso inicial", value: "81.0 kg", sub: "primer registro · InBody inicial", accent: false },
          { label: "Peso actual", value: "79.5 kg", sub: `IMC ${patient.bmi}`, accent: false },
          { label: "Meta", value: "65 kg", sub: "faltan 14.5 kg", accent: true },
        ].map((m) => (
          <div key={m.label} className={`rounded-xl border p-5 ${m.accent ? "border-[#1ab89a]/30 bg-[#f0faf7]" : "border-[#e8f0ef] bg-white"}`}>
            <p className="text-xs text-[#8aada9] mb-1">{m.label}</p>
            <p className={`text-2xl font-bold ${m.accent ? "text-[#1ab89a]" : "text-[#0e1c1a]"}`}>{m.value}</p>
            <p className="text-xs text-[#aac4c0] mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 rounded-xl border border-[#e8f0ef] bg-white p-5">
          <p className="text-xs font-semibold text-[#0e1c1a] mb-4">Evolución de peso</p>
          <LineChart data={WEIGHT_DATA} />
        </div>
        <div className="col-span-1 rounded-xl border border-[#e8f0ef] bg-white p-5">
          <p className="text-xs font-semibold text-[#0e1c1a] mb-4">Progreso a meta</p>
          <div className="mt-8">
            <GoalBar current={79.5} initial={81.0} goal={65} />
          </div>
          <div className="mt-6 flex justify-around text-center">
            {[["Obesidad", "#e85555"], ["Sobrepeso", "#e8960c"], ["Normal", "#1ab89a"]].map(([l, c]) => (
              <div key={l}>
                <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ background: c }} />
                <span className="text-[10px] text-[#8aada9]">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 rounded-xl border border-[#e8f0ef] bg-white p-5">
          <p className="text-xs font-semibold text-[#0e1c1a] mb-4">Grasa vs Músculo</p>
          <CompositionBar data={INBODY_DATA} />
        </div>
      </div>

      {/* InBody summary strip */}
      <div className="rounded-xl border border-[#e8f0ef] bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-[#0e1c1a]">Últimas métricas InBody</p>
          <span className="text-[10px] text-[#8aada9]" style={{ fontFamily: "'DM Mono', monospace" }}>5 sep 2026</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {INBODY_METRICS.map((m) => (
            <div key={m.label} className="text-center p-3 rounded-lg bg-[#f8fefe]">
              <div className="flex items-center justify-center gap-1 mb-1">
                <StatusDot status={m.status} />
              </div>
              <p className="text-sm font-bold text-[#0e1c1a]">{m.value}</p>
              <p className="text-[10px] text-[#8aada9] mt-0.5 leading-tight">{m.label}</p>
              <p className="text-[9px] text-[#c8ddd9] mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>ref {m.ref}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InBodyTab() {
  const [metric, setMetric] = useState("% Grasa");
  const bodyMetrics = ["% Grasa", "Agua", "Masa grasa", "M. músculo", "Masa magra"];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#e8f0ef] bg-white p-5">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-semibold text-[#0e1c1a]">Composición corporal</p>
          <div className="flex gap-1">
            {bodyMetrics.map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`text-[11px] px-3 py-1.5 rounded-full transition-colors ${
                  metric === m
                    ? "bg-[#1ab89a] text-white font-medium"
                    : "text-[#8aada9] hover:bg-[#f0faf7] hover:text-[#1ab89a]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="h-32 flex items-end gap-6 px-4">
          {[
            { date: "13 ago", val: 45.8 },
            { date: "29 ago", val: 45.1 },
            { date: "5 sep", val: 44.5 },
          ].map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-[#1ab89a]">{d.val}%</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#1ab89a] to-[#3ab8c8] opacity-80"
                style={{ height: `${(d.val / 50) * 100}px` }}
              />
              <span className="text-[10px] text-[#8aada9]" style={{ fontFamily: "'DM Mono', monospace" }}>{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#e8f0ef] bg-white p-5">
          <p className="text-xs font-semibold text-[#0e1c1a] mb-4">Parámetros InBody</p>
          <div className="space-y-3">
            {INBODY_METRICS.map((m) => (
              <div key={m.label} className="flex items-center justify-between py-2 border-b border-[#f0f0f0] last:border-0">
                <div className="flex items-center gap-2">
                  <StatusDot status={m.status} />
                  <span className="text-sm text-[#0e1c1a]">{m.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-[#0e1c1a]">{m.value}</span>
                  <span className="text-[10px] text-[#c8ddd9] ml-2" style={{ fontFamily: "'DM Mono', monospace" }}>ref {m.ref}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#e8f0ef] bg-white p-5">
          <p className="text-xs font-semibold text-[#0e1c1a] mb-4">Grasa visceral</p>
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f0faf7" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="38"
                  fill="none"
                  stroke="#ff6b6b"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 38 * (18 / 30)} ${2 * Math.PI * 38}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#0e1c1a]">18</span>
                <span className="text-[10px] text-[#8aada9]">/ 30</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#ff6b6b] font-semibold">Alto · ref &lt; 10</p>
              <p className="text-[11px] text-[#8aada9] mt-0.5">Riesgo metabólico elevado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EstudiosTab() {
  const [transcribing, setTranscribing] = useState<number | null>(null);
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#0e1c1a]">Estudios registrados</p>
        <button className="flex items-center gap-2 text-sm font-medium text-white bg-[#1ab89a] px-4 py-2 rounded-full hover:bg-[#13a389] transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Subir estudio
        </button>
      </div>

      {ESTUDIOS.map((e, i) => (
        <div key={i} className="rounded-xl border border-[#e8f0ef] bg-white overflow-hidden">
          <div className="flex items-start gap-4 p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
              e.type === "Imagen" ? "bg-[#f0f4ff] text-[#6b7ff5]" : "bg-[#f0faf7] text-[#1ab89a]"
            }`}>
              {e.type === "Imagen" ? "IMG" : "LAB"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[#0e1c1a]">{e.name}</p>
                  <p className="text-xs text-[#8aada9] mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>{e.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    e.status === "Disponible" ? "bg-[#f0faf7] text-[#1ab89a]" : "bg-[#f0f0f0] text-[#8aada9]"
                  }`}>
                    {e.status}
                  </span>
                  <button
                    onClick={() => setTranscribing(transcribing === i ? null : i)}
                    className="text-xs text-[#5a7a76] border border-[#e8f0ef] px-3 py-1.5 rounded-full hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors"
                  >
                    {transcribing === i ? "Cerrar" : "Transcribir"}
                  </button>
                </div>
              </div>
              {e.notes && (
                <p className="text-sm text-[#5a7a76] mt-3 leading-relaxed bg-[#f8fefe] rounded-lg p-3 font-light">
                  {e.notes}
                </p>
              )}
            </div>
          </div>

          {transcribing === i && (
            <div className="border-t border-[#e8f0ef] p-5 bg-[#f8fefe]">
              <p className="text-xs font-semibold text-[#0e1c1a] mb-2">Transcripción del estudio</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                placeholder="Ingresa el texto del estudio aquí..."
                className="w-full text-sm text-[#0e1c1a] bg-white border border-[#e8f0ef] rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-[#1ab89a] placeholder:text-[#c8ddd9] leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => { setTranscribing(null); setText(""); }}
                  className="text-xs text-[#8aada9] px-4 py-2 rounded-full hover:text-[#0e1c1a] transition-colors"
                >
                  Cancelar
                </button>
                <button className="text-xs font-medium text-white bg-[#1ab89a] px-4 py-2 rounded-full hover:bg-[#13a389] transition-colors">
                  Guardar transcripción
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SignosTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {VITALS.map((v) => (
          <div key={v.label} className="rounded-xl border border-[#e8f0ef] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-[#8aada9]">{v.label}</p>
              <span className={`w-2 h-2 rounded-full ${v.ok ? "bg-[#1ab89a]" : "bg-[#ff6b6b]"}`} />
            </div>
            <p className="text-2xl font-bold text-[#0e1c1a]">{v.value}</p>
            <p className="text-xs text-[#c8ddd9] mt-0.5">{v.unit}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[#e8f0ef] bg-white p-5">
        <p className="text-xs font-semibold text-[#0e1c1a] mb-4">Tendencia de peso</p>
        <LineChart data={WEIGHT_DATA} />
      </div>
    </div>
  );
}

// ── MEDIDAS DATA ────────────────────────────────────────────────────────────

const BODY_ZONES = [
  {
    id: "cuello",
    label: "Cuello",
    color: "#7b6fff",
    unit: "cm",
    cx: 100, cy: 62,
    side: "right" as const,
    initial: 45,
    history: [{ date: "13 ago", val: 45 }, { date: "29 ago", val: 43 }, { date: "5 sep", val: 42 }],
    decreaseIsGood: true,
  },
  {
    id: "brazo",
    label: "Brazo",
    color: "#1ab89a",
    unit: "cm",
    cx: 158, cy: 138,
    side: "right" as const,
    initial: 38,
    history: [{ date: "13 ago", val: 38 }, { date: "29 ago", val: 37 }, { date: "5 sep", val: 36 }],
    decreaseIsGood: true,
  },
  {
    id: "cintura",
    label: "Cintura",
    color: "#ffaa00",
    unit: "cm",
    cx: 100, cy: 200,
    side: "left" as const,
    initial: 95,
    history: [{ date: "13 ago", val: 95 }, { date: "29 ago", val: 92 }, { date: "5 sep", val: 89 }],
    decreaseIsGood: true,
  },
  {
    id: "cadera",
    label: "Cadera",
    color: "#ff6b6b",
    unit: "cm",
    cx: 100, cy: 246,
    side: "left" as const,
    initial: 108,
    history: [{ date: "13 ago", val: 108 }, { date: "29 ago", val: 106 }, { date: "5 sep", val: 104 }],
    decreaseIsGood: true,
  },
  {
    id: "pantorrilla",
    label: "Pantorrilla",
    color: "#3ab8c8",
    unit: "cm",
    cx: 133, cy: 352,
    side: "right" as const,
    initial: 42,
    history: [{ date: "13 ago", val: 42 }, { date: "29 ago", val: 40 }, { date: "5 sep", val: 38 }],
    decreaseIsGood: true,
  },
];

const MEDIDAS_DATES = ["13 ago", "29 ago", "5 sep"];

// ── BODY SVG ─────────────────────────────────────────────────────────────────

function BodySVG({ zones }: { zones: typeof BODY_ZONES }) {
  // Icon-style figure, viewBox 0 0 200 430
  // Body path is a single smooth closed contour — matches the reference icon style
  const DASH_END = 36; // how far the dashed line extends from the dot

  return (
    <svg viewBox="0 0 200 430" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#edf8f5" />
          <stop offset="100%" stopColor="#e4f4f0" />
        </linearGradient>
      </defs>

      {/* ── Head ── */}
      <circle
        cx="100" cy="30" r="26"
        fill="url(#bodyGrad)" stroke="#9acfc6" strokeWidth="2"
      />

      {/* ── Body — single smooth icon-style path ──
          Traced clockwise from left neck:
          shoulders → left arm → left torso → left hip → left leg →
          crotch → right leg → right hip → right arm → right shoulder
      */}
      <path
        d="
          M 93 54
          C 74 58, 52 72, 44 92
          L 40 172
          C 40 181, 45 186, 53 186
          C 61 186, 65 180, 67 170
          L 69 200
          C 67 226, 62 244, 58 258
          L 54 410
          L 76 410
          L 80 266
          Q 100 275, 120 266
          L 124 410
          L 146 410
          L 142 258
          C 138 244, 133 226, 131 200
          L 133 170
          C 135 180, 139 186, 147 186
          C 155 186, 160 181, 160 172
          L 156 92
          C 148 72, 126 58, 107 54
          Z
        "
        fill="url(#bodyGrad)"
        stroke="#9acfc6"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ── Measurement points with history rings + callout lines ── */}
      {zones.map((z) => {
        const current = z.history[z.history.length - 1].val;
        const sliced = z.history.slice(-3);
        // fade oldest → newest
        const opacities = [0.15, 0.4, 1];
        const radii    = [11, 8, 6];

        const lineX2 = z.side === "right" ? z.cx + DASH_END : z.cx - DASH_END;

        return (
          <g key={z.id}>
            {/* Dashed callout line */}
            <line
              x1={z.cx} y1={z.cy}
              x2={lineX2} y2={z.cy}
              stroke={z.color} strokeWidth="1.2"
              strokeOpacity="0.45" strokeDasharray="3 2.5"
            />
            {/* Terminal tick */}
            <line
              x1={lineX2} y1={z.cy - 4}
              x2={lineX2} y2={z.cy + 4}
              stroke={z.color} strokeWidth="1.5" strokeOpacity="0.5"
            />

            {/* History rings — oldest (bottom/widest/faint) → newest (top/small/solid) */}
            {sliced.map((_, i) => (
              <circle
                key={i}
                cx={z.cx} cy={z.cy}
                r={radii[i]}
                fill={z.color}
                fillOpacity={opacities[i]}
              />
            ))}

            {/* Current value label */}
            <text
              x={z.side === "right" ? z.cx + DASH_END + 5 : z.cx - DASH_END - 5}
              y={z.cy - 4}
              textAnchor={z.side === "right" ? "start" : "end"}
              fontSize="9.5"
              fontWeight="700"
              fill={z.color}
              fontFamily="'DM Mono', monospace"
            >
              {current} cm
            </text>
            <text
              x={z.side === "right" ? z.cx + DASH_END + 5 : z.cx - DASH_END - 5}
              y={z.cy + 7}
              textAnchor={z.side === "right" ? "start" : "end"}
              fontSize="8"
              fill={z.color}
              fillOpacity="0.6"
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              {z.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── DELTA CARD ───────────────────────────────────────────────────────────────

function DeltaCard({ zone }: { zone: typeof BODY_ZONES[0] }) {
  const current = zone.history[zone.history.length - 1].val;
  const delta = current - zone.initial;
  const isGood = zone.decreaseIsGood ? delta < 0 : delta > 0;
  const isNeutral = delta === 0;

  return (
    <div
      className="rounded-xl border bg-white p-4"
      style={{ borderColor: `${zone.color}30` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wider">{zone.label}</span>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: zone.color }} />
      </div>

      {/* Current value */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-[#0e1c1a]">{current}</span>
        <span className="text-xs text-[#8aada9]">cm</span>
      </div>

      {/* Delta vs initial */}
      {isNeutral ? (
        <p className="text-xs text-[#8aada9]">= sin cambio</p>
      ) : (
        <div className={`flex items-center gap-1 text-xs font-semibold ${isGood ? "text-[#1ab89a]" : "text-[#ff6b6b]"}`}>
          <span>{isGood ? "↓" : "↑"}</span>
          <span>{Math.abs(delta)} cm</span>
          <span className="font-normal text-[#8aada9]">vs inicial</span>
        </div>
      )}
    </div>
  );
}

// ── PANEL DE MEDIDAS ─────────────────────────────────────────────────────────

function PanelMedidas() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#e8f0ef] bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8f0ef] bg-[#f8fefe]">
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#0e1c1a]">Zona</th>
              {MEDIDAS_DATES.map((d) => (
                <th key={d} className="text-center px-4 py-3 text-xs font-medium text-[#8aada9]" style={{ fontFamily: "'DM Mono', monospace" }}>{d}</th>
              ))}
              <th className="text-center px-4 py-3 text-xs font-semibold text-[#0e1c1a]">Δ total</th>
            </tr>
          </thead>
          <tbody>
            {BODY_ZONES.map((z) => {
              const current = z.history[z.history.length - 1].val;
              const delta = current - z.initial;
              const isGood = z.decreaseIsGood ? delta < 0 : delta > 0;
              return (
                <tr key={z.id} className="border-b border-[#f0f8f6] last:border-0 hover:bg-[#f8fefe] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: z.color }} />
                      <span className="font-medium text-[#0e1c1a]">{z.label}</span>
                    </div>
                  </td>
                  {z.history.map((h, i) => (
                    <td key={i} className="text-center px-4 py-3 text-[#5a7a76]" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {h.val} <span className="text-[10px] text-[#c8ddd9]">cm</span>
                    </td>
                  ))}
                  <td className="text-center px-4 py-3">
                    <span className={`text-sm font-semibold ${delta === 0 ? "text-[#8aada9]" : isGood ? "text-[#1ab89a]" : "text-[#ff6b6b]"}`}>
                      {delta === 0 ? "—" : `${isGood ? "↓" : "↑"} ${Math.abs(delta)} cm`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sparkline mini trend per zone */}
      <div className="grid grid-cols-5 gap-3">
        {BODY_ZONES.map((z) => {
          const vals = z.history.map((h) => h.val);
          const min = Math.min(...vals) - 1;
          const max = Math.max(...vals) + 1;
          const W = 80, H = 36, PAD = 4;
          const px = (i: number) => PAD + (i / (vals.length - 1)) * (W - PAD * 2);
          const py = (v: number) => PAD + ((max - v) / (max - min)) * (H - PAD * 2);
          const path = vals.map((v, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(v)}`).join(" ");
          return (
            <div key={z.id} className="rounded-xl border border-[#e8f0ef] bg-white p-3 text-center">
              <p className="text-[10px] font-semibold text-[#8aada9] mb-2">{z.label}</p>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 36 }}>
                <path d={path} fill="none" stroke={z.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {vals.map((v, i) => (
                  <circle key={i} cx={px(i)} cy={py(v)} r={i === vals.length - 1 ? 3.5 : 2.5}
                    fill={i === vals.length - 1 ? z.color : "white"}
                    stroke={z.color} strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── DIAGRAMA CORPORAL ────────────────────────────────────────────────────────

function DiagramaCorporal() {
  const leftZones = BODY_ZONES.filter((z) => z.side === "left");
  const rightZones = BODY_ZONES.filter((z) => z.side === "right");

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-5 mb-5">
        <p className="text-xs text-[#8aada9] font-medium">Historial de medidas:</p>
        {[
          { label: "13 ago · inicial", opacity: 0.2 },
          { label: "29 ago", opacity: 0.5 },
          { label: "5 sep · actual", opacity: 1 },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#8aada9]" style={{ opacity: l.opacity }} />
            <span className="text-[11px] text-[#8aada9]">{l.label}</span>
          </div>
        ))}
      </div>

      {/* 3-column layout: left cards | body | right cards */}
      <div className="flex gap-6 items-center">
        {/* Left measurement cards */}
        <div className="flex flex-col gap-3 w-44 shrink-0">
          {leftZones.map((z) => <DeltaCard key={z.id} zone={z} />)}
        </div>

        {/* Body diagram */}
        <div className="flex-1 flex justify-center">
          <div className="w-56" style={{ height: 430 }}>
            <BodySVG zones={BODY_ZONES} />
          </div>
        </div>

        {/* Right measurement cards */}
        <div className="flex flex-col gap-3 w-44 shrink-0">
          {rightZones.map((z) => <DeltaCard key={z.id} zone={z} />)}
        </div>
      </div>
    </div>
  );
}

// ── NUTRICIÓN TAB ────────────────────────────────────────────────────────────

function NutricionTab() {
  const [subTab, setSubTab] = useState<"panel" | "diagrama">("panel");

  return (
    <div>
      {/* Sub-tab switcher */}
      <div className="flex gap-1 mb-6 p-1 bg-[#f0faf7] rounded-xl w-fit border border-[#e8f0ef]">
        {([["panel", "Panel de medidas"], ["diagrama", "Diagrama corporal"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSubTab(key)}
            className={`text-sm px-5 py-2 rounded-lg transition-all font-medium ${
              subTab === key
                ? "bg-white text-[#0e1c1a] shadow-sm border border-[#e8f0ef]"
                : "text-[#8aada9] hover:text-[#5a7a76]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {subTab === "panel" && <PanelMedidas />}
      {subTab === "diagrama" && <DiagramaCorporal />}
    </div>
  );
}

function AntecedentesTab() {
  return (
    <div className="space-y-4">
      {[
        { section: "Patológicos", items: ["Obesidad grado I (desde 2022)", "Resistencia a la insulina (dx 2024)", "Dislipidemia mixta"] },
        { section: "Quirúrgicos", items: ["Apendicectomía (2010)", "Sin otras cirugías reportadas"] },
        { section: "Familiares", items: ["Diabetes mellitus tipo 2 (madre, abuela materna)", "Hipertensión arterial (padre)"] },
        { section: "Alérgicos", items: ["Penicilina (urticaria)", "Sin otras alergias conocidas"] },
      ].map((s) => (
        <div key={s.section} className="rounded-xl border border-[#e8f0ef] bg-white p-5">
          <p className="text-xs font-semibold text-[#1ab89a] uppercase tracking-wide mb-3">{s.section}</p>
          <ul className="space-y-1.5">
            {s.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#5a7a76]">
                <span className="w-1 h-1 rounded-full bg-[#1ab89a]/60 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function PatientRecords({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState("Resumen");

  const filtered = PATIENTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const patient = PATIENTS.find((p) => p.id === selectedId)!;

  return (
    <div className="flex flex-col h-screen bg-[#f8fefe]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* TOP NAV */}
      <nav className="bg-white border-b border-[#e8f0ef] px-5 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#5a7a76] hover:text-[#0e1c1a] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Inicio
          </button>
          <div className="w-px h-4 bg-[#e8f0ef]" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#1ab89a] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-semibold text-[14px] text-[#0e1c1a]">Medinex</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-[#5a7a76] border border-[#e8f0ef] px-4 py-1.5 rounded-full hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">
            Calendario
          </button>
          <button className="text-sm text-[#5a7a76] border border-[#e8f0ef] px-4 py-1.5 rounded-full hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">
            Subir estudios
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1ab89a] to-[#3ab8c8] flex items-center justify-center text-white text-xs font-bold">
            DJ
          </div>
        </div>
      </nav>

      <div className="flex flex-1 min-h-0">
        {/* SIDEBAR */}
        <aside className="w-60 bg-white border-r border-[#e8f0ef] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#e8f0ef]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8ddd9]" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#f8fefe] border border-[#e8f0ef] rounded-lg pl-9 pr-3 py-2 text-sm text-[#0e1c1a] placeholder:text-[#c8ddd9] focus:outline-none focus:border-[#1ab89a]"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] text-[#8aada9] font-medium">{PATIENTS.length} PACIENTES</span>
              <button className="text-[11px] font-semibold text-white bg-[#1ab89a] px-2.5 py-1 rounded-full hover:bg-[#13a389] transition-colors">
                + Nuevo
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedId(p.id); setActiveTab("Resumen"); }}
                className={`w-full flex items-center gap-3 px-4 py-3 border-b border-[#f0f8f6] text-left transition-colors ${
                  selectedId === p.id ? "bg-[#f0faf7]" : "hover:bg-[#f8fefe]"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: `linear-gradient(135deg, ${p.color}, #3ab8c8)` }}
                >
                  {p.initials}
                </div>
                <div className="min-w-0">
                  <p className={`text-[13px] font-medium truncate ${selectedId === p.id ? "text-[#1ab89a]" : "text-[#0e1c1a]"}`}>
                    {p.name}
                  </p>
                  <p className="text-[11px] text-[#8aada9]">{p.age} años · {p.gender}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto">
          {/* Patient header */}
          <div className="bg-white border-b border-[#e8f0ef] px-7 py-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
                  style={{ background: `linear-gradient(135deg, ${patient.color}, #3ab8c8)` }}
                >
                  {patient.initials}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#0e1c1a]">{patient.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[#8aada9]">{patient.age} años</span>
                    <span className="text-[#e8f0ef]">·</span>
                    <span className="text-sm text-[#8aada9]">{patient.gender}</span>
                    <span className="text-[#e8f0ef]">·</span>
                    <span className="text-sm text-[#8aada9]">IMC {patient.bmi}</span>
                    <ConditionBadge condition={patient.condition} />
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-[#5a7a76] border border-[#e8f0ef] px-4 py-2 rounded-full hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M11 2l3 3-8 8H3v-3L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Editar
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-5 -mb-px overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm px-4 py-2 rounded-t-lg border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "border-[#1ab89a] text-[#1ab89a] font-semibold bg-[#f0faf7]"
                      : "border-transparent text-[#8aada9] hover:text-[#0e1c1a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-7 py-6">
            {activeTab === "Resumen" && <ResumenTab patient={patient} />}
            {activeTab === "InBody" && <InBodyTab />}
            {activeTab === "Estudios" && <EstudiosTab />}
            {activeTab === "Signos Vitales" && <SignosTab />}
            {activeTab === "Antecedentes" && <AntecedentesTab />}
            {activeTab === "Nutrición" && <NutricionTab />}
            {(activeTab === "Riesgo" || activeTab === "Plan" || activeTab === "Seguimiento") && (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#f0faf7] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="3" stroke="#1ab89a" strokeWidth="1.5"/>
                    <path d="M7 10h6M10 7v6" stroke="#1ab89a" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#0e1c1a]">Sección {activeTab}</p>
                <p className="text-xs text-[#8aada9] mt-1">Contenido disponible próximamente</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
