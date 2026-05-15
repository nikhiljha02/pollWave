import { useState, useEffect, useRef } from "react";

import showPopup from "../Dashboard/dashboardPopUp.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const POLLS = [
  {
    question: "Best remote work setup?",
    options: ["Home office", "Co-working", "Café", "Hybrid"],
    votes: [44, 28, 12, 16],
  },
  {
    question: "Favorite productivity tool?",
    options: ["Notion", "Obsidian", "Trello", "Linear"],
    votes: [38, 31, 18, 13],
  },
  {
    question: "Top team communication?",
    options: ["Slack", "Discord", "Teams", "Email"],
    votes: [52, 22, 16, 10],
  },
];

function AnimatedPollCard({ poll, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (user?.login) {
      navigate("/dashboard");
    }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const max = Math.max(...poll.votes);
  const colors = ["#5B4FE8", "#2EC4B6", "#FFB347", "#FF6B6B"];

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.96)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "18px",
        padding: "20px 22px",
        marginBottom: "14px",
        cursor: "default",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#fff",
          marginBottom: "14px",
          fontFamily: "'Syne', sans-serif",
        }}
      >
        {poll.question}
      </div>
      {poll.options.map((opt, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{ marginBottom: "8px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
              fontSize: "11px",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.65)" }}>{opt}</span>
            <span style={{ color: colors[i % colors.length], fontWeight: 600 }}>
              {poll.votes[i]}%
            </span>
          </div>
          <div
            style={{
              height: "5px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: visible ? `${poll.votes[i]}%` : "0%",
                background: colors[i % colors.length],
                borderRadius: "100px",
                transition: `width 1.2s cubic-bezier(.22,.68,0,1.2) ${delay + i * 120}ms`,
                opacity: hovered === i ? 1 : 0.75,
                boxShadow:
                  hovered === i
                    ? `0 0 10px ${colors[i % colors.length]}88`
                    : "none",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FloatingDot({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        animation: "floatDot 8s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export default function PollWaveLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [reqType, setReqType] = useState("login");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const validate = () => {
    const e = {};
    if (tab === "signup" && !name.trim()) e.name = "Name is required";
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector(".popUpClose")?.click?.();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    const payload =
      reqType === "signup" ? { name, email, password } : { email, password };

    let res = await fetch(`http://localhost:8080/auth/${reqType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    let response = await res.json();
    if (response.success == true) {
      setLoading(false);
      setSuccess(true);
      setUser(response.data.user);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } else {
      showPopup(response.message);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    // setTimeout(() => {
    //
    // }, 1800);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: errors[field]
      ? "1.5px solid #FF6B6B"
      : focused === field
        ? "1.5px solid #5B4FE8"
        : "1.5px solid rgba(255,255,255,0.12)",
    background:
      focused === field ? "rgba(91,79,232,0.08)" : "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
    boxShadow: focused === field ? "0 0 0 4px rgba(91,79,232,0.15)" : "none",
  });

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "8px",
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background: #080B18; }
        ::placeholder { color: rgba(255,255,255,0.25) !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #11152A inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        @keyframes floatDot {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-22px) scale(1.06); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0% { transform: scale(0.7); opacity:0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity:1; }
        }
        @keyframes gridSlide {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabUnderline {
          from { width: 0; }
          to { width: 100%; }
        }
        .tab-btn:hover { color: #fff !important; }
        .social-btn:hover { border-color: rgba(255,255,255,0.3) !important; background: rgba(255,255,255,0.08) !important; }
        .submit-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(91,79,232,0.5) !important; }
        .forgot-link:hover { color: #8B7FF7 !important; }
        .signup-link:hover { color: #C8F04A !important; }
@media (max-width: 980px) {
    .pollwave-layout {
        flex-direction: column;
    }

    .left-panel {
        flex: none !important;
        width: 100%;
        min-height: auto;
        padding: 42px 22px !important;
    }

    .right-panel {
        width: 100%;
        padding: 40px 20px !important;
    }

    .headline-title {
        font-size: 42px !important;
        line-height: 1.05 !important;
    }

    .poll-cards {
        max-width: 100% !important;
    }

    .form-card {
        max-width: 100% !important;
    }

    .pollMainContainer {
        flex-direction: column;
    }
    .liveCard {
        display: none;
    }

    .trustBar {
        display: none !important;
    }
}

@media (max-width: 640px) {
    .left-panel {
        padding: 32px 18px !important;
    }

    .right-panel {
        padding: 28px 16px 40px !important;
    }

    .headline-title {
        font-size: 32px !important;
        letter-spacing: -1px !important;
    }

    .headline-text {
        font-size: 14px !important;
        line-height: 1.7 !important;
    }

    .logo-row {
        margin-bottom: 36px !important;
    }

    .form-title {
        font-size: 24px !important;
    }

    .social-row {
        flex-direction: column;
    }

    .tab-switcher {
        margin-bottom: 24px !important;
    }

    .poll-card {
        padding: 16px !important;
    }

    .trust-bar {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 12px !important;
    }

    .floating-orb {
        display: none;
    }
}

@media (max-width: 420px) {
    .headline-title {
        font-size: 28px !important;
    }

    .form-title {
        font-size: 22px !important;
    }

    input {
        font-size: 16px !important;
    }

    .social-btn {
        width: 100%;
    }
    .Nikhil {
        flex-direction: column;
    }
}
        
      `}</style>

      <div
        className="pollMainContainer"
        style={{
          minHeight: "100vh",
          display: "flex",
          fontFamily: "'DM Sans', sans-serif",
          background: "#080B18",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* === LEFT PANEL === */}
        <div
          style={{
            flex: "0 0 52%",
            background:
              "linear-gradient(135deg, #0D0F1A 0%, #111527 60%, #0A0C18 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Mesh background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(91,79,232,0.18) 0%, transparent 60%),
                         radial-gradient(ellipse 60% 50% at 80% 80%, rgba(46,196,182,0.10) 0%, transparent 55%)`,
            }}
          />

          {/* Animated grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
              opacity: 0.06,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "200%",
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
                animation: "gridSlide 20s linear infinite",
              }}
            />
          </div>

          {/* Floating orbs */}
          <FloatingDot
            style={{
              width: 220,
              height: 220,
              top: -60,
              right: -60,
              background: "rgba(91,79,232,0.15)",
              filter: "blur(50px)",
              animationDelay: "0s",
            }}
          />
          <FloatingDot
            style={{
              width: 160,
              height: 160,
              bottom: 80,
              left: -40,
              background: "rgba(46,196,182,0.12)",
              filter: "blur(40px)",
              animationDelay: "-3s",
            }}
          />
          <FloatingDot
            style={{
              width: 100,
              height: 100,
              top: "45%",
              right: 40,
              background: "rgba(200,240,74,0.1)",
              filter: "blur(30px)",
              animationDelay: "-5s",
            }}
          />

          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 64,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#5B4FE8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(91,79,232,0.5)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="10" width="3" height="6" rx="1" fill="white" />
                <rect x="7" y="6" width="3" height="10" rx="1" fill="white" />
                <rect x="12" y="2" width="3" height="14" rx="1" fill="white" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#fff",
              }}
            >
              Poll<span style={{ color: "#8B7FF7" }}>Wave</span>
            </span>
          </div>

          {/* Headline */}
          <div style={{ position: "relative", zIndex: 1, marginBottom: 40 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(200,240,74,0.12)",
                border: "1px solid rgba(200,240,74,0.25)",
                borderRadius: 100,
                padding: "5px 12px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#C8F04A",
                  animation: "floatDot 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#C8F04A",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                Live polls · Real-time results
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 3.5vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                color: "#fff",
                marginBottom: 16,
              }}
            >
              Opinions that
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #5B4FE8, #2EC4B6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                actually matter
              </span>
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: 380,
                fontWeight: 300,
              }}
            >
              Build polls in seconds, share with anyone, and watch opinions come
              in live. Join 80,000+ creators already using PollWave.
            </p>
          </div>

          {/* Live poll cards */}
          <div
            style={{ position: "relative", zIndex: 1, maxWidth: 380 }}
            className="liveCard"
          >
            {POLLS.map((poll, i) => (
              <AnimatedPollCard key={i} poll={poll} delay={300 + i * 200} />
            ))}
          </div>

          {/* Bottom trust bar */}
          <div
            className="trustBar"
            style={{
              marginTop: 40,
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div style={{ display: "flex" }}>
              {["#5B4FE8", "#2EC4B6", "#FF6B6B", "#FFB347", "#C8F04A"].map(
                (c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: c,
                      border: "2px solid #0D0F1A",
                      marginLeft: i ? -8 : 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {["S", "M", "A", "R", "K"][i]}
                  </div>
                ),
              )}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                Trusted by 80,000+ users
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                ★★★★★ 4.9 · 2,400+ reviews
              </div>
            </div>
          </div>
        </div>

        {/* === RIGHT PANEL (Form) === */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 40px",
            background: "#080B18",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle glow behind card */}
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(91,79,232,0.12) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />

          {success ? (
            /* SUCCESS STATE */
            <div
              style={{
                textAlign: "center",
                animation: "successPop 0.6s cubic-bezier(.22,.68,0,1.2) both",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #5B4FE8, #2EC4B6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  boxShadow: "0 0 40px rgba(91,79,232,0.5)",
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 10,
                }}
              >
                Welcome
                {tab === "signup" && name ? `, ${name.split(" ")[0]}` : " back"}
                !
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>
                Redirecting you to your dashboard…
              </p>
              <div
                style={{
                  marginTop: 32,
                  height: 3,
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  width: 200,
                  margin: "32px auto 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 100,
                    background: "linear-gradient(90deg, #5B4FE8, #2EC4B6)",
                    animation: "tabUnderline 1.5s ease both",
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              ref={cardRef}
              style={{
                width: "100%",
                maxWidth: 420,
                position: "relative",
                zIndex: 1,
                animation: "fadeSlideUp 0.6s ease both",
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: 36 }}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 30,
                    color: "#fff",
                    letterSpacing: "-0.8px",
                    marginBottom: 8,
                  }}
                >
                  {tab === "login" ? "Welcome back 👋" : "Create your account"}
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.38)",
                    fontWeight: 300,
                  }}
                >
                  {tab === "login"
                    ? "Sign in to your PollWave account"
                    : "Start building polls for free today"}
                </p>
              </div>

              {/* Tab switcher */}
              <div
                style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  padding: 4,
                  marginBottom: 32,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {["login", "signup"].map((t) => (
                  <button
                    key={t}
                    className="tab-btn"
                    onClick={() => {
                      setTab(t);
                      setReqType(t);
                      setErrors({});
                      setSuccess(false);
                    }}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      borderRadius: 9,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      transition: "all 0.25s ease",
                      background: tab === t ? "#5B4FE8" : "transparent",
                      color: tab === t ? "#fff" : "rgba(255,255,255,0.35)",
                      boxShadow:
                        tab === t ? "0 4px 16px rgba(91,79,232,0.4)" : "none",
                    }}
                  >
                    {t === "login" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.25)",
                    fontWeight: 500,
                  }}
                >
                  or continue with email
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {tab === "signup" && (
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Arjun Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("name")}
                    />
                    {errors.name && (
                      <div
                        style={{ marginTop: 5, fontSize: 12, color: "#FF6B6B" }}
                      >
                        ⚠ {errors.name}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("email"), paddingLeft: 44 }}
                    />
                    <svg
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        opacity: 0.35,
                      }}
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  {errors.email && (
                    <div
                      style={{ marginTop: 5, fontSize: 12, color: "#FF6B6B" }}
                    >
                      ⚠ {errors.email}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: tab === "login" ? 10 : 28 }}>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder={
                        tab === "signup"
                          ? "Min. 6 characters"
                          : "Enter your password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle("password"),
                        paddingLeft: 44,
                        paddingRight: 44,
                      }}
                    />
                    <svg
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        opacity: 0.35,
                      }}
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowPass((p) => !p)}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: "rgba(255,255,255,0.3)",
                        lineHeight: 1,
                      }}
                    >
                      {showPass ? (
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div
                      style={{ marginTop: 5, fontSize: 12, color: "#FF6B6B" }}
                    >
                      ⚠ {errors.password}
                    </div>
                  )}
                </div>

                {tab === "login" && (
                  <div style={{ textAlign: "right", marginBottom: 28 }}>
                    <a
                      href="#"
                      className="forgot-link"
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.35)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                {/* Password strength indicator for signup */}
                {tab === "signup" && password.length > 0 && (
                  <div style={{ marginBottom: 24, marginTop: -12 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
                      {[0, 1, 2, 3].map((i) => {
                        const strength = Math.min(
                          Math.floor(password.length / 3),
                          4,
                        );
                        const colors = [
                          "#FF6B6B",
                          "#FFB347",
                          "#2EC4B6",
                          "#C8F04A",
                        ];
                        return (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: 3,
                              borderRadius: 100,
                              background:
                                i < strength
                                  ? colors[strength - 1]
                                  : "rgba(255,255,255,0.1)",
                              transition: "background 0.3s",
                            }}
                          />
                        );
                      })}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}
                    >
                      {
                        ["", "Weak", "Fair", "Good", "Strong"][
                          Math.min(Math.floor(password.length / 3), 4)
                        ]
                      }{" "}
                      password
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="submit-btn"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "none",
                    background: loading
                      ? "rgba(91,79,232,0.5)"
                      : "linear-gradient(135deg, #5B4FE8 0%, #4a3ed0 100%)",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "all 0.25s ease",
                    boxShadow: "0 4px 20px rgba(91,79,232,0.35)",
                    letterSpacing: "0.2px",
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      {tab === "login" ? "Signing in…" : "Creating account…"}
                    </>
                  ) : (
                    <>
                      {tab === "login" ? "Sign In" : "Create Account"}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Switch tab */}
                <p
                  style={{
                    textAlign: "center",
                    marginTop: 24,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  {tab === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    className="signup-link"
                    onClick={() => {
                      setTab(tab === "login" ? "signup" : "login");
                      setErrors({});
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#8B7FF7",
                      fontWeight: 600,
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "color 0.2s",
                    }}
                  >
                    {tab === "login" ? "Sign up free →" : "Sign in →"}
                  </button>
                </p>
              </form>

              {/* Footer note */}
              <p
                style={{
                  marginTop: 32,
                  textAlign: "center",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.18)",
                  lineHeight: 1.6,
                }}
              >
                By continuing, you agree to PollWave's{" "}
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                  }}
                >
                  Terms
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
