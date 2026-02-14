import { useState, useEffect, useRef } from "react";

// ============================================================
// QUEEK ONBOARDING — Designed for Marcus
// Psychology: Belonging, Agency, Dignity. No forms. No walls.
// ============================================================

const STEPS = [
  "welcome",
  "name",
  "truth",
  "skills",
  "signal",
  "ready",
];

// Warm, human color system — not a tech app, a door opening
const C = {
  bg: "#F5EFE6",          // warm cream — safe, warm, not clinical
  bgDeep: "#EDE3D5",      // slightly deeper cream
  ink: "#1A120B",         // deep warm brown — not harsh black
  inkSoft: "#5C4A35",     // medium warm brown
  inkMuted: "#9C8570",    // muted warm brown
  gold: "#C8873A",        // warm amber gold — achievement, worth
  goldLight: "#F0B96B",   // lighter gold
  goldGlow: "#C8873A22",  
  affirm: "#2D6A4F",      // deep forest green — growth, go
  affirmLight: "#52B788", // lighter green
  affirmGlow: "#2D6A4F22",
  white: "#FDFAF6",       // warm white
  border: "#D4C5B0",      // warm border
};

const SKILL_OPTIONS = [
  { id: "tech", label: "Technology", icon: "💻" },
  { id: "security", label: "Security & Compliance", icon: "🔐" },
  { id: "trades", label: "Skilled Trades", icon: "🔧" },
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
  { id: "logistics", label: "Logistics & Warehouse", icon: "📦" },
  { id: "finance", label: "Finance & Accounting", icon: "📊" },
  { id: "hospitality", label: "Hospitality & Food", icon: "🍽️" },
  { id: "education", label: "Education & Training", icon: "📚" },
  { id: "admin", label: "Admin & Operations", icon: "📋" },
];

// ============================================================
// TINY COMPONENTS
// ============================================================

function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function WordByWord({ text, delay = 0, style = {} }) {
  const words = text.split(" ");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((c) => {
          if (c >= words.length) { clearInterval(interval); return c; }
          return c + 1;
        });
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(start);
  }, []);
  return (
    <span style={style}>
      {words.slice(0, count).join(" ")}
      {count < words.length && count > 0 ? " " : ""}
    </span>
  );
}

function GoldButton({ children, onClick, disabled, secondary }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: "100%",
        padding: "18px 24px",
        background: secondary
          ? "transparent"
          : disabled
          ? C.border
          : pressed
          ? "#A06B28"
          : C.gold,
        border: secondary ? `2px solid ${C.border}` : "none",
        borderRadius: 14,
        color: secondary ? C.inkSoft : disabled ? C.inkMuted : C.white,
        fontWeight: 800,
        fontSize: 16,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Playfair Display', Georgia, serif",
        letterSpacing: 0.3,
        transition: "all 0.2s ease",
        boxShadow: disabled || secondary ? "none" : pressed
          ? "0 2px 8px rgba(200, 135, 58, 0.3)"
          : "0 4px 20px rgba(200, 135, 58, 0.35)",
        transform: pressed ? "scale(0.99)" : "scale(1)",
      }}
    >
      {children}
    </button>
  );
}

// ============================================================
// STEP SCREENS
// ============================================================

function StepWelcome({ onNext }) {
  return (
    <div style={{ textAlign: "center", paddingTop: 40 }}>
      {/* Logo */}
      <FadeIn delay={100}>
        <div style={{
          fontSize: 38,
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.ink,
          letterSpacing: -1,
          marginBottom: 6,
        }}>
          Qu<span style={{ color: C.gold }}>ee</span>k
        </div>
        <div style={{ fontSize: 12, color: C.inkMuted, letterSpacing: 2, textTransform: "uppercase" }}>
          Edmonton · Canada
        </div>
      </FadeIn>

      {/* Human illustration placeholder — warm circle */}
      <FadeIn delay={400}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 35%, ${C.goldLight}, ${C.gold})`,
          margin: "40px auto 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          boxShadow: `0 8px 40px ${C.goldGlow}`,
        }}>
          🤝
        </div>
      </FadeIn>

      {/* Core message */}
      <FadeIn delay={700}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.ink,
          lineHeight: 1.25,
          marginBottom: 16,
          padding: "0 8px",
        }}>
          Your skills are real.
          <br />
          <span style={{ color: C.gold }}>This time, they'll be seen.</span>
        </h1>
      </FadeIn>

      <FadeIn delay={1100}>
        <p style={{
          fontSize: 16,
          color: C.inkSoft,
          lineHeight: 1.7,
          marginBottom: 40,
          padding: "0 8px",
        }}>
          No resume black holes. No ghosting.
          No "Canadian experience required."
          <br /><br />
          Just your verified skills, matched instantly
          to Edmonton employers who are ready right now.
        </p>
      </FadeIn>

      <FadeIn delay={1500}>
        <GoldButton onClick={onNext}>Let's do this →</GoldButton>
      </FadeIn>

      <FadeIn delay={1800}>
        <p style={{ fontSize: 12, color: C.inkMuted, marginTop: 16 }}>
          Takes less than 3 minutes. No resume needed.
        </p>
      </FadeIn>
    </div>
  );
}

function StepName({ onNext }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 800);
  }, []);

  return (
    <div>
      <FadeIn delay={200}>
        <div style={{
          fontSize: 13,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 20,
        }}>
          First things first
        </div>
        <h2 style={{
          fontSize: 30,
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.ink,
          lineHeight: 1.2,
          marginBottom: 12,
        }}>
          What do people
          <br />call you?
        </h2>
        <p style={{ fontSize: 15, color: C.inkSoft, marginBottom: 36, lineHeight: 1.6 }}>
          Not your full legal name. Not your title.
          Just what you go by.
        </p>
      </FadeIn>

      <FadeIn delay={500}>
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext(name.trim())}
          placeholder="e.g. Marcus"
          style={{
            width: "100%",
            padding: "18px 20px",
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "'Playfair Display', Georgia, serif",
            color: C.ink,
            background: C.white,
            border: `2px solid ${name ? C.gold : C.border}`,
            borderRadius: 14,
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.3s ease",
            boxShadow: name ? `0 0 0 4px ${C.goldGlow}` : "none",
            marginBottom: 24,
          }}
        />

        {name && (
          <FadeIn delay={0}>
            <div style={{
              background: C.affirmGlow,
              border: `1px solid ${C.affirmLight}`,
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 14,
              color: C.affirm,
              fontWeight: 600,
              marginBottom: 24,
            }}>
              Good to meet you, {name}. 👋
            </div>
          </FadeIn>
        )}

        <GoldButton onClick={() => onNext(name.trim())} disabled={!name.trim()}>
          That's me →
        </GoldButton>
      </FadeIn>
    </div>
  );
}

function StepTruth({ name, onNext }) {
  const [read, setRead] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRead(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <FadeIn delay={200}>
        <div style={{
          fontSize: 13,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 20,
        }}>
          Something we need to say
        </div>
        <h2 style={{
          fontSize: 28,
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.ink,
          lineHeight: 1.25,
          marginBottom: 28,
        }}>
          {name}, the system
          <br />
          <span style={{ color: C.gold }}>has not been fair to you.</span>
        </h2>
      </FadeIn>

      <FadeIn delay={700}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginBottom: 32,
        }}>
          {[
            { icon: "📄", text: "ATS software filters your name before a human reads it" },
            { icon: "🌍", text: '"Canadian experience required" is a closed door for newcomers' },
            { icon: "👻", text: "Ghosting after interviews is normalized, not shameful" },
            { icon: "📊", text: "Black and immigrant youth face 22%+ unemployment — not from lack of skill" },
          ].map((item, i) => (
            <FadeIn key={i} delay={700 + i * 200}>
              <div style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "14px 16px",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.6 }}>{item.text}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={1600}>
        <div style={{
          background: C.goldGlow,
          border: `1px solid ${C.gold}55`,
          borderRadius: 14,
          padding: "18px 20px",
          marginBottom: 28,
          fontSize: 15,
          color: C.ink,
          lineHeight: 1.7,
          fontWeight: 500,
        }}>
          <strong style={{ color: C.gold }}>Queek was built because of this.</strong>
          {" "}Employers on our platform see your verified skills and your match score. 
          Not your name. Not your school. Not your country of origin. Not until after they say yes.
        </div>
      </FadeIn>

      {read && (
        <FadeIn delay={0}>
          <GoldButton onClick={onNext}>
            I'm ready to be matched fairly →
          </GoldButton>
        </FadeIn>
      )}
    </div>
  );
}

function StepSkills({ name, onNext }) {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  return (
    <div>
      <FadeIn delay={200}>
        <div style={{
          fontSize: 13,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 20,
        }}>
          Your areas
        </div>
        <h2 style={{
          fontSize: 28,
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.ink,
          lineHeight: 1.25,
          marginBottom: 10,
        }}>
          What kind of work
          <br />are you built for?
        </h2>
        <p style={{ fontSize: 14, color: C.inkSoft, marginBottom: 28, lineHeight: 1.6 }}>
          Pick everything that fits. Don't sell yourself short.
        </p>
      </FadeIn>

      <FadeIn delay={400}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 28,
        }}>
          {SKILL_OPTIONS.map((s, i) => {
            const active = selected.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                style={{
                  padding: "14px 12px",
                  background: active ? C.gold : C.white,
                  border: `2px solid ${active ? C.gold : C.border}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s ease",
                  boxShadow: active ? `0 4px 16px ${C.goldGlow}` : "none",
                  transform: active ? "scale(1.02)" : "scale(1)",
                }}
              >
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: active ? C.white : C.inkSoft,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <FadeIn delay={0}>
            <div style={{
              fontSize: 13,
              color: C.affirm,
              fontWeight: 600,
              marginBottom: 16,
              textAlign: "center",
            }}>
              ✓ {selected.length} area{selected.length > 1 ? "s" : ""} selected
            </div>
          </FadeIn>
        )}

        <GoldButton
          onClick={() => onNext(selected)}
          disabled={selected.length === 0}
        >
          These are my strengths →
        </GoldButton>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button
            onClick={() => onNext(["general"])}
            style={{
              background: "none",
              border: "none",
              color: C.inkMuted,
              fontSize: 13,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            I'll add this later
          </button>
        </div>
      </FadeIn>
    </div>
  );
}

function StepSignal({ name, skills, onNext }) {
  const [rate, setRate] = useState(25);

  return (
    <div>
      <FadeIn delay={200}>
        <div style={{
          fontSize: 13,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 20,
        }}>
          Know your worth
        </div>
        <h2 style={{
          fontSize: 28,
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.ink,
          lineHeight: 1.25,
          marginBottom: 10,
        }}>
          What's the least
          <br />
          <span style={{ color: C.gold }}>you'll accept per hour?</span>
        </h2>
        <p style={{ fontSize: 14, color: C.inkSoft, marginBottom: 32, lineHeight: 1.6 }}>
          This is your floor — not your ceiling. 
          Jobs below this will never reach you. 
          No more wasting time on offers that disrespect your work.
        </p>
      </FadeIn>

      <FadeIn delay={500}>
        {/* Rate display */}
        <div style={{
          textAlign: "center",
          marginBottom: 28,
        }}>
          <div style={{
            fontSize: 64,
            fontWeight: 900,
            fontFamily: "'Playfair Display', Georgia, serif",
            color: C.ink,
            lineHeight: 1,
          }}>
            ${rate}
            <span style={{ fontSize: 24, color: C.inkMuted, fontWeight: 400 }}>/hr</span>
          </div>
          <div style={{
            fontSize: 13,
            color: rate >= 30 ? C.affirm : C.inkMuted,
            marginTop: 8,
            fontWeight: 600,
            transition: "color 0.3s",
          }}>
            {rate < 20 ? "⚠ Alberta minimum is $15/hr" :
             rate < 25 ? "Entry level range" :
             rate < 35 ? "Competitive range for Edmonton" :
             rate < 50 ? "✓ Strong market position" :
             rate < 75 ? "✓ Senior / specialized range" :
             "✓ Executive / expert range"}
          </div>
        </div>

        {/* Slider */}
        <div style={{ marginBottom: 12 }}>
          <input
            type="range"
            min={15}
            max={150}
            step={5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: C.gold,
              height: 6,
              cursor: "pointer",
            }}
          />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: C.inkMuted,
            marginTop: 6,
          }}>
            <span>$15/hr</span>
            <span>$150/hr</span>
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: "14px 16px",
            fontSize: 13,
            color: C.inkSoft,
            lineHeight: 1.6,
          }}>
            💡 In Edmonton, the median hourly wage is <strong style={{ color: C.ink }}>$30.50</strong>. 
            IT and compliance roles typically range from <strong style={{ color: C.ink }}>$40–$80/hr</strong>.
          </div>
        </div>

        <GoldButton onClick={() => onNext(rate)}>
          Set my floor at ${rate}/hr →
        </GoldButton>
      </FadeIn>
    </div>
  );
}

function StepReady({ name, skills, rate }) {
  const [animDone, setAnimDone] = useState(false);
  const [matchCount] = useState(Math.floor(Math.random() * 8) + 4);

  useEffect(() => {
    const t = setTimeout(() => setAnimDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <FadeIn delay={200}>
        <div style={{
          fontSize: 13,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          {animDone ? "You're in." : "Building your signal..."}
        </div>
      </FadeIn>

      {/* Animated match finding */}
      <div style={{
        width: 140,
        height: 140,
        borderRadius: "50%",
        margin: "0 auto 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: animDone
          ? `radial-gradient(circle, ${C.affirmLight}, ${C.affirm})`
          : `radial-gradient(circle, ${C.goldLight}, ${C.gold})`,
        boxShadow: animDone
          ? `0 0 60px ${C.affirmGlow}`
          : `0 0 60px ${C.goldGlow}`,
        fontSize: 56,
        transition: "all 0.8s ease",
        animation: animDone ? "none" : "pulse 1.2s infinite",
      }}>
        {animDone ? "✓" : "⚡"}
      </div>

      {animDone ? (
        <>
          <FadeIn delay={100}>
            <h2 style={{
              fontSize: 30,
              fontWeight: 900,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: C.ink,
              lineHeight: 1.25,
              marginBottom: 12,
            }}>
              {name}, you have
              <br />
              <span style={{ color: C.affirm }}>{matchCount} matches waiting.</span>
            </h2>
            <p style={{ fontSize: 15, color: C.inkSoft, marginBottom: 32, lineHeight: 1.7 }}>
              Edmonton employers paying <strong>${rate}+/hr</strong>. 
              Matched to your skills. 
              No application needed — just say you're interested.
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 32,
            }}>
              {[
                { label: "Trust tier", value: "Identity Verified ✓", color: C.affirm },
                { label: "Your floor", value: `$${rate}/hr`, color: C.ink },
                { label: "Skill areas", value: `${Math.max(skills?.length || 1, 1)} selected`, color: C.ink },
                { label: "Visible to bias", value: "None. Zero. 0.", color: C.gold },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                }}>
                  <span style={{ fontSize: 13, color: C.inkMuted }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={700}>
            <GoldButton onClick={() => alert("🚀 This is where the matching engine launches!\n\nIn the full app, you'd see your " + matchCount + " live Edmonton matches right now.")}>
              Show me my matches →
            </GoldButton>
          </FadeIn>

          <FadeIn delay={900}>
            <p style={{ fontSize: 12, color: C.inkMuted, marginTop: 16, lineHeight: 1.6 }}>
              Employers see your skills and score first.
              <br />Your name is revealed only after mutual interest.
            </p>
          </FadeIn>
        </>
      ) : (
        <FadeIn delay={400}>
          <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.7 }}>
            Scanning Edmonton's live job market
            <br />for your verified skill matches...
          </p>
        </FadeIn>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200, 135, 58, 0.3); }
          50% { box-shadow: 0 0 60px rgba(200, 135, 58, 0.6); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// PROGRESS DOTS — visible but gentle, not "Step 4 of 6"
// ============================================================
function ProgressDots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 36 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 24 : 7,
            height: 7,
            borderRadius: 4,
            background: i < current ? C.gold : i === current ? C.gold : C.border,
            opacity: i > current ? 0.4 : 1,
            transition: "all 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", skills: [], rate: 25 });

  const goNext = (payload) => {
    if (step === 1) setData((d) => ({ ...d, name: payload }));
    if (step === 3) setData((d) => ({ ...d, skills: payload }));
    if (step === 4) setData((d) => ({ ...d, rate: payload }));
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const screens = [
    <StepWelcome onNext={goNext} />,
    <StepName onNext={goNext} />,
    <StepTruth name={data.name} onNext={goNext} />,
    <StepSkills name={data.name} onNext={goNext} />,
    <StepSignal name={data.name} skills={data.skills} onNext={goNext} />,
    <StepReady name={data.name} skills={data.skills} rate={data.rate} />,
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: C.ink,
      display: "flex",
      flexDirection: "column",
      maxWidth: 440,
      margin: "0 auto",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* TOP BAR */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 24px 0",
        minHeight: 48,
      }}>
        {step > 0 && step < STEPS.length - 1 ? (
          <button
            onClick={goBack}
            style={{
              background: "none",
              border: "none",
              color: C.inkMuted,
              fontSize: 22,
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
            }}
          >
            ←
          </button>
        ) : <div style={{ width: 24 }} />}

        <div style={{
          fontSize: 16,
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: C.ink,
          opacity: step === 0 ? 0 : 1,
          transition: "opacity 0.3s",
        }}>
          Qu<span style={{ color: C.gold }}>ee</span>k
        </div>

        <div style={{ width: 24 }} />
      </div>

      {/* PROGRESS — only between steps 1–4 */}
      {step > 0 && step < STEPS.length - 1 && (
        <div style={{ padding: "16px 24px 0" }}>
          <ProgressDots current={step - 1} total={STEPS.length - 2} />
        </div>
      )}

      {/* SCREEN CONTENT */}
      <div style={{
        flex: 1,
        padding: step === 0 ? "24px 28px 40px" : "8px 28px 40px",
        overflowY: "auto",
      }}>
        {screens[step]}
      </div>
    </div>
  );
}