import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap";

export default function PollExpired({ mergedOptions }) {
  const COLORS = [
    "#3B82F6", // blue
    "#EF4444", // red
    "#10B981", // green
    "#F59E0B", // yellow
    "#8B5CF6", // purple
  ];

  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tick, setTick] = useState(0);
  const [result, setResult] = useState(false);

  useEffect(() => {
    if (!document.querySelector(`link[href="${GOOGLE_FONTS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = GOOGLE_FONTS;
      document.head.appendChild(link);
    }
    const t = setTimeout(() => setMounted(true), 80);
    // Animate the clock hand
    // const interval = setInterval(() => setTick((p) => p + 1), 1200);
    // return () => {
    //   clearTimeout(t);
    //   clearInterval(interval);
    // };
  }, []);

  // Clock hand angle cycles to simulate a frozen/sweeping clock
  const handAngle = 210 + (tick % 2 === 0 ? 0 : 6);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#080b0f", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(80,160,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Blue radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(40,110,255,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      />

      {/* Amber accent glow bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
          bottom: "5%",
          right: "10%",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md text-center"
        style={{
          background: "rgba(12,16,24,0.94)",
          border: "0.5px solid rgba(60,120,255,0.28)",
          borderRadius: 22,
          padding: "3rem 2.5rem 2.5rem",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 0 0 1px rgba(60,120,255,0.06) inset, 0 40px 90px rgba(0,0,0,0.6)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        {/* Corner accents */}
        {[
          {
            top: 18,
            right: 18,
            borderTop: "1.5px solid rgba(60,120,255,0.4)",
            borderRight: "1.5px solid rgba(60,120,255,0.4)",
            borderRadius: "0 3px 0 0",
          },
          {
            bottom: 18,
            left: 18,
            borderBottom: "1.5px solid rgba(60,120,255,0.4)",
            borderLeft: "1.5px solid rgba(60,120,255,0.4)",
            borderRadius: "0 0 0 3px",
          },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute"
            style={{ width: 9, height: 9, ...s }}
          />
        ))}

        {/* Clock icon */}
        <div
          className="flex items-center justify-center mx-auto mb-6 relative"
          style={{
            width: 86,
            height: 86,
            borderRadius: "50%",
            background: "rgba(40,100,255,0.1)",
            border: "0.5px solid rgba(80,140,255,0.28)",
          }}
        >
          {/* Outer pulse ring */}
          <div
            className="absolute"
            style={{
              inset: -8,
              borderRadius: "50%",
              border: "0.5px solid rgba(80,140,255,0.1)",
            }}
          />
          {/* Animated SVG clock */}
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="#5b9bff" strokeWidth="1.4" />
            {/* Hour hand - static */}
            <line
              x1="12"
              y1="12"
              x2={12 + 4.5 * Math.sin((handAngle * Math.PI) / 180)}
              y2={12 - 4.5 * Math.cos((handAngle * Math.PI) / 180)}
              stroke="#5b9bff"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ transition: "all 0.4s ease" }}
            />
            {/* Minute hand */}
            <line
              x1="12"
              y1="12"
              x2={12 + 6 * Math.sin(((handAngle + 90) * Math.PI) / 180)}
              y2={12 - 6 * Math.cos(((handAngle + 90) * Math.PI) / 180)}
              stroke="#f59e0b"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{ transition: "all 0.4s ease" }}
            />
            {/* Center dot */}
            <circle cx="12" cy="12" r="1.2" fill="#5b9bff" />
          </svg>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-1.5 mb-5"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "0.5px solid rgba(245,158,11,0.35)",
            color: "#fbbf24",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "4px 14px",
            borderRadius: 100,
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Poll Expired
        </div>

        {/* Heading */}
        <h1
          className="mb-3 leading-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: "#e8f0ff",
            letterSpacing: "-0.02em",
          }}
        >
          This poll has <span style={{ color: "#5b9bff" }}>expired</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mb-6 mx-auto"
          style={{
            fontSize: 14,
            color: "rgba(180,200,240,0.5)",
            lineHeight: 1.75,
            maxWidth: 300,
          }}
        >
          The voting window for this poll has closed. Responses are no longer
          being accepted. You can still view the final results below.
        </p>

        {/* Divider */}
        <div
          className="mb-6"
          style={{ height: "0.5px", background: "rgba(60,120,255,0.18)" }}
        />

        {/* CTA Button */}
        <button
          //   onMouseEnter={() => setHovered(true)}
          //   onMouseLeave={() => setHovered(false)}
          onClick={() => setResult(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "14px 28px",
            borderRadius: 12,
            border: "none",
            background: hovered
              ? "linear-gradient(135deg, #3a72f5 0%, #1a4ed8 100%)"
              : "linear-gradient(135deg, #2563eb 0%, #1440c0 100%)",
            color: "#e8f2ff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: hovered
              ? "0 6px 32px rgba(37,99,235,0.5)"
              : "0 4px 24px rgba(37,99,235,0.32)",
            transform: hovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.18s ease",
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          View Final Results
        </button>
      </div>

      {result && (
        <div className=" m-10 w-full h-fit max-w-sm bg-gradient-to-br from-[#0F172A] to-[#111827] p-4 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-base font-semibold">Poll Results</h2>

            <span className="text-xs text-slate-400">Live Votes</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              style={{ color: "white" }}
              data={mergedOptions.map((opt) => ({
                name: opt.text,
                votes: opt.vote ?? 0,
              }))}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                stroke="#CBD5E1"
                tick={{
                  fill: "#CBD5E1",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />

              <Tooltip
                contentStyle={{
                  background: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                }}
                cursor={{ fill: "transparent" }}
                itemStyle={{
                  color: "#fff", // votes text white
                }}
              />

              <Bar dataKey="votes" radius={[12, 12, 4, 4]} barSize={42}>
                {mergedOptions.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
