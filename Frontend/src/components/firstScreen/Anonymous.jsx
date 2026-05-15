import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap";

export default function AccessDenied({prop}) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Inject Google Fonts
    if (!document.querySelector(`link[href="${GOOGLE_FONTS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = GOOGLE_FONTS;
      document.head.appendChild(link);
    }
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,60,180,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,60,180,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Purple radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120,70,220,0.2) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -62%)",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md text-center"
        style={{
          background: "rgba(18,16,28,0.93)",
          border: "0.5px solid rgba(120,80,220,0.35)",
          borderRadius: 20,
          padding: "3rem 2.5rem 2.5rem",
          backdropFilter: "blur(16px)",
          boxShadow:
            "0 0 0 1px rgba(120,80,220,0.07) inset, 0 32px 80px rgba(0,0,0,0.55)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        {/* Corner accents */}
        <span
          className="absolute"
          style={{
            top: 18,
            right: 18,
            width: 8,
            height: 8,
            borderTop: "1.5px solid rgba(160,100,255,0.5)",
            borderRight: "1.5px solid rgba(160,100,255,0.5)",
            borderRadius: "0 2px 0 0",
          }}
        />
        <span
          className="absolute"
          style={{
            bottom: 18,
            left: 18,
            width: 8,
            height: 8,
            borderBottom: "1.5px solid rgba(160,100,255,0.5)",
            borderLeft: "1.5px solid rgba(160,100,255,0.5)",
            borderRadius: "0 0 0 2px",
          }}
        />

        {/* Shield icon ring */}
        <div
          className="flex items-center justify-center mx-auto mb-6 relative"
          style={{
            width: 82,
            height: 82,
            borderRadius: "50%",
            background: "rgba(120,60,220,0.13)",
            border: "0.5px solid rgba(160,100,255,0.3)",
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute"
            style={{
              inset: -7,
              borderRadius: "50%",
              border: "0.5px solid rgba(160,100,255,0.12)",
            }}
          />
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b085ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-1 mb-5"
          style={{
            background: "rgba(220,60,60,0.13)",
            border: "0.5px solid rgba(220,80,80,0.35)",
            color: "#ff8585",
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
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          Access Denied
        </div>

        {/* Heading */}
        <h1
          className="mb-3 leading-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: "#f0ecff",
            letterSpacing: "-0.02em",
          }}
        >
          Anonymous users are{" "}
          <span style={{ color: "#a07bff" }}>not allowed</span>
        </h1>

        {/* Divider */}
        <div
          className="mb-7"
          style={{ height: "0.5px", background: "rgba(120,80,220,0.2)" }}
        />

        {/* Login button */}
        <Link
          to="/auth"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
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
              ? "linear-gradient(135deg, #8b55f0 0%, #6535cc 100%)"
              : "linear-gradient(135deg, #7c44e8 0%, #5a30b8 100%)",
            color: "#f5f0ff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: hovered
              ? "0 6px 32px rgba(100,50,220,0.5)"
              : "0 4px 24px rgba(100,50,220,0.35)",
            transform: hovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.18s ease",
            letterSpacing: "0.01em",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Sign in to your account
        </Link>

        {/* Footer */}
        <p
          className="mt-5"
          style={{ fontSize: 12, color: "rgba(180,165,215,0.35)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/auth"
            style={{
              color: "rgba(180,165,215,0.55)",
              textDecoration: "none",
              borderBottom: "0.5px solid rgba(180,165,215,0.25)",
            }}
          >
            Create for free
          </Link>
        </p>
      </div>
    </div>
  );
}
