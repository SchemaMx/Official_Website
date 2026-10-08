import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEMO_T, DemoTContext, useT, isDemoLang, type DemoLang, type DemoDict } from "./omegaDemoI18n";

// Language-neutral patient records. Display name, gender and condition are
// resolved from the active dictionary so the roster reads natively per language.
const PATIENTS = [
  { id: 1, age: 29, sex: "F", bmi: 30.9, cond: "obesity1", medication: "Wegovy", doctorIdx: 0 },
  { id: 2, age: 34, sex: "F", bmi: 27.4, cond: "overweight", medication: "Saxenda", doctorIdx: 1 },
  { id: 3, age: 38, sex: "F", bmi: 25.1, cond: "normal", medication: "", doctorIdx: 2 },
  { id: 4, age: 39, sex: "M", bmi: 28.8, cond: "overweight", medication: "Ozempic", doctorIdx: 0 },
  { id: 5, age: 54, sex: "M", bmi: 32.1, cond: "obesity1", medication: "Mounjaro", doctorIdx: 1 },
  { id: 6, age: 53, sex: "F", bmi: 31.4, cond: "obesity1", medication: "Wegovy", doctorIdx: 0 },
  { id: 7, age: 46, sex: "F", bmi: 29.3, cond: "overweight", medication: "", doctorIdx: 2 },
  { id: 8, age: 42, sex: "F", bmi: 26.8, cond: "overweight", medication: "Saxenda", doctorIdx: 1 },
  { id: 9, age: 27, sex: "M", bmi: 24.2, cond: "normal", medication: "", doctorIdx: 0 },
  { id: 10, age: 29, sex: "F", bmi: 28.0, cond: "overweight", medication: "Ozempic", doctorIdx: 2 },
  { id: 11, age: 30, sex: "F", bmi: 30.2, cond: "obesity1", medication: "Wegovy", doctorIdx: 1 },
  { id: 12, age: 29, sex: "F", bmi: 31.8, cond: "obesity1", medication: "Mounjaro", doctorIdx: 0 },
];

type Patient = (typeof PATIENTS)[0];
const condLabel = (d: DemoDict, c: string) =>
  c === "normal" ? d.condNormal : c === "overweight" ? d.condOverweight : d.condObesity1;
const patientName = (d: DemoDict, p: Patient) => d.patientNames[p.id - 1];
const patientInitials = (d: DemoDict, p: Patient) =>
  patientName(d, p).split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const genderLabel = (d: DemoDict, p: Patient) => (p.sex === "M" ? d.genderM : d.genderF);
const medLabel = (d: DemoDict, p: Patient) => p.medication || d.noTreatment;

function avatarGradient(sex: string) {
  return sex === "M"
    ? "linear-gradient(135deg, #3ab8c8, #6b7ff5)"
    : "linear-gradient(135deg, #1ab89a, #3ab8c8)";
}

// Weight data points over time
const WEIGHT_DATA = [
  { date: "13 ago", value: 81.0 },
  { date: "20 ago", value: 80.4 },
  { date: "29 ago", value: 79.8 },
  { date: "5 sep", value: 79.5 },
];

const VISCERAL_DATA = [
  { date: "13 ago", value: 19 },
  { date: "29 ago", value: 18.4 },
  { date: "5 sep", value: 18 },
];

const FUERZA_DATA = [
  { date: "13 ago", value: 0.29 },
  { date: "29 ago", value: 0.3 },
  { date: "5 sep", value: 0.31 },
];

const BODY_METRIC_SERIES: Record<string, { date: string; value: number }[]> = {
  "metricFat": [{ date: "13 ago", value: 45.8 }, { date: "29 ago", value: 45.1 }, { date: "5 sep", value: 44.5 }],
  "metricWater": [{ date: "13 ago", value: 32.8 }, { date: "29 ago", value: 33.2 }, { date: "5 sep", value: 33.6 }],
  "metricFatMass": [{ date: "13 ago", value: 36.9 }, { date: "29 ago", value: 36.1 }, { date: "5 sep", value: 35.4 }],
  "metricMuscleMass": [{ date: "13 ago", value: 23.6 }, { date: "29 ago", value: 23.9 }, { date: "5 sep", value: 24.1 }],
  "metricLeanMass": [{ date: "13 ago", value: 43.3 }, { date: "29 ago", value: 43.7 }, { date: "5 sep", value: 44.1 }],
};

const INBODY_METRICS = [
  { label: "metricFatMass" as const, value: "35.4 kg", ref: "18–28 kg", status: "high" },
  { label: "skeletalMuscle" as const, value: "24.1 kg", ref: "21–31 kg", status: "ok" },
  { label: "bodyWater" as const, value: "33.6 L", ref: "29–38 L", status: "ok" },
  { label: "leanMass" as const, value: "44.1 kg", ref: "39–53 kg", status: "ok" },
  { label: "visceralFat" as const, value: "18", ref: "< 10", status: "high" },
  { label: "relativeStrength" as const, value: "0.31", ref: "> 0.40", status: "low" },
];

const INBODY_RECORDS = [
  { date: "5 sep 2026", folio: "8116362123", peso: "79.5 kg", grasa: "44.5%", mme: "24.1 kg", imc: "30.9", score: 66 },
  { date: "13 ago 2026", folio: "8116361980", peso: "81.0 kg", grasa: "45.8%", mme: "23.6 kg", imc: "31.6", score: 61 },
];

const LAB_GROUPS = [
  { titleKey: "labMetabolic" as const, values: [["Glucosa", "95.1", "mg/dL"], ["Insulina", "12.6", "µU/mL"], ["HOMA-IR", "2.96", ""], ["Ác. Úrico", "3.6", "mg/dL"]] },
  { titleKey: "labLipids" as const, values: [["Col. Total", "187.9", "mg/dL"], ["HDL", "74.7", "mg/dL"], ["LDL", "101.7", "mg/dL"], ["Col. No-HDL", "113.2", "mg/dL"], ["VLDL", "10.74", "mg/dL"], ["Triglicéridos", "53.7", "mg/dL"]] },
  { titleKey: "labHepatic" as const, values: [["AST/TGO", "20", "U/L"], ["ALT/TGP", "28.6", "U/L"], ["GGT", "15", "U/L"], ["Fosfatasa Alc.", "77", "U/L"], ["DHL (LDH)", "110", "U/L"], ["Bili. Total", "0.29", "mg/dL"]] },
  { titleKey: "labProteins" as const, values: [["Albúmina", "4.19", "g/dL"], ["Globulinas", "2.32", "g/dL"], ["Proteínas Tot.", "6.5", "g/dL"]] },
  { titleKey: "labRenal" as const, values: [["Urea", "34.3", "mg/dL"], ["Creatinina", "0.93", "mg/dL"], ["Sodio", "144", "mEq/L"], ["Potasio", "4.7", "mEq/L"], ["Calcio", "9.2", "mg/dL"]] },
];

const VITALS = [
  { label: "bloodPressure" as const, value: "118/76", unit: "mmHg", ok: true },
  { label: "heartRate" as const, value: "74", unit: "bpm", ok: true },
  { label: "o2sat" as const, value: "98", unit: "%", ok: true },
];

const VITALS_HISTORY = [
  { date: "22 sep 2026", ta: "114/76", fc: "71 lpm", sat: "98%", dina: "26.5 kg", fuerza: "0.4 kg/kg", sentadillas: "20 reps" },
  { date: "15 sep 2026", ta: "116/78", fc: "73 lpm", sat: "97%", dina: "25.8 kg", fuerza: "0.39 kg/kg", sentadillas: "18 reps" },
];

// ── SHARED UI PRIMITIVES ─────────────────────────────────────────────────────

function Pill({ children, tone = "gray", icon }: { children: ReactNode; tone?: "blue" | "teal" | "amber" | "red" | "gray"; icon?: ReactNode }) {
  const tones: Record<string, string> = {
    blue: "bg-[#f0f4ff] text-[#5b6ee8]",
    teal: "bg-[#f0faf7] text-[#1ab89a]",
    amber: "bg-[#fff8ed] text-[#e8960c]",
    red: "bg-[#fff1f1] text-[#e85555]",
    gray: "bg-white border border-[#e8f0ef] text-[#5a7a76]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-[5px] rounded-full whitespace-nowrap ${tones[tone]}`}>
      {icon}{children}
    </span>
  );
}

function conditionTone(cond: string): "teal" | "amber" | "red" {
  if (cond === "normal") return "teal";
  if (cond === "overweight") return "amber";
  return "red";
}

function LabelValueRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#f0f8f6] last:border-0 gap-4">
      <span className="text-sm text-[#5a7a76]">{label}</span>
      <span className="text-sm font-semibold text-[#0e1c1a] text-right" style={{ fontFamily: "'DM Mono', monospace" }}>{value}</span>
    </div>
  );
}

function SectionCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide">{title}</p>
        {action}
      </div>
      {children}
    </div>
  );
}

function CollapsibleBar({ open, onToggle, openLabel, closedLabel, icon }: { open: boolean; onToggle: () => void; openLabel: string; closedLabel: string; icon?: boolean }) {
  return (
    <button onClick={onToggle} className="w-full flex items-center gap-2 text-[13px] text-[#5a7a76] hover:text-[#1ab89a] py-2.5 transition-colors">
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className={`transition-transform shrink-0 ${open ? "rotate-90" : ""}`}>
        <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {icon && (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M2 12l3-5 3 3 3-6 3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="font-medium">{open ? openLabel : closedLabel}</span>
    </button>
  );
}

// Real-style axis line chart: gridlines + y-axis ticks + x-axis date labels.
// Labels are clamped to the viewBox so edge values aren't clipped by the SVG bounds.
function AxisChart({ data, color = "#1ab89a", suffix = "", decimals = 1 }: { data: { date: string; value: number }[]; color?: string; suffix?: string; decimals?: number }) {
  const W = 300, H = 140, PADL = 46, PADR = 14, PADT = 16, PADB = 22;
  const vals = data.map((d) => d.value);
  const min = Math.min(...vals), max = Math.max(...vals);
  const range = max - min || Math.max(1, max * 0.1);
  const yMin = min - range * 0.2, yMax = max + range * 0.2;
  const x = (i: number) => (data.length === 1 ? W / 2 : PADL + (i / (data.length - 1)) * (W - PADL - PADR));
  const y = (v: number) => PADT + ((yMax - v) / (yMax - yMin)) * (H - PADT - PADB);
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ");
  const ticks = [yMax, (yMax + yMin) / 2, yMin];

  // Keep a centered label inside [0, W] by flipping its anchor near the edges.
  const fit = (cx: number, text: string, fontPx: number) => {
    const half = (text.length * fontPx * 0.62) / 2;
    if (cx - half < 2) return { x: 2, anchor: "start" as const };
    if (cx + half > W - 2) return { x: W - 2, anchor: "end" as const };
    return { x: cx, anchor: "middle" as const };
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={PADL} y1={y(t)} x2={W - PADR} y2={y(t)} stroke="#eef1f4" strokeWidth="1" />
          <text x={PADL - 6} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#8aada9" fontFamily="'DM Mono', monospace">
            {t.toFixed(decimals)}{suffix}
          </text>
        </g>
      ))}
      {data.length > 1 && <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      {data.map((d, i) => {
        const isLast = i === data.length - 1;
        const valueLabel = `${d.value}${suffix}`;
        const vPos = fit(x(i), valueLabel, 10);
        const dPos = fit(x(i), d.date, 9);
        return (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.value)} r={isLast ? 4 : 3} fill={isLast ? color : "white"} stroke={color} strokeWidth="1.5" />
            {isLast && (
              <text x={vPos.x} y={y(d.value) - 10} textAnchor={vPos.anchor} fontSize="10" fontWeight="700" fill={color} fontFamily="'DM Mono', monospace">
                {valueLabel}
              </text>
            )}
            <text x={dPos.x} y={H - 6} textAnchor={dPos.anchor} fontSize="9" fill="#8aada9" fontFamily="'DM Mono', monospace">
              {d.date}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Tri-zone (Obesidad/Sobrepeso/Normal) progress bar with pointer marker
function ZoneProgressBar({ current, initial, goal }: { current: number; initial: number; goal: number }) {
  const span = Math.abs(initial - goal) * 1.3 || 1;
  const lo = Math.min(initial, goal) - span * 0.1;
  const hi = Math.max(initial, goal) + span * 0.1;
  const pct = Math.min(97, Math.max(3, ((current - lo) / (hi - lo)) * 100));
  const delta = current - goal;

  return (
    <div>
      <div className="flex justify-between text-xs text-[#8aada9] mb-3">
        <span>Inicial {initial} kg</span>
        <span className="text-[#1ab89a] font-semibold">Meta {goal} kg</span>
      </div>
      <div className="relative h-2.5 rounded-full overflow-hidden flex">
        <div className="flex-1 bg-[#e85555]" />
        <div className="flex-[1.3] bg-[#e8960c]" />
        <div className="flex-1 bg-[#1ab89a]" />
      </div>
      <div className="relative h-2.5">
        <div className="absolute top-0" style={{ left: `${pct}%`, transform: "translateX(-50%)" }}>
          <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #0e1c1a" }} />
        </div>
      </div>
      <div className="flex justify-between items-baseline mt-2.5">
        <span className="text-lg font-bold text-[#e8960c]">
          {current} <span className="text-xs font-normal text-[#8aada9]">kg actual</span>
        </span>
        <span className="text-xs text-[#8aada9]">faltan {Math.abs(delta).toFixed(1)} kg</span>
      </div>
      <div className="flex justify-around mt-4 pt-3 border-t border-[#f0f8f6]">
        {([["Obesidad", "#e85555"], ["Sobrepeso", "#e8960c"], ["Normal", "#1ab89a"]] as const).map(([l, c]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: c }} />
            <span className="text-[11px] text-[#8aada9]">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Grasa vs Músculo scatter-on-axis chart, matching the real app's two-dot % view
function ScatterAxisChart({ fat, muscle, date }: { fat: number; muscle: number; date: string }) {
  const t = useT();
  const W = 260, H = 140, PADL = 32, PADT = 16, PADB = 22;
  const yMax = 50;
  const y = (v: number) => PADT + ((yMax - v) / yMax) * (H - PADT - PADB);
  const ticks = [50, 25, 0];
  const cx = W / 2;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={PADL} y1={y(t)} x2={W - 10} y2={y(t)} stroke="#eef1f4" strokeWidth="1" />
            <text x={PADL - 6} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#8aada9" fontFamily="'DM Mono', monospace">{t}%</text>
          </g>
        ))}
        <circle cx={cx} cy={y(fat)} r="4.5" fill="none" stroke="#e85555" strokeWidth="2" />
        <circle cx={cx} cy={y(muscle)} r="4.5" fill="none" stroke="#6b7ff5" strokeWidth="2" />
        <text x={cx} y={H - 6} textAnchor="middle" fontSize="9" fill="#8aada9" fontFamily="'DM Mono', monospace">{date}</text>
      </svg>
      <div className="flex justify-center gap-4 mt-1">
        <span className="flex items-center gap-1.5 text-[11px] text-[#8aada9]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e85555] inline-block" /> {t.metricFat} <b className="text-[#0e1c1a]">{fat}%</b>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-[#8aada9]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6b7ff5] inline-block" /> {t.metricMuscleMass} <b className="text-[#0e1c1a]">{muscle}%</b>
        </span>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = { ok: "bg-[#1ab89a]", high: "bg-[#e85555]", low: "bg-[#e8960c]" };
  return <span className={`inline-block w-2 h-2 rounded-full ${map[status] ?? "bg-[#8aada9]"}`} />;
}

// ── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function ResumenTab({ patient }: { patient: Patient }) {
  const t = useT();
  const [panelOpen, setPanelOpen] = useState(true);
  const [metric, setMetric] = useState("metricFat");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: t.initialWeight, value: "81.0 kg", sub: t.firstRecord, accent: false },
          { label: t.currentWeight, value: "79.5 kg", sub: `${t.bmi} ${patient.bmi}`, accent: false },
          { label: t.goal, value: "65 kg", sub: `${t.remaining} 14.5 kg`, accent: true },
        ].map((m) => (
          <div key={m.label} className={`rounded-2xl border p-5 ${m.accent ? "border-[#1ab89a]/30 bg-[#f0faf7]" : "border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)]"}`}>
            <p className="text-xs text-[#8aada9] mb-1">{m.label}</p>
            <p className={`text-2xl font-bold ${m.accent ? "text-[#1ab89a]" : "text-[#0e1c1a]"}`}>{m.value}</p>
            <p className="text-xs text-[#aac4c0] mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      <CollapsibleBar open={panelOpen} onToggle={() => setPanelOpen((o) => !o)} openLabel={t.closePanel} closedLabel={t.openPanel} icon />

      {panelOpen && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
              <p className="text-xs font-semibold text-[#0e1c1a] mb-2">{t.weightEvolution}</p>
              <AxisChart data={WEIGHT_DATA} suffix=" kg" />
              <p className="text-[10px] text-[#c8ddd9] mt-1">{t.weightSources}</p>
            </div>
            <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
              <p className="text-xs font-semibold text-[#0e1c1a] mb-4">{t.goalProgress}</p>
              <ZoneProgressBar current={79.5} initial={81.0} goal={65} />
            </div>
            <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
              <p className="text-xs font-semibold text-[#0e1c1a] mb-2">{t.fatVsMuscle}</p>
              <ScatterAxisChart fat={44.5} muscle={24.1} date="5 sep 2026" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
            <div className="flex flex-wrap gap-1 mb-3">
              {Object.keys(BODY_METRIC_SERIES).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                    metric === m ? "bg-[#1ab89a] text-white border-[#1ab89a] font-medium" : "border-[#e8f0ef] text-[#8aada9] hover:text-[#1ab89a] hover:border-[#1ab89a]/40"
                  }`}
                >
                  {t[m as keyof typeof t] as string}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <AxisChart data={BODY_METRIC_SERIES[metric]} suffix={metric === "metricFat" ? "%" : " kg"} color="#e85555" />
                <p className="text-[10px] text-[#c8ddd9] text-center -mt-2">InBody</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0e1c1a] mb-1">{t.visceralFat}</p>
                <AxisChart data={VISCERAL_DATA} decimals={0} color="#e8960c" />
                <p className="text-[10px] text-[#c8ddd9] text-center -mt-2">{t.visceralSource}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0e1c1a] mb-1">{t.relativeStrength}</p>
                <AxisChart data={FUERZA_DATA} decimals={2} color="#6b7ff5" />
                <p className="text-[10px] text-[#c8ddd9] text-center -mt-2">{t.strengthSource}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <SectionCard
        title={t.aiSummary}
        action={<Pill tone="teal" icon={<svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Actualizado</Pill>}
      >
        <div className="rounded-xl bg-[#f0f4ff] border border-[#e8f0ef] p-4 text-sm text-[#0e1c1a] leading-relaxed space-y-3">
          <div>
            <p className="text-[#5b6ee8] font-semibold text-[13px] mb-1">{t.clinicalSummary}</p>
            <p className="text-[#3a4650]">
              {t.summaryBody({
                gender: genderLabel(t, patient),
                age: patient.age,
                bmi: patient.bmi,
                condition: condLabel(t, patient.cond),
                medication: medLabel(t, patient),
              })}
            </p>
          </div>
          <div>
            <p className="text-[#5b6ee8] font-semibold text-[13px] mb-1">{t.identifiedProblems}</p>
            <ol className="list-decimal list-inside text-[#3a4650] space-y-0.5">
              <li>{condLabel(t, patient.cond)}</li>
              <li>{t.problemInsulin}</li>
              <li>{t.problemVisceral}</li>
            </ol>
          </div>
          <div>
            <p className="text-[#5b6ee8] font-semibold text-[13px] mb-1">{t.treatmentConsiderations}</p>
            <p className="text-[#3a4650]">
              Continuar seguimiento de tolerancia al tratamiento farmacológico actual y reforzar plan de actividad física para mejorar composición corporal.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function AntecedentesTab() {
  const t = useT();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title={t.personalData}>
          <LabelValueRow label={t.birthDate} value={t.birthDateValue} />
          <LabelValueRow label={t.maritalStatus} value={t.maritalValue} />
          <LabelValueRow label={t.occupation} value={t.occupationValue} />
          <LabelValueRow label={t.phone} value="8112456789" />
          <LabelValueRow label={t.email} value={t.patientEmail} />
          <LabelValueRow label={t.city} value={t.cityValue} />
          <LabelValueRow label={t.bloodType} value="O+" />
        </SectionCard>
        <SectionCard title={t.anthropometrics}>
          <LabelValueRow label={t.initialWeight} value="81.0 kg" />
          <LabelValueRow label={t.currentWeight} value="79.5 kg" />
          <LabelValueRow label={t.height} value="162.0 cm" />
          <LabelValueRow label={t.bmi} value="30.9 kg/m²" />
          <LabelValueRow label={t.waist} value="89 cm" />
          <LabelValueRow label={t.hip} value="108.5 cm" />
          <LabelValueRow label={t.neck} value="36.5 cm" />
          <LabelValueRow label={t.maxWeight} value="86 kg" />
          <LabelValueRow label={t.minWeight} value="63 kg" />
        </SectionCard>
      </div>

      <SectionCard title={t.comorbidities}>
        <div className="flex flex-wrap gap-2">
          <Pill tone="amber">Resistencia a la insulina</Pill>
          <Pill tone="amber">Dislipidemia mixta</Pill>
        </div>
      </SectionCard>

      <SectionCard title={t.priorSurgery}>
        <p className="text-sm text-[#8aada9]">{t.noneRegistered}</p>
      </SectionCard>

      <SectionCard title={t.weightLossAttempts}>
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2 text-sm text-[#5a7a76]">
            <span className="w-1 h-1 rounded-full bg-[#1ab89a]/60 mt-2 shrink-0" />
            Orlistat (2023) — abandonado por efectos gastrointestinales
          </li>
          <li className="flex items-start gap-2 text-sm text-[#5a7a76]">
            <span className="w-1 h-1 rounded-full bg-[#1ab89a]/60 mt-2 shrink-0" />
            Metformina (2024) — en combinación con manejo nutricional
          </li>
        </ul>
      </SectionCard>
    </div>
  );
}

function SignosTab() {
  const t = useT();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-2">{t.dynamometry}</p>
          <p className="text-2xl font-bold text-[#0e1c1a]">26.5 <span className="text-sm font-normal text-[#8aada9]">kg</span></p>
        </div>
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-2">{t.relativeStrength}</p>
          <p className="text-2xl font-bold text-[#0e1c1a]">0.4 <span className="text-sm font-normal text-[#8aada9]">kg/kg</span></p>
        </div>
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-2">{t.squats}</p>
          <p className="text-2xl font-bold text-[#0e1c1a]">20 <span className="text-sm font-normal text-[#8aada9]">reps</span></p>
          <p className="text-[11px] text-[#c8ddd9] mt-1">corte &lt; 12 reps (edad/sexo)</p>
        </div>
      </div>

      <SectionCard title={t.newVitals}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 mb-4">
          {[["TAS", "114", "mmHg"], ["TAD", "76", "mmHg"], ["F.C.", "71", "lpm"], ["SAT O₂", "98", "%"], ["PESO", "79.5", "kg"], ["DINAMOMETRÍA", "26.5", "kg"], ["SENTADILLAS 30S", "20", "reps"]].map(([label, val, unit]) => (
            <div key={label} className="rounded-lg border border-[#e8f0ef] bg-[#f7f8f9] px-3 py-2">
              <p className="text-[9.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">{label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-[#0e1c1a]" style={{ fontFamily: "'DM Mono', monospace" }}>{val}</span>
                <span className="text-[10px] text-[#8aada9]">{unit}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#5a7a76] mb-4">
          <span>ICA: <b className="text-[#e8960c]">0.54 · Riesgo moderado</b></span>
          <span>IMC: <b className="text-[#0e1c1a]">30.9</b></span>
          <span>Fuerza rel.: <b className="text-[#0e1c1a]">0.4</b></span>
        </div>
        <button className="text-[13px] font-semibold text-white bg-[#1ab89a] px-4 py-2 rounded-full hover:bg-[#13a389] transition-colors">{t.registerVitals}</button>
      </SectionCard>

      <SectionCard title={`Historial — ${VITALS_HISTORY.length} tomas`}>
        <div className="space-y-4">
          {VITALS_HISTORY.map((v, i) => (
            <div key={i} className="pb-4 border-b border-[#f0f8f6] last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#1ab89a]" />
                <span className="text-sm font-medium text-[#0e1c1a]">{v.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill>IMC 30.9</Pill>
                <Pill>TA {v.ta}</Pill>
                <Pill>FC {v.fc}</Pill>
                <Pill>SatO₂ {v.sat}</Pill>
                <Pill>Dina {v.dina}</Pill>
                <Pill>Fuerza rel. {v.fuerza}</Pill>
                <Pill>Sentadillas {v.sentadillas}</Pill>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function InBodyTab() {
  const t = useT();
  const [selected, setSelected] = useState<number | null>(null);

  if (selected === null) {
    return (
      <SectionCard
        title={t.inbodyAnalysis}
        action={<button className="text-[12px] font-semibold text-white bg-[#1ab89a] px-3.5 py-1.5 rounded-full hover:bg-[#13a389] transition-colors">{t.uploadPdf}</button>}
      >
        <div className="space-y-2">
          {INBODY_RECORDS.map((r, i) => (
            <button
              key={r.date}
              onClick={() => setSelected(i)}
              className="w-full flex items-center justify-between gap-4 rounded-xl border border-[#e8f0ef] px-4 py-3 text-left hover:border-[#1ab89a]/40 hover:bg-[#f8fefe] transition-colors"
            >
              <div>
                <p className="text-[13px] font-semibold text-[#0e1c1a]" style={{ fontFamily: "'DM Mono', monospace" }}>{r.date}</p>
                <p className="text-[11px] text-[#8aada9]">{r.folio}</p>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-[#5a7a76]" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span>{r.peso}</span>
                <span>{r.grasa} GC</span>
                <span>{r.mme} MME</span>
                <span>{r.imc} IMC</span>
              </div>
              <span className="text-base font-bold text-[#e8960c] shrink-0">{r.score}<span className="text-[10px] font-normal text-[#8aada9]">/100</span></span>
            </button>
          ))}
        </div>
      </SectionCard>
    );
  }

  const r = INBODY_RECORDS[selected];
  return (
    <div>
      <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-[#5a7a76] hover:text-[#1ab89a] mb-4 transition-colors">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Volver a la lista
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-3">{t.originalReport}</p>
          <div className="rounded-xl border border-[#e8f0ef] bg-[#fcfcfc] p-4" style={{ fontFamily: "'DM Mono', monospace" }}>
            <p className="text-[13px] font-bold text-[#e85555] mb-2">InBody <span className="text-[#0e1c1a]">[InBody370S]</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9.5px] text-[#8aada9] mb-3 pb-2 border-b border-[#e8f0ef]">
              <span>ID {r.folio}</span><span>{t.age} 29</span><span>{t.gender} F</span><span>{r.date}</span>
            </div>
            {([[t.bodyWater, 60], [t.proteins, 45], [t.minerals, 38], [t.leanMass, 70], [t.weight, 55]] as const).map(([label, w]) => (
              <div key={label as string} className="flex items-center gap-2 mb-1.5">
                <span className="text-[9.5px] text-[#5a7a76] w-24 shrink-0">{label}</span>
                <div className="flex-1 h-2 rounded-full bg-[#eef1f4] overflow-hidden">
                  <div className="h-full bg-[#1ab89a]/70 rounded-full" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5 flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-[#e8960c]">{r.score}</p>
              <p className="text-[10px] text-[#8aada9]">{t.inbodyScore}</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-semibold text-[#0e1c1a]">{r.date}</p>
              <p className="text-[11px] text-[#8aada9]">{r.folio}</p>
            </div>
          </div>

          <SectionCard title={t.bodyComposition}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <LabelValueRow label={t.weight} value={r.peso} />
              <LabelValueRow label={t.bodyFatPct} value={r.grasa} />
              <LabelValueRow label={t.skeletalMuscle} value={r.mme} />
              <LabelValueRow label={t.bmi} value={r.imc} />
            </div>
          </SectionCard>

          <SectionCard title={t.researchParams}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <LabelValueRow label={t.visceralFat} value="18" />
              <LabelValueRow label={t.waistHipRatio} value="0.87" />
              <LabelValueRow label="TMB" value="1310 kcal" />
              <LabelValueRow label={t.recommendedCalories} value="1650 kcal" />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function EstudiosTab() {
  const t = useT();
  const [selected, setSelected] = useState(false);

  if (!selected) {
    return (
      <SectionCard
        title={`1 ${t.studiesCount}`}
        action={
          <div className="flex gap-2">
            <button className="text-[12px] font-medium text-[#5a7a76] border border-[#e8f0ef] px-3 py-1.5 rounded-full hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">{t.addFinding}</button>
            <button className="text-[12px] font-semibold text-white bg-[#1ab89a] px-3.5 py-1.5 rounded-full hover:bg-[#13a389] transition-colors">{t.addStudy}</button>
          </div>
        }
      >
        <button onClick={() => setSelected(true)} className="w-full text-left rounded-xl border border-[#e8f0ef] p-4 hover:border-[#1ab89a]/40 hover:bg-[#f8fefe] transition-colors">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="text-sm font-semibold text-[#0e1c1a]">3 sep 2026</p>
              <p className="text-xs text-[#8aada9]">{t.labName} · 39 {t.valuesCount}</p>
            </div>
            <span className="text-xs text-[#1ab89a] font-medium shrink-0">{t.viewDetail}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[`${t.labNames["Glucosa"]}: 95.1 mg/dL`, `${t.labNames["Col. Total"]}: 187.9 mg/dL`, "HDL: 74.7 mg/dL", "LDL: 101.7 mg/dL", `${t.labNames["Triglicéridos"]}: 53.7 mg/dL`, "AST/TGO: 20 U/L"].map((c) => (
              <span key={c} className="text-[11px] text-[#5a7a76] bg-[#f7f8f9] border border-[#e8f0ef] rounded-full px-2.5 py-1">{c}</span>
            ))}
            <span className="text-[11px] text-[#8aada9] px-2.5 py-1">+28 {t.more}</span>
          </div>
        </button>
      </SectionCard>
    );
  }

  return (
    <div>
      <button onClick={() => setSelected(false)} className="flex items-center gap-1.5 text-sm text-[#5a7a76] hover:text-[#1ab89a] mb-4 transition-colors">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Volver a estudios
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-3">{t.originalDocument}</p>
          <div className="rounded-xl border border-[#e8f0ef] bg-[#fcfcfc] p-4" style={{ fontFamily: "'DM Mono', monospace" }}>
            <p className="text-[12px] font-bold text-[#1ab89a] mb-2">{t.labHeader}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[9.5px] text-[#8aada9] mb-3 pb-2 border-b border-[#e8f0ef]">
              <span>Folio: 264652000114</span><span>Fecha: 3 sep 2026</span>
              <span>Paciente: expediente activo</span><span>Sexo: F</span>
            </div>
            {LAB_GROUPS[0].values.map(([label, val, unit]) => (
              <div key={label} className="flex justify-between text-[10px] text-[#5a7a76] py-0.5">
                <span>{t.labNames[label] ?? label}</span><span>{val} {unit}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionCard title={t.results} action={<button className="text-[12px] text-[#1ab89a] font-medium">{t.editValues}</button>}>
          <div className="space-y-4">
            {LAB_GROUPS.map((g) => (
              <div key={g.titleKey}>
                <p className="text-[10.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-2">{t[g.titleKey]}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  {g.values.map(([label, val, unit]) => (
                    <LabelValueRow key={label} label={t.labNames[label] ?? label} value={`${val} ${unit}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function RiskCard({ label, value, note, status }: { label: string; value: string; note: string; status: "ok" | "mod" | "high" }) {
  const border = status === "high" ? "border-[#ffd9d9]" : status === "mod" ? "border-[#ffe9c2]" : "border-[#b2e0c8]";
  const bg = status === "high" ? "bg-[#fff1f1]" : status === "mod" ? "bg-[#fff8ed]" : "bg-[#f0faf4]";
  const valColor = status === "high" ? "text-[#e85555]" : status === "mod" ? "text-[#e8960c]" : "text-[#1ab89a]";
  return (
    <div className={`rounded-2xl border ${border} ${bg} p-5`}>
      <p className={`text-2xl font-bold ${valColor}`}>{value}</p>
      <p className="text-xs text-[#0e1c1a] font-medium mt-0.5">{label}</p>
      <p className="text-xs text-[#5a7a76] mt-0.5">{note}</p>
    </div>
  );
}

function RiesgoTab() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [eoss, setEoss] = useState("2");

  return (
    <div className="space-y-4">
      <SectionCard title={t.riskPanel}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <RiskCard label="IMC kg/m²" value={String(30.9)} note="Obesidad I" status="mod" />
          <RiskCard label="Riesgo CV Framingham" value="8%" note="Bajo (<10%)" status="ok" />
          <RiskCard label="STOP-BANG" value="2/8" note="Riesgo bajo SAOS" status="ok" />
          <RiskCard label={t.metabolicSyndrome} value="2/5" note="Componentes presentes" status="mod" />
          <RiskCard label="FINDRISC DM2" value="14 pts" note="Moderado (~17%)" status="mod" />
          <RiskCard label="Fat Liver Index" value="68" note="Esteatosis probable" status="high" />
          <RiskCard label="NAFLD Fibrosis Score" value="0.2" note="Fibrosis poco probable" status="ok" />
          <RiskCard label="EOSS" value="E2" note="Comorbilidades establecidas" status="mod" />
        </div>
        <p className="text-[11px] text-[#aac4c0] leading-relaxed mt-4">
          Calculadoras de apoyo clínico calculadas automáticamente a partir del expediente. No sustituyen el juicio médico.
        </p>
      </SectionCard>

      <CollapsibleBar open={open} onToggle={() => setOpen((o) => !o)} openLabel={t.closeBreakdown} closedLabel={t.openBreakdown} icon />

      {open && (
        <div className="space-y-4">
          <SectionCard
            title={t.eossTitle}
            action={<Pill tone="amber">Sugerido · confirmar {`E${eoss}`}</Pill>}
          >
            <div className="flex items-center gap-4">
              <select
                value={eoss}
                onChange={(e) => setEoss(e.target.value)}
                className="border border-[#e8f0ef] rounded-lg px-3 py-2 text-sm text-[#0e1c1a] focus:outline-none focus:border-[#1ab89a]"
              >
                {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <div className="rounded-xl bg-[#f0faf7] px-4 py-2">
                <p className="text-lg font-bold text-[#1ab89a]">E{eoss}</p>
                <p className="text-[11px] text-[#5a7a76]">Comorbilidades establecidas</p>
              </div>
            </div>
            <p className="text-[11px] text-[#aac4c0] mt-3">
              Mostrando la sugerencia automática. Confirma o ajusta; requiere valoración clínica completa.
            </p>
          </SectionCard>

          <SectionCard title={t.insulinAdiposity}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <RiskCard label="HOMA-IR" value="3.2" note="HOMA-IR elevado (>2.5)" status="high" />
              <RiskCard label={t.tygLabel} value="4.7" note="Sin IR (<4.9)" status="ok" />
              <RiskCard label={t.vaiLabel} value="2.1" note="Adiposidad visceral elevada" status="mod" />
            </div>
          </SectionCard>

          <SectionCard title={t.sarcopeniaScreen} action={<Pill tone="teal">SARC-F: 1/10 · Bajo riesgo</Pill>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <LabelValueRow label={t.sarcStrength} value="Ninguna · 0" />
              <LabelValueRow label={t.sarcWalk} value="Ninguna · 0" />
              <LabelValueRow label={t.sarcChair} value="Alguna · 1" />
              <LabelValueRow label={t.sarcStairs} value="Ninguna · 0" />
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

function PlanTab() {
  const t = useT();
  const DOSE_DATA = [
    { date: "13 ago", value: 0.25 },
    { date: "29 ago", value: 0.5 },
    { date: "5 sep", value: 0.5 },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-xs text-[#8aada9] mb-1">{t.initialWeight}</p>
          <p className="text-xl font-bold text-[#0e1c1a]">81.0 <span className="text-sm font-normal text-[#8aada9]">kg</span></p>
        </div>
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-xs text-[#8aada9] mb-1">{t.currentWeight}</p>
          <p className="text-xl font-bold text-[#0e1c1a]">79.5 <span className="text-sm font-normal text-[#8aada9]">kg</span></p>
        </div>
        <div className="rounded-2xl border border-[#1ab89a]/30 bg-[#f0faf7] p-5">
          <p className="text-xs text-[#8aada9] mb-1">{t.weightGoal}</p>
          <p className="text-xl font-bold text-[#1ab89a]">65 <span className="text-sm font-normal text-[#5a7a76]">kg</span></p>
        </div>
        <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
          <p className="text-xs text-[#8aada9] mb-1">{t.nextAppt}</p>
          <p className="text-[15px] font-semibold text-[#0e1c1a] leading-tight">19 sep · 10:00 AM</p>
        </div>
      </div>

      <SectionCard
        title={t.establishedPlan}
        action={<button className="text-[12px] text-[#5a7a76] border border-[#e8f0ef] px-3 py-1.5 rounded-full hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">{t.modifyPlan}</button>}
      >
        <LabelValueRow label={t.treatmentType} value={t.pharmacological} />
        <LabelValueRow label="Medicamento" value="Semaglutida" />
        <LabelValueRow label="Dosis inicial" value="0.25 mg" />
        <LabelValueRow label={t.startDate} value="13 ago 2026" />
        <LabelValueRow label="Plazo estimado" value="6 meses" />
      </SectionCard>

      <SectionCard title={t.doseOverTime}>
        <AxisChart data={DOSE_DATA} suffix=" mg" decimals={2} color="#6b7ff5" />
      </SectionCard>
    </div>
  );
}

// Real body-silhouette artwork + layout math, ported from the production
// app's body-diagram.js / body-diagram.css (assets copied verbatim into
// /public/omega-body-icons and /public/omega-body-diagram).
const BODY_ART: Record<string, [number, number, number, number, number, number]> = {
  female_normal: [115.875, 10, -10, 21, 109, 99],
  female_sobrepeso: [133.875, 19, -10, 27, 125, 117],
  female_obesidad1: [147.375, 26, -10, 20, 138, 130],
  female_obesidad2: [149.625, 27, -10, 19, 140, 133],
  female_obesidad3: [149.625, 27, -10, 16, 140, 135],
  male_normal: [122.625, 14, -10, 22, 113, 91],
  male_sobrepeso: [133.875, 19, -10, 23, 125, 105],
  male_obesidad1: [146.25, 26, -10, 25, 137, 124],
  male_obesidad2: [149.625, 27, -10, 24, 140, 128],
  male_obesidad3: [149.625, 27, -10, 19, 140, 132],
};

// field, label, asset, side, y, w, h, guideY
const BODY_FIELDS = [
  ["cuello", "Cuello", "neck", "left", 30, 18, 24, 42],
  ["cintura", "Cintura", "waist", "left", 82, 16, 51, 110],
  ["pantorrilla", "Pantorrilla", "calf", "left", 198, 14, 38, 224],
  ["brazo", "Brazo", "arm", "right", 70, 21, 55, 94],
  ["cadera", "Cadera", "hip", "right", 153, 20, 45, 182],
] as const;

function conditionToLevel(cond: string) {
  if (cond === "normal") return "normal";
  if (cond === "overweight") return "sobrepeso";
  return "obesidad1";
}

function BodyDiagram({ sex, cond, measurements }: { sex: string; cond: string; measurements: Record<string, { current: number; delta: number }> }) {
  const key = `${sex === "M" ? "male" : "female"}_${conditionToLevel(cond)}`;
  const art = BODY_ART[key];
  if (!art) return null;
  const [width, ...xs] = art;

  return (
    <div className="nutri-body-diagram">
      <div className="nb-scene">
        {BODY_FIELDS.map(([field, label, , side, , , , guideY]) => {
          const m = measurements[field];
          const delta = m?.delta ?? null;
          const state = delta == null || delta === 0 ? "neutral" : delta < 0 ? "down" : "up";
          const change = delta == null ? "Sin dato previo" : `${delta === 0 ? "=" : delta < 0 ? "▼" : "▲"} ${Math.abs(delta).toFixed(1)} cm`;
          return (
            <div key={field} className={`nb-callout nb-${side} nb-${state}`} style={{ "--guide-y": guideY } as React.CSSProperties}>
              <span className="nb-guide" aria-hidden="true" />
              <div className="nb-label">
                <div className="nb-reading">
                  <span>{label}:</span> <strong>{m ? <>{m.current}<span className="nb-unit"> cm</span></> : "—"}</strong>
                </div>
                <div className="nb-change">{change}</div>
              </div>
            </div>
          );
        })}
        <span className="nb-bracket nb-bracket-left" aria-hidden="true" />
        <span className="nb-bracket nb-bracket-right" aria-hidden="true" />
        <div className="nb-figure" style={{ "--icon-width": width } as React.CSSProperties}>
          <img src={`/omega-body-icons/${key}.svg`} width={width} height={252} alt="" aria-hidden="true" />
          {BODY_FIELDS.map(([field, , asset, , y, w, h], i) => {
            const m = measurements[field];
            const delta = m?.delta ?? null;
            const state = delta == null || delta === 0 ? "neutral" : delta < 0 ? "down" : "up";
            return (
              <span
                key={field}
                className={`nb-mark nb-${state}`}
                aria-hidden="true"
                style={{ "--x": xs[i], "--y": y, "--w": w, "--h": h, "--asset": `url('/omega-body-diagram/${asset}.svg')` } as React.CSSProperties}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NutricionTab({ patient }: { patient: Patient }) {
  const t = useT();
  const [subTab, setSubTab] = useState<"nueva" | "panel">("nueva");
  const zones = [
    { label: "Cuello", color: "#7b6fff", data: [{ date: "13 ago", value: 45 }, { date: "29 ago", value: 43 }, { date: "5 sep", value: 42 }] },
    { label: "Brazo", color: "#1ab89a", data: [{ date: "13 ago", value: 38 }, { date: "29 ago", value: 37 }, { date: "5 sep", value: 36 }] },
    { label: "Cintura", color: "#e8960c", data: [{ date: "13 ago", value: 95 }, { date: "29 ago", value: 92 }, { date: "5 sep", value: 89 }] },
    { label: "Cadera", color: "#e85555", data: [{ date: "13 ago", value: 108 }, { date: "29 ago", value: 106 }, { date: "5 sep", value: 104 }] },
    { label: "Pantorrilla", color: "#3ab8c8", data: [{ date: "13 ago", value: 42 }, { date: "29 ago", value: 40 }, { date: "5 sep", value: 38 }] },
  ];

  return (
    <div className="space-y-4">
      <SectionCard title={t.circumferences}>
        <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-3">{t.newMeasures}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
          {zones.map((z) => (
            <div key={z.label} className="rounded-lg border border-[#e8f0ef] bg-[#f7f8f9] px-3 py-2">
              <p className="text-[9.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">Circunf. {z.label.toLowerCase()}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-[#0e1c1a]" style={{ fontFamily: "'DM Mono', monospace" }}>{z.data[z.data.length - 1].value}</span>
                <span className="text-[10px] text-[#8aada9]">cm</span>
              </div>
            </div>
          ))}
        </div>
        <button className="text-[13px] font-semibold text-white bg-[#1ab89a] px-4 py-2 rounded-full hover:bg-[#13a389] transition-colors">{t.registerMeasures}</button>
      </SectionCard>

      <SectionCard title="Historial — 3 tomas">
        <div className="space-y-3">
          {["5 sep 2026", "29 ago 2026", "13 ago 2026"].map((date, i) => (
            <div key={date} className="pb-3 border-b border-[#f0f8f6] last:border-0 last:pb-0">
              <p className="text-sm font-medium text-[#0e1c1a] mb-1.5">{date}</p>
              <div className="flex flex-wrap gap-2">
                {zones.map((z) => (
                  <Pill key={z.label}>{z.label.toLowerCase()}: {z.data[z.data.length - 1 - i]?.value ?? z.data[0].value} cm</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex gap-1 p-1 bg-[#f0faf7] rounded-xl w-fit border border-[#e8f0ef]">
        {([["nueva", t.measuresPanel], ["panel", t.bodyDiagram]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSubTab(key)}
            className={`text-sm px-5 py-2 rounded-lg transition-all font-medium ${
              subTab === key ? "bg-white text-[#0e1c1a] shadow-sm border border-[#e8f0ef]" : "text-[#8aada9] hover:text-[#5a7a76]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {subTab === "nueva" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((z) => (
            <div key={z.label} className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-4">
              <p className="text-xs font-semibold text-[#0e1c1a] mb-1">{z.label}</p>
              <AxisChart data={z.data} suffix=" cm" decimals={0} color={z.color} />
            </div>
          ))}
        </div>
      )}

      {subTab === "panel" && (
        <SectionCard title="Diagrama corporal">
          <BodyDiagram
            sex={patient.sex}
            cond={patient.cond}
            measurements={Object.fromEntries(
              zones.map((z) => {
                const current = z.data[z.data.length - 1].value;
                const delta = +(current - z.data[0].value).toFixed(1);
                return [z.label.toLowerCase(), { current, delta }];
              })
            )}
          />
          <p className="text-center text-xs text-[#8aada9] mt-2">
            Historial de medidas: 13 ago (inicial) → 5 sep (actual)
          </p>
        </SectionCard>
      )}
    </div>
  );
}

function ActFisicaTab() {
  const t = useT();
  return (
    <div className="space-y-4">
      <SectionCard title={t.nextSession}>
        <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-2">{t.nextApptReminder}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <button className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[#1ab89a] text-white">En N...</button>
          <button className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-[#e8f0ef] text-[#5a7a76]">{t.exactDate}</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["1 semana", "2 semanas", "1 mes", "Otro"].map((o) => (
            <button key={o} className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-[#e8f0ef] text-[#5a7a76] hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">{o}</button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={t.habits}>
        <LabelValueRow label={t.smoking} value={<span><Pill tone="amber">{t.active}</Pill> <span className="ml-2 text-[#5a7a76] font-normal text-xs">{t.smokingDetail}</span></span>} />
        <LabelValueRow label={t.vaping} value={<span><Pill tone="amber">Activo/a</Pill> <span className="ml-2 text-[#5a7a76] font-normal text-xs">diario</span></span>} />
        <LabelValueRow label={t.alcohol} value={<span><Pill>Ocasional</Pill> <span className="ml-2 text-[#5a7a76] font-normal text-xs">1-2 tecates o tequila / semana</span></span>} />
        <LabelValueRow label={t.physicalActivity} value={<span><Pill tone="teal">Muy activo/a</Pill> <span className="ml-2 text-[#5a7a76] font-normal text-xs">fuerza 5x/sem + cardio 20-30 min</span></span>} />
        <LabelValueRow label={t.sleepHours} value="6 h" />
      </SectionCard>

      <SectionCard title={t.sarcopeniaScreen} action={<Pill tone="teal">SARC-F: 0/10 · Bajo riesgo</Pill>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <LabelValueRow label={t.sarcStrength} value="Ninguna · 0" />
          <LabelValueRow label={t.sarcWalk} value="Ninguna · 0" />
          <LabelValueRow label={t.sarcChair} value="Ninguna · 0" />
          <LabelValueRow label={t.sarcStairs} value="Ninguna · 0" />
        </div>
      </SectionCard>
    </div>
  );
}

function SeguimientoTab() {
  const t = useT();
  const visits = [
    { date: "22 sep 2026", typeKey: "visitConditioning" as const, tone: "blue" as const, note: t.visitNote1 },
    { date: "5 sep 2026", typeKey: "visitFollowUp" as const, tone: "teal" as const, note: t.visitNote2 },
    { date: "13 ago 2026", typeKey: "visitFollowUp" as const, tone: "teal" as const, note: t.visitNote3 },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-5">
        <p className="text-2xl font-bold text-[#0e1c1a]">79.5 <span className="text-sm font-normal text-[#8aada9]">kg</span></p>
        <p className="text-xs text-[#8aada9]">{t.currentWeight}</p>
      </div>

      <SectionCard title={t.newConsult}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[10.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">Fecha</p>
            <div className="rounded-lg border border-[#e8f0ef] bg-[#f7f8f9] px-3 py-2 text-sm text-[#0e1c1a]">Hoy · 22 sep 2026</div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">{t.consultType}</p>
            <div className="rounded-lg border border-[#e8f0ef] bg-[#f7f8f9] px-3 py-2 text-sm text-[#0e1c1a]">Seguimiento</div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">{t.weightKg}</p>
            <div className="rounded-lg border border-[#e8f0ef] bg-[#f7f8f9] px-3 py-2 text-sm text-[#0e1c1a]">79.5</div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">IMC</p>
            <div className="rounded-lg border border-[#e8f0ef] bg-[#f7f8f9] px-3 py-2 text-sm text-[#8aada9]">auto</div>
          </div>
        </div>
        <p className="text-xs text-[#5a7a76] mb-4">
          Tratamiento: <b className="text-[#0e1c1a]">Semaglutida</b> · dosis actual <b className="text-[#0e1c1a]">0.5 mg</b> · inicio 13 ago 2026
        </p>
        <p className="text-[10.5px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">{t.clinicalNote}</p>
        <div className="rounded-lg border border-[#e8f0ef] bg-[#f7f8f9] px-3 py-2 text-sm text-[#8aada9] mb-4 min-h-[60px]">{t.clinicalNotePlaceholder}</div>
        <div className="flex justify-end">
          <button className="text-[13px] font-semibold text-white bg-[#1ab89a] px-4 py-2 rounded-full hover:bg-[#13a389] transition-colors">{t.registerConsult}</button>
        </div>
      </SectionCard>

      <SectionCard title={`Historial — ${visits.length} consultas + basal`}>
        <div className="space-y-4">
          {visits.map((v, i) => (
            <div key={i} className="pb-4 border-b border-[#f0f8f6] last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1ab89a]" />
                <span className="text-sm font-medium text-[#0e1c1a]" style={{ fontFamily: "'DM Mono', monospace" }}>{v.date}</span>
                <Pill tone={v.tone}>{t[v.typeKey]}</Pill>
              </div>
              <p className="text-sm text-[#5a7a76] pl-4">{v.note}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ── TOP-LEVEL VIEWS (Dashboard / Calendario / Estudios / WhatsApp) ─────────

const CAL_DAYS = ["D", "L", "M", "M", "J", "V", "S"];
// patient index into t.patientNames, visit-type key into the dictionary
const CAL_APPOINTMENTS = [
  { time: "09:00", p: 0, typeKey: "visitFollowUp" as const },
  { time: "10:30", p: 1, typeKey: "apptInitial" as const },
  { time: "12:00", p: 4, typeKey: "visitNutrition" as const },
  { time: "17:00", p: 6, typeKey: "visitConditioning" as const },
];

function CalendarView() {
  const t = useT();
  const today = 12;
  const busyDays = [3, 5, 12, 12, 18, 22, 27];
  const daysInMonth = 30;
  const firstWeekday = 2;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b border-[#e8f0ef] bg-white shrink-0">
        <button className="w-8 h-8 rounded-lg border border-[#e8f0ef] flex items-center justify-center text-[#5a7a76] hover:border-[#1ab89a] shrink-0">‹</button>
        <button className="w-8 h-8 rounded-lg border border-[#e8f0ef] flex items-center justify-center text-[#5a7a76] hover:border-[#1ab89a] shrink-0">›</button>
        <p className="text-base sm:text-lg font-bold text-[#0e1c1a] truncate">Septiembre 2026</p>
        <button className="text-xs sm:text-sm text-[#1ab89a] border border-[#1ab89a]/30 px-2.5 sm:px-3 py-1 rounded-full font-medium shrink-0">{t.calToday}</button>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
        <div className="flex-1 flex flex-col p-2.5 sm:p-5 lg:overflow-y-auto">
          <div className="grid grid-cols-7 gap-px bg-[#e8f0ef] border border-[#e8f0ef] rounded-t-2xl overflow-hidden shrink-0">
            {CAL_DAYS.map((d, i) => (
              <div key={i} className="bg-[#f8fefe] text-center text-[10px] sm:text-[11px] font-semibold text-[#8aada9] py-1.5 sm:py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-[#e8f0ef] border border-t-0 border-[#e8f0ef] rounded-b-2xl overflow-hidden flex-1 [grid-auto-rows:minmax(52px,1fr)] sm:[grid-auto-rows:minmax(90px,1fr)]">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`pad-${i}`} className="bg-white" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today;
              const isBusy = busyDays.includes(day);
              return (
                <div key={day} className={`bg-white p-1 sm:p-2 ${isToday ? "ring-2 ring-inset ring-[#1ab89a]" : ""}`}>
                  <span className={`text-[10px] sm:text-xs font-medium ${isToday ? "text-[#1ab89a] font-bold" : "text-[#0e1c1a]"}`}>{day}</span>
                  {isBusy && (
                    <div className="mt-1 sm:mt-1.5 space-y-1">
                      <div className="h-1 sm:h-1.5 rounded-full bg-[#1ab89a]/60 w-4/5" />
                      {day === today && <div className="hidden sm:block h-1.5 rounded-full bg-[#3ab8c8]/50 w-3/5" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[#e8f0ef] bg-white p-4 sm:p-5 lg:overflow-y-auto shrink-0">
          <p className="text-xs font-semibold text-[#0e1c1a] mb-1">Hoy · 12 sep</p>
          <p className="text-xs text-[#8aada9] mb-5">{CAL_APPOINTMENTS.length} citas agendadas</p>
          <div className="space-y-3">
            {CAL_APPOINTMENTS.map((a) => (
              <div key={a.time} className="rounded-2xl border border-[#e8f0ef] p-3.5 hover:border-[#1ab89a]/30 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#1ab89a]" style={{ fontFamily: "'DM Mono', monospace" }}>{a.time}</span>
                </div>
                <p className="text-[13px] font-medium text-[#0e1c1a] leading-tight">{t.patientNames[a.p]}</p>
                <p className="text-[11px] text-[#8aada9] mt-0.5">{t[a.typeKey]}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

const RECENT_UPLOADS = [
  { p: 0, file: "Quimica_Sanguinea_sep2026.pdf", done: true, date: "5 sep 2026" },
  { p: 1, file: "InBody_ticket_ago2026.jpg", done: true, date: "29 ago 2026" },
  { p: 3, file: "Perfil_Lipidico.pdf", done: false, date: "3 sep 2026" },
];

function EstudiosView() {
  const t = useT();
  return (
    <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e1c1a] mb-2">{t.uploadTitle}</h1>
        <p className="text-sm text-[#5a7a76] mb-6 sm:mb-8">
          Sube el PDF del laboratorio o la foto del ticket de báscula InBody para extraer automáticamente los
          valores del expediente del paciente.
        </p>

        <div className="rounded-2xl border border-[#e8f0ef] bg-[#f8fefe] p-4 mb-6 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-[#8aada9] uppercase tracking-wide mb-1">{t.activePatient}</p>
            <p className="text-sm font-medium text-[#0e1c1a] truncate">Debany Montserrat Luevano Contreras</p>
          </div>
          <button className="text-xs text-[#1ab89a] font-medium shrink-0">{t.change}</button>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-[#d0e8e4] bg-white p-6 sm:p-12 text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-[#f0faf7] flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 13V4m0 0L6 8m4-4l4 4M4 16h12" stroke="#1ab89a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[#0e1c1a] mb-1">{t.dropHere}</p>
          <p className="text-xs text-[#8aada9]">{t.orClick}</p>
        </div>

        <p className="text-xs font-semibold text-[#8aada9] uppercase tracking-wide mb-3">{t.recentUploads}</p>
        <div className="space-y-2">
          {RECENT_UPLOADS.map((u) => (
            <div key={u.file} className="rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-[#0e1c1a] truncate">{t.patientNames[u.p]}</p>
                <p className="text-[11px] text-[#8aada9] truncate">{u.file}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${u.done ? "bg-[#f0faf7] text-[#1ab89a]" : "bg-[#fff8ed] text-[#e8960c]"}`}>
                  {u.done ? t.processed : t.inReview}
                </span>
                <p className="text-[10px] text-[#c8ddd9] mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>{u.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WaPanel({ title, iconPath, count, children, disabled }: { title: string; iconPath: string; count: number; children?: ReactNode; disabled?: boolean }) {
  const t = useT();
  return (
    <div className={`rounded-2xl border border-[#e8f0ef] bg-white shadow-[0_1px_2px_rgba(14,28,26,0.04)] p-4 ${disabled ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-7 h-7 rounded-lg bg-[#f0faf7] text-[#1ab89a] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d={iconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="text-sm font-semibold text-[#0e1c1a] flex-1">{title}</span>
        <span className="text-[11px] font-medium text-[#8aada9]">{disabled ? t.waDisabled : count}</span>
      </div>
      <div className="space-y-2">
        {disabled ? <p className="text-xs text-[#c8ddd9]">{t.waComingSoon}</p> : children}
      </div>
    </div>
  );
}

function WhatsAppView() {
  const t = useT();
  const waRow = (name: string, sub: string, sent: boolean) => (
    <div key={name} className="flex items-center justify-between gap-2 py-2 border-b border-[#f0f8f6] last:border-0">
      <div className="min-w-0">
        <p className="text-[12.5px] font-medium text-[#0e1c1a] truncate">{name}</p>
        <p className="text-[11px] text-[#8aada9] truncate">{sub}</p>
      </div>
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${sent ? "bg-[#f0faf7] text-[#1ab89a]" : "bg-[#fff8ed] text-[#e8960c]"}`}>
        {sent ? t.waSent : t.waPending}
      </span>
    </div>
  );

  return (
    <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-[#d0e8e4] bg-[#f0faf7] p-4 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1ab89a] shrink-0" />
          <p className="text-sm text-[#0e1c1a]"><b>WhatsApp conectado</b> · +52 81 5500 1234</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WaPanel title={t.waConfirmations} iconPath="M3 8l3.5 3.5L13 5" count={3}>
            {waRow(t.waNames[0], t.waApptTomorrow, false)}
            {waRow(t.waNames[1], t.waAppt2Days, true)}
            {waRow(t.waNames[2], t.waAppt7Days, false)}
          </WaPanel>
          <WaPanel title={t.waReminders} iconPath="M8 3v5l3 2" count={2}>
            {waRow(t.patientNames[2], t.waFollowUpReminder, false)}
            {waRow(t.patientNames[8], t.waControlReminder, true)}
          </WaPanel>
          <WaPanel title={t.waPayments} iconPath="M2 6h12M2 10h6" disabled count={0} />
          <WaPanel title={t.waNeedsAttention} iconPath="M8 5v3.5M8 11h.01" count={1}>
            {waRow(t.patientNames[9], t.waNoAnswer, false)}
          </WaPanel>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

const NAV_VIEWS = [
  ["dash", "navPanel", "M3 13h4v7H3v-7zM10 8h4v12h-4V8zM17 3h4v17h-4V3z"],
  ["cal", "navCalendar", "M4 6h16M7 3v4M17 3v4M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"],
  ["est", "navUpload", "M9 15V5m0 0L5 9m4-4l4 4M4 17h16"],
  ["wa", "navWhatsApp", "M4 20l1.3-3.9A7.9 7.9 0 1112 20a7.9 7.9 0 01-4.1-1.1L4 20z"],
] as const;

const DEMO_LANG_KEY = "omega-demo-lang";

// Outer shell owns the language so everything below can read it via useT().
// The landing page links through as /omega/demo?lang=xx; after that the choice
// persists so switching views doesn't reset it.
export function OmegaDemo() {
  const [params] = useSearchParams();
  const [lang, setLang] = useState<DemoLang>("es");

  useEffect(() => {
    const fromUrl = params.get("lang");
    if (isDemoLang(fromUrl)) { setLang(fromUrl); return; }
    try {
      const stored = window.localStorage.getItem(DEMO_LANG_KEY);
      if (isDemoLang(stored)) setLang(stored);
    } catch {
      // localStorage unavailable, stay on the default
    }
  }, [params]);

  function changeLang(next: DemoLang) {
    setLang(next);
    try { window.localStorage.setItem(DEMO_LANG_KEY, next); } catch { /* ignore */ }
  }

  return (
    <DemoTContext.Provider value={DEMO_T[lang]}>
      <DemoUI lang={lang} onLangChange={changeLang} />
    </DemoTContext.Provider>
  );
}

function DemoUI({ lang, onLangChange }: { lang: DemoLang; onLangChange: (l: DemoLang) => void }) {
  const t = useT();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"dash" | "cal" | "est" | "wa">("dash");
  const [navOpen, setNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [mobilePane, setMobilePane] = useState<"list" | "detail">("list");

  const filtered = PATIENTS.filter((p) =>
    patientName(t, p).toLowerCase().includes(search.toLowerCase())
  );
  const patient = PATIENTS.find((p) => p.id === selectedId)!;
  const activeViewMeta = NAV_VIEWS.find((v) => v[0] === activeView)!;

  return (
    <div className="flex flex-col h-screen bg-[#f8fefe]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* DEMO DISCLAIMER */}
      <div className="shrink-0 bg-[#0e1c1a] text-white text-center py-1.5 text-[11px] tracking-wide px-4">
        {t.disclaimer}
      </div>

      {/* TOP NAV — logo + tabs left-aligned, single action right, matching the real app's layout.
          Below md, the tab row collapses into a dropdown (same pattern as the real app's mobile nav). */}
      <nav className="relative bg-white border-b border-[#e8f0ef] px-3 sm:px-6 h-14 flex items-center gap-2 shrink-0 shadow-[0_1px_2px_rgba(14,28,26,0.04)]">
        <button onClick={() => navigate("/omega")} className="flex items-center gap-2 sm:gap-2.5 mr-auto shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#1ab89a] flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="font-semibold text-[14px] text-[#0e1c1a] leading-tight">Omega</p>
            <p className="text-[11px] text-[#8aada9] leading-tight">{t.clinic}</p>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_VIEWS.map(([key, labelKey, path]) => (
            <button
              key={key}
              onClick={() => setActiveView(key)}
              className={`text-[13px] px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
                activeView === key
                  ? "bg-[#f0faf7] text-[#1ab89a] font-semibold"
                  : "text-[#5a7a76] hover:bg-[#f7f8f9] hover:text-[#0e1c1a]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t[labelKey]}
            </button>
          ))}
        </div>

        {/* Mobile: current view as a dropdown trigger */}
        <button
          onClick={() => setNavOpen((o) => !o)}
          className="md:hidden flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-full font-semibold bg-[#f0faf7] text-[#1ab89a]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d={activeViewMeta[2]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t[activeViewMeta[1]]}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${navOpen ? "rotate-180" : ""}`}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="ml-auto flex items-center border border-[#e8f0ef] rounded-full overflow-hidden text-[11px] font-semibold shrink-0 mr-2">
          {(["es", "en", "pt"] as const).map((code) => (
            <button
              key={code}
              onClick={() => onLangChange(code)}
              aria-pressed={lang === code}
              className={`px-1.5 sm:px-2 py-1.5 transition-colors ${
                lang === code ? "bg-[#0e1c1a] text-white" : "text-[#8aada9] hover:text-[#0e1c1a]"
              }`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/omega")}
          className="text-[12px] sm:text-[12.5px] font-medium text-[#5a7a76] border border-[#e8f0ef] px-2.5 sm:px-3.5 py-1.5 rounded-lg hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors shrink-0"
        >
          <span className="sm:hidden">{t.exitShort}</span>
          <span className="hidden sm:inline">{t.exit}</span>
        </button>

        {navOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#e8f0ef] shadow-[0_4px_16px_rgba(14,28,26,0.08)] p-2 z-20">
            {NAV_VIEWS.map(([key, labelKey, path]) => (
              <button
                key={key}
                onClick={() => { setActiveView(key); setNavOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                  activeView === key ? "bg-[#f0faf7] text-[#1ab89a] font-semibold" : "text-[#5a7a76] hover:bg-[#f7f8f9]"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t[labelKey]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {activeView === "cal" && <CalendarView />}
      {activeView === "est" && <EstudiosView />}
      {activeView === "wa" && <WhatsAppView />}

      {activeView === "dash" && (
      <div className="flex flex-1 min-h-0">
        {/* SIDEBAR — full-width pane on mobile (list/detail toggle), fixed column on desktop */}
        <aside className={`${mobilePane === "detail" ? "hidden" : "flex"} md:flex w-full md:w-[300px] bg-white border-r border-[#e8f0ef] flex-col shrink-0`}>
          <div className="p-3.5 border-b border-[#e8f0ef]">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8aada9]" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#f7f8f9] border border-[#e8f0ef] rounded-[10px] pl-8 pr-3 py-2 text-[13px] text-[#0e1c1a] placeholder:text-[#8aada9] focus:outline-none focus:border-[#1ab89a] focus:bg-white transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-3.5 pt-2 pb-1">
            <span className="text-[10.5px] text-[#8aada9] font-semibold uppercase tracking-wider">{t.patients}</span>
            <button className="text-[11.5px] font-semibold text-white bg-[#1ab89a] px-3 py-[5px] rounded-full hover:bg-[#13a389] transition-colors">
              + Nuevo
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedId(p.id); setActiveTab(0); setMobilePane("detail"); }}
                className={`w-full flex items-center gap-2.5 pl-[11px] pr-3.5 py-2.5 border-l-[3px] text-left transition-colors ${
                  selectedId === p.id ? "bg-[#f0faf7] border-[#1ab89a]" : "border-transparent hover:bg-[#f7f8f9]"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-semibold shrink-0"
                  style={{ background: avatarGradient(p.sex) }}
                >
                  {patientInitials(t, p)}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#0e1c1a] truncate leading-tight">
                    {patientName(t, p)}
                  </p>
                  <p className="text-[11px] text-[#5a7a76] mt-px">{p.age} {t.years} · {genderLabel(t, p)}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className={`${mobilePane === "list" ? "hidden" : "block"} md:block flex-1 overflow-y-auto`}>
          {/* Patient header */}
          <div className="bg-white border-b border-[#e8f0ef] px-4 sm:px-7 py-4 sm:py-5">
            <button
              onClick={() => setMobilePane("list")}
              className="md:hidden flex items-center gap-1.5 text-sm text-[#5a7a76] hover:text-[#1ab89a] py-2 -mt-1 mb-1 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {t.backToPatients}
            </button>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
                  style={{ background: avatarGradient(patient.sex) }}
                >
                  {patientInitials(t, patient)}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#0e1c1a] mb-1.5">{patientName(t, patient)}</h1>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Pill tone="blue" icon={<svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>}>
                      {t.doctors[patient.doctorIdx]}
                    </Pill>
                    <Pill>{medLabel(t, patient)}</Pill>
                    <Pill tone="teal">{genderLabel(t, patient)}</Pill>
                    <Pill tone={conditionTone(patient.cond)}>{patient.age} {t.years}</Pill>
                    <Pill tone={conditionTone(patient.cond)}>{patient.bmi} {t.bmi} · {condLabel(t, patient.cond)}</Pill>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-[#5a7a76] border border-[#e8f0ef] px-4 py-2 rounded-full hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M11 2l3 3-8 8H3v-3L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Editar
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-5 -mb-px overflow-x-auto">
              {t.tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`text-sm px-4 py-2 rounded-t-lg border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === i
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
          <div className="px-4 sm:px-7 py-4 sm:py-6">
            {activeTab === 0 && <ResumenTab patient={patient} />}
            {activeTab === 3 && <InBodyTab />}
            {activeTab === 4 && <EstudiosTab />}
            {activeTab === 2 && <SignosTab />}
            {activeTab === 1 && <AntecedentesTab />}
            {activeTab === 7 && <NutricionTab patient={patient} />}
            {activeTab === 5 && <RiesgoTab />}
            {activeTab === 6 && <PlanTab />}
            {activeTab === 8 && <ActFisicaTab />}
            {activeTab === 9 && <SeguimientoTab />}
          </div>
        </main>
      </div>
      )}
    </div>
  );
}
