import { useState } from "react";
import PatientRecords from "./PatientRecords";

const NAV = ["Services", "Patients", "About", "Contact"];

const STATS = [
  { value: "12,400+", label: "Patients served" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "340+", label: "Specialists" },
  { value: "24/7", label: "Care available" },
];

const SERVICES = [
  {
    num: "01",
    title: "General Medicine",
    desc: "Comprehensive primary care for individuals and families, with continuity across every stage of life.",
  },
  {
    num: "02",
    title: "Diagnostics & Lab",
    desc: "In-clinic laboratory testing and imaging with results delivered directly to your care team.",
  },
  {
    num: "03",
    title: "Cardiology",
    desc: "Non-invasive cardiac assessments, ECG monitoring, and specialist-led treatment planning.",
  },
  {
    num: "04",
    title: "Mental Health",
    desc: "Evidence-based therapy, psychiatric care, and wellness programs tailored to each patient.",
  },
  {
    num: "05",
    title: "Pediatrics",
    desc: "Compassionate care for children from newborns through adolescence, including vaccinations and growth tracking.",
  },
  {
    num: "06",
    title: "Telemedicine",
    desc: "Secure video consultations from home, with prescriptions and referrals handled online.",
  },
];

const APPOINTMENTS = [
  { time: "09:00", name: "Sarah Chen", type: "General checkup", status: "Confirmed" },
  { time: "10:15", name: "Marcus Webb", type: "Post-op review", status: "Confirmed" },
  { time: "11:30", name: "Lena Kowalski", type: "Blood panel", status: "Pending" },
  { time: "14:00", name: "Tariq Ansari", type: "Cardiology consult", status: "Confirmed" },
  { time: "15:45", name: "Diana Ferreira", type: "Telemedicine", status: "Pending" },
];

const TEAM = [
  { name: "Dr. Aisha Omondi", role: "Chief Medical Officer", dept: "Internal Medicine" },
  { name: "Dr. Lucas Martín", role: "Cardiologist", dept: "Cardiology" },
  { name: "Dr. Yumi Tanaka", role: "Pediatrician", dept: "Pediatrics" },
  { name: "Dr. René Dupont", role: "Psychiatrist", dept: "Mental Health" },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [view, setView] = useState<"landing" | "patients">("landing");

  if (view === "patients") {
    return <PatientRecords onBack={() => setView("landing")} />;
  }

  return (
    <div className="min-h-full bg-white text-[#0e1c1a]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8f0ef]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1ab89a] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[#0e1c1a]">Medinex</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n}
                onClick={() => n === "Patients" ? setView("patients") : setActiveNav(n)}
                className={`text-sm transition-colors ${activeNav === n ? "text-[#1ab89a]" : "text-[#5a7a76] hover:text-[#0e1c1a]"}`}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            onClick={() => setView("patients")}
            className="bg-[#0e1c1a] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#1ab89a] transition-colors font-medium"
          >
            Patient records
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f0faf7] text-[#1ab89a] text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1ab89a]" />
              Now accepting new patients
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#0e1c1a] mb-6">
              Healthcare that
              <br />
              <span className="text-[#1ab89a]">puts you first.</span>
            </h1>
            <p className="text-[#5a7a76] text-lg leading-relaxed mb-10 max-w-sm font-light">
              Modern, compassionate care for every stage of life — all under one roof, with technology that makes it seamless.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#1ab89a] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#13a389] transition-colors">
                Book an appointment
              </button>
              <button className="border border-[#d0e8e4] text-[#0e1c1a] px-7 py-3.5 rounded-full font-medium text-sm hover:border-[#1ab89a] hover:text-[#1ab89a] transition-colors">
                Learn more
              </button>
            </div>
          </div>

          {/* Appointment preview card */}
          <div className="relative">
            <div className="bg-white border border-[#e8f0ef] rounded-2xl shadow-sm shadow-[#c8e4df]/40 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-[#8aada9] font-medium mb-0.5">Today's schedule</p>
                  <p className="text-base font-semibold text-[#0e1c1a]">Tuesday, 3 Sep</p>
                </div>
                <div className="bg-[#f0faf7] text-[#1ab89a] text-xs font-medium px-3 py-1.5 rounded-full">
                  5 appointments
                </div>
              </div>

              <div className="space-y-2">
                {APPOINTMENTS.slice(0, 4).map((a) => (
                  <div key={a.time} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8fefe] transition-colors">
                    <div className="w-10 text-center">
                      <span className="text-xs font-medium text-[#1ab89a]" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {a.time}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0e1c1a] truncate">{a.name}</p>
                      <p className="text-xs text-[#8aada9]">{a.type}</p>
                    </div>
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      a.status === "Confirmed"
                        ? "bg-[#f0faf7] text-[#1ab89a]"
                        : "bg-[#f5f5f5] text-[#8aada9]"
                    }`}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat chip */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-[#e8f0ef] rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#f0faf7] rounded-lg flex items-center justify-center text-[#1ab89a] text-lg font-bold">↑</div>
              <div>
                <p className="text-xs text-[#8aada9]">Avg. wait time</p>
                <p className="text-sm font-semibold text-[#0e1c1a]">7 min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[#e8f0ef] bg-[#f8fefe]">
        <div className="max-w-6xl mx-auto px-6 py-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#e8f0ef]">
            {STATS.map((s) => (
              <div key={s.label} className="px-8 py-8 text-center">
                <p className="text-3xl font-extrabold text-[#0e1c1a] mb-1">{s.value}</p>
                <p className="text-sm text-[#8aada9]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          <div className="lg:pt-2">
            <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">What we offer</p>
            <h2 className="text-3xl font-extrabold text-[#0e1c1a] leading-tight mb-4">Our specialties</h2>
            <p className="text-[#5a7a76] text-sm leading-relaxed font-light">
              From prevention to recovery, our clinic covers the full spectrum of care with dedicated specialists.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-[#e8f0ef] border border-[#e8f0ef] rounded-2xl overflow-hidden">
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className="bg-white p-7 hover:bg-[#f8fefe] transition-colors group cursor-pointer"
              >
                <p className="text-xs text-[#c8ddd9] font-medium mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {s.num}
                </p>
                <h3 className="text-[15px] font-semibold text-[#0e1c1a] mb-2 group-hover:text-[#1ab89a] transition-colors">{s.title}</h3>
                <p className="text-sm text-[#8aada9] leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-[#f8fefe] border-y border-[#e8f0ef]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">Our people</p>
              <h2 className="text-3xl font-extrabold text-[#0e1c1a]">Meet the team</h2>
            </div>
            <button className="text-sm text-[#5a7a76] hover:text-[#1ab89a] transition-colors hidden md:block">
              View all specialists →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((t) => (
              <div key={t.name} className="bg-white border border-[#e8f0ef] rounded-2xl p-6 hover:border-[#1ab89a]/30 hover:shadow-sm transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1ab89a] to-[#3ab8c8] mb-4 flex items-center justify-center text-white font-bold text-lg">
                  {t.name.split(" ").pop()![0]}
                </div>
                <p className="font-semibold text-[#0e1c1a] text-sm mb-0.5">{t.name}</p>
                <p className="text-xs text-[#5a7a76] mb-1">{t.role}</p>
                <p className="text-xs text-[#1ab89a] font-medium">{t.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-3">Simple process</p>
          <h2 className="text-3xl font-extrabold text-[#0e1c1a]">Getting care is easy</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-[#e8f0ef]" />
          {[
            { step: "1", title: "Book online", desc: "Choose a specialist, pick a time, and confirm your visit in under 2 minutes." },
            { step: "2", title: "Meet your doctor", desc: "Arrive or connect via video — your care team reviews your history in advance." },
            { step: "3", title: "Follow-up care", desc: "Get your results, prescriptions, and next steps sent directly to your account." },
          ].map((s) => (
            <div key={s.step} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-[#f0faf7] border border-[#d0e8e4] mx-auto mb-5 flex items-center justify-center">
                <span className="text-xl font-extrabold text-[#1ab89a]">{s.step}</span>
              </div>
              <h3 className="font-semibold text-[#0e1c1a] mb-2">{s.title}</h3>
              <p className="text-sm text-[#8aada9] leading-relaxed font-light max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-[#0e1c1a] rounded-2xl px-10 py-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, #1ab89a 0%, transparent 60%), radial-gradient(circle at 70% 50%, #3ab8c8 0%, transparent 60%)"
          }} />
          <div className="relative">
            <p className="text-xs font-semibold text-[#1ab89a] tracking-widest uppercase mb-4">Ready to start?</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
              Your health, our priority.
            </h2>
            <p className="text-[#5a8a82] text-base mb-8 max-w-sm mx-auto font-light">
              Join thousands of patients who trust Medinex for their everyday and specialist care.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="bg-[#1ab89a] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#13a389] transition-colors">
                Book your first visit
              </button>
              <button className="border border-white/20 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:border-white/40 transition-colors">
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e8f0ef]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#1ab89a] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-semibold text-sm text-[#0e1c1a]">Medinex</span>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "HIPAA", "Accessibility"].map((l) => (
              <button key={l} className="text-xs text-[#8aada9] hover:text-[#0e1c1a] transition-colors">{l}</button>
            ))}
          </div>
          <p className="text-xs text-[#c8ddd9]">© 2026 Medinex Health Systems</p>
        </div>
      </footer>
    </div>
  );
}
