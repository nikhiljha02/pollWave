import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: "⚡",
    title: "Real-Time Results",
    desc: "Watch votes roll in live with animated charts and instant updates across all devices.",
    color: "#FFD93D",
  },
  {
    icon: "🎨",
    title: "Beautiful Templates",
    desc: "50+ stunning poll templates crafted by designers. Launch in seconds, not hours.",
    color: "#6BCB77",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "Bank-grade encryption, fraud detection, and one-click voter authentication.",
    color: "#4D96FF",
  },
  {
    icon: "📊",
    title: "Deep Analytics",
    desc: "AI-powered insights, demographic breakdowns, and exportable reports.",
    color: "#FF6B6B",
  },
  {
    icon: "🌍",
    title: "Global Reach",
    desc: "Reach audiences in 140+ countries with multi-language support built in.",
    color: "#C77DFF",
  },
  {
    icon: "🤝",
    title: "Team Collaboration",
    desc: "Co-create polls with your team, set roles, and manage permissions seamlessly.",
    color: "#FFD93D",
  },
];

const TESTIMONIALS = [
  {
    name: "Aanya Sharma",
    role: "Product Lead @ Zeta",
    text: "PollWave turned our quarterly feedback into a live event. Engagement shot up 340%.",
    avatar: "AS",
    color: "#4D96FF",
  },
  {
    name: "Marcus Rivera",
    role: "Community Manager",
    text: "The animations alone made our audience feel like they were part of something big.",
    avatar: "MR",
    color: "#FF6B6B",
  },
  {
    name: "Priya Nair",
    role: "Head of Research @ Bloom",
    text: "We replaced 3 tools with PollWave. The analytics depth is unmatched.",
    avatar: "PN",
    color: "#6BCB77",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FloatingOrb({ style, dark }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        filter: "blur(80px)",
        opacity: dark ? 0.18 : 0.22,
        ...style,
      }}
    />
  );
}

function AnimatedBar({ pct, color, label, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (inView) setTimeout(() => setWidth(pct), delay);
  }, [inView, pct, delay]);
  return (
    <div ref={ref} className="mb-4">
      <div
        className="flex justify-between mb-1 text-sm font-semibold"
        style={{ color }}
      >
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div
        className="rounded-full h-3 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: color,
            boxShadow: `0 0 12px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

function PollCard({ dark }) {
  const [voted, setVoted] = useState(null);
  const options = [
    { label: "Design & UI", votes: 48, color: "#4D96FF" },
    { label: "Performance", votes: 29, color: "#FF6B6B" },
    { label: "Features", votes: 23, color: "#6BCB77" },
  ];
  const total = options.reduce((a, o) => a + o.votes, 0);
  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
        borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "#FF6B6B" }}
        >
          Live
        </span>
        <span className="ml-auto text-xs opacity-50">{total} votes</span>
      </div>
      <p
        className="font-bold text-lg mb-5"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        What matters most to you?
      </p>
      {options.map((o, i) => {
        const pct = Math.round((o.votes / total) * 100);
        return (
          <button
            key={o.label}
            onClick={() => setVoted(i)}
            className="w-full mb-3 rounded-xl p-3 text-left relative overflow-hidden transition-all duration-200"
            style={{
              border: `1.5px solid ${voted === i ? o.color : "transparent"}`,
              background:
                voted === i
                  ? `${o.color}18`
                  : dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)",
              boxShadow: voted === i ? `0 0 20px ${o.color}30` : "none",
            }}
          >
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
              <span>{o.label}</span>
              <span style={{ color: o.color }}>{pct}%</span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: o.color,
                  transition: "width 1s ease",
                }}
              />
            </div>
          </button>
        );
      })}
      {voted !== null && (
        <p
          className="text-center text-xs mt-3 font-semibold"
          style={{ color: "#6BCB77" }}
        >
          ✓ Vote recorded — results updating live
        </p>
      )}
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    const step = target / (duration / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // useEffect(() => {
  //     const move = (e) => {
  //         setCursorPos({
  //             x: e.clientX,
  //             y: e.clientY,
  //         });
  //     };

  //     window.addEventListener("mousemove", move);

  //     return () => window.removeEventListener("mousemove", move);
  // }, []);

  const bg = dark ? "#080B14" : "#F4F6FF";
  const text = dark ? "#F0F4FF" : "#0D1326";
  const sub = dark ? "rgba(240,244,255,0.55)" : "rgba(13,19,38,0.55)";
  const card = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)";
  const cardBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const [heroRef, heroIn] = useInView(0.1);
  const [featRef, featIn] = useInView(0.1);
  const [statRef, statIn] = useInView(0.1);
  const [testRef, testIn] = useInView(0.1);
  const [pricRef, pricIn] = useInView(0.1);
  const [ctaRef, ctaIn] = useInView(0.1);

  return (
    <div className="pollwave">
      {/* Custom cursor */}
      {/* Cursor Dot */}
      {/* Cursor Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full bg-[#4D96FF] mix-blend-difference"
        style={{
          transform: `translate3d(${cursorPos.x - 6}px, ${cursorPos.y - 6}px, 0)`,
        }}
      />

      {/* Cursor Ring */}
      <div
        className="fixed pointer-events-none z-[9998] w-9 h-9 rounded-full border border-[#4D96FF88] mix-blend-difference"
        style={{
          transform: `translate3d(${cursorPos.x - 18}px, ${cursorPos.y - 18}px, 0)`,
          transition: "transform 0.12s linear",
        }}
      />

      <div
        style={{
          background: bg,
          color: text,
          minHeight: "100vh",
          transition: "background 0.4s, color 0.4s",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* NAVBAR */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
          style={{
            // background: dark ? "rgba(8,11,20,0.85)" : "rgba(244,246,255,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${cardBorder}`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4D96FF,#C77DFF)" }}
            >
              <span
                className="text-white font-black text-sm"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                P
              </span>
            </div>
            <span
              className="font-black text-xl tracking-tight"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              PollWave
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="w-12 h-6 rounded-full relative transition-all duration-300 flex items-center transition-all duration-200 hover:-translate-y-1"
              style={{ background: dark ? "#4D96FF" : "rgba(0,0,0,0.15)" }}
            >
              <div
                className="w-5 h-5 rounded-full absolute transition-all duration-300 flex items-center justify-center text-xs"
                style={{
                  left: dark ? "calc(100% - 22px)" : "2px",
                  background: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                {dark ? "🌙" : "☀️"}
              </div>
            </button>

            <Link to="/auth">
              <button
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white animate-glow transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#4D96FF,#C77DFF)",
                  fontFamily: "'Syne',sans-serif",
                }}
              >
                Get Started Free →
              </button>
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: text }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#4D96FF22_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#C77DFF22_0%,transparent_50%),radial-gradient(circle_at_50%_50%,#FF6B6B11_0%,transparent_60%)]"
          style={{ paddingTop: "100px" }}
        >
          <FloatingOrb
            style={{
              width: 600,
              height: 600,
              top: "-15%",
              left: "-10%",
              background: "#4D96FF",
            }}
            dark={dark}
          />
          <FloatingOrb
            style={{
              width: 500,
              height: 500,
              bottom: "-10%",
              right: "-8%",
              background: "#C77DFF",
            }}
            dark={dark}
          />
          <FloatingOrb
            style={{
              width: 300,
              height: 300,
              top: "40%",
              left: "60%",
              background: "#FF6B6B",
            }}
            dark={dark}
          />

          {/* Spinning ring */}
          <div
            className="absolute animate-spin-slow opacity-10"
            style={{
              width: 700,
              height: 700,
              border: "1.5px dashed #4D96FF",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />

          <div className={`slide-up${heroIn ? " in" : ""} mb-5`}>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
              style={{
                background: dark
                  ? "rgba(77,150,255,0.12)"
                  : "rgba(77,150,255,0.1)",
                color: "#4D96FF",
                border: "1px solid #4D96FF33",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              12,847 polls created today
            </span>
          </div>

          <h1
            className={`slide-up-2${heroIn ? " in" : ""} font-black leading-none mb-6`}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              maxWidth: "900px",
            }}
          >
            Polls That Feel
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
              Like Magic.
            </span>
          </h1>

          <p
            className={`slide-up-3${heroIn ? " in" : ""} text-lg md:text-xl mb-10 max-w-xl leading-relaxed`}
            style={{ color: sub }}
          >
            Create stunning polls in seconds. Real-time results, beautiful
            analytics, and animations that make your audience want to vote.
          </p>

          <div
            className={`slide-up-4${heroIn ? " in" : ""} flex flex-col sm:flex-row gap-4 mb-16`}
          >
            <button
              className="px-8 py-4 rounded-2xl font-bold text-white text-base animate-glow transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg,#4D96FF,#C77DFF)",
                fontFamily: "'Syne',sans-serif",
                fontSize: "1rem",
              }}
            >
              Start for Free — No Card Needed
            </button>
            <button
              className="px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-2"
              style={{
                border: `1.5px solid ${cardBorder}`,
                color: text,
                background: card,
                backdropFilter: "blur(12px)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon
                  points="10 8 16 12 10 16 10 8"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Watch 90s Demo
            </button>
          </div>

          {/* Hero poll card */}
          <div
            className={`slide-up-4${heroIn ? " in" : ""} animate-animate-float w-full max-w-sm`}
          >
            <PollCard dark={dark} />
          </div>
        </section>

        {/* TICKER */}
        <div
          className="overflow-hidden py-4"
          style={{
            borderTop: `1px solid ${cardBorder}`,
            borderBottom: `1px solid ${cardBorder}`,
            background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          }}
        >
          <div className="flex whitespace-nowrap animate-ticker">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4">
                {[
                  "Real-time Results ✦",
                  "Beautiful Animations ✦",
                  "AI Analytics ✦",
                  "Free Forever Plan ✦",
                  "Team Collaboration ✦",
                  "140+ Countries ✦",
                  "Instant Sharing ✦",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-sm font-semibold whitespace-nowrap"
                    style={{ color: sub }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <section ref={statRef} className="py-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: 2400000, suffix: "+", label: "Polls Created" },
              { val: 99, suffix: "%", label: "Uptime SLA" },
              { val: 140, suffix: "+", label: "Countries" },
              { val: 50000, suffix: "+", label: "Happy Teams" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl slide-up${i % 2 === 0 ? "" : "-2"}${statIn ? " in" : ""}`}
                style={{ background: card, border: `1px solid ${cardBorder}` }}
              >
                <div
                  className="font-black text-4xl md:text-5xl mb-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  <CountUp target={s.val} suffix={s.suffix} />
                </div>
                <div className="text-sm font-medium" style={{ color: sub }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section ref={featRef} className="py-16 px-6 md:px-12" id="features">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 slide-up${featIn ? " in" : ""}`}>
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#4D96FF" }}
              >
                FEATURES
              </span>
              <h2
                className="font-black text-4xl md:text-5xl mt-3"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Everything you need to
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                  poll like a pro.
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl p-7 slide-up${i % 3 === 0 ? "" : i % 3 === 1 ? "-2" : "-3"}${featIn ? " in" : ""}`}
                  style={{
                    background: card,
                    border: `1px solid ${cardBorder}`,
                    transition: "all 0.25s",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                    style={{ background: `${f.color}20` }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    className="font-bold text-xl mb-2"
                    style={{ fontFamily: "'Syne',sans-serif", color: f.color }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: sub }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE DEMO */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#FF6B6B" }}
              >
                LIVE ANALYTICS
              </span>
              <h2
                className="font-black text-4xl md:text-5xl mt-3 mb-5"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Watch your data
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                  come alive.
                </span>
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: sub }}
              >
                No more waiting for reports. Every vote updates your dashboard
                instantly with smooth, satisfying animations.
              </p>
              <AnimatedBar
                pct={78}
                color="#4D96FF"
                label="Design & UI"
                delay={100}
              />
              <AnimatedBar
                pct={61}
                color="#FF6B6B"
                label="Performance"
                delay={300}
              />
              <AnimatedBar
                pct={44}
                color="#6BCB77"
                label="New Features"
                delay={500}
              />
              <AnimatedBar
                pct={29}
                color="#C77DFF"
                label="Documentation"
                delay={700}
              />
            </div>
            <div className="animate-float-slow">
              <PollCard dark={dark} />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section ref={testRef} className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-14 slide-up${testIn ? " in" : ""}`}>
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#6BCB77" }}
              >
                LOVE
              </span>
              <h2
                className="font-black text-4xl md:text-5xl mt-3"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Trusted by{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                  50,000+ teams.
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className={`transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl p-7 slide-up${i === 0 ? "" : i === 1 ? "-2" : "-3"}${testIn ? " in" : ""}`}
                  style={{
                    background: card,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        className="font-bold text-sm"
                        style={{ fontFamily: "'Syne',sans-serif" }}
                      >
                        {t.name}
                      </div>
                      <div className="text-xs" style={{ color: sub }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: sub }}>
                    "{t.text}"
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: "#FFD93D" }}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          ref={ctaRef}
          className="py-32 px-6 text-center relative overflow-hidden"
        >
          <FloatingOrb
            style={{
              width: 500,
              height: 500,
              top: "-30%",
              left: "20%",
              background: "#4D96FF",
            }}
            dark={dark}
          />
          <FloatingOrb
            style={{
              width: 400,
              height: 400,
              bottom: "-20%",
              right: "15%",
              background: "#C77DFF",
            }}
            dark={dark}
          />
          <div className={`relative z-10 slide-up${ctaIn ? " in" : ""}`}>
            <h2
              className="font-black text-4xl md:text-6xl mb-6"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Ready to make
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                opinions matter?
              </span>
            </h2>
            <p
              className="text-lg mb-10 max-w-lg mx-auto"
              style={{ color: sub }}
            >
              Join 50,000+ teams who use PollWave to gather insights that
              actually drive decisions.
            </p>
            <button
              className="px-12 py-5 rounded-2xl font-black text-white text-lg animate-glow transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg,#4D96FF,#C77DFF,#FF6B6B)",
                fontFamily: "'Syne',sans-serif",
              }}
            >
              Get Started Free — Takes 30s →
            </button>
            <p className="text-xs mt-4" style={{ color: sub }}>
              No credit card. No BS. Just polls.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: `1px solid ${cardBorder}`,
            background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          }}
          className="px-6 md:px-12 py-16"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#4D96FF,#C77DFF)",
                  }}
                >
                  <span
                    className="text-white font-black text-sm"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    P
                  </span>
                </div>
                <span
                  className="font-black text-xl"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  PollWave
                </span>
              </div>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: sub }}
              >
                The world's most beautiful polling platform. Built for teams who
                care about design as much as data.
              </p>
              <div className="flex gap-3 mt-6">
                {["𝕏", "in", "▶", "📘"].map((s) => (
                  <button
                    key={s}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: card,
                      border: `1px solid ${cardBorder}`,
                      color: sub,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Pricing",
                  "Templates",
                  "Integrations",
                  "Changelog",
                ],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Cookies"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  className="font-bold text-sm mb-4"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm nav-link-hover"
                        style={{ color: sub }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
            style={{ borderTop: `1px solid ${cardBorder}` }}
          >
            <p className="text-xs" style={{ color: sub }}>
              © 2026 PollWave Inc. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: sub }}>
              Made with ♥ for teams who love great data.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
