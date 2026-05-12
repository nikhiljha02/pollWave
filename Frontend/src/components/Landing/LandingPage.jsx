import { Link } from "react-router-dom";
import useLandingEffects from "./Landing.js";
import "../../App.css";
import { useEffect, useState } from "react";

function LandingPage() {
  useLandingEffects();

  // ── Dark mode ──────────────────────────────────────────────────────────────
  const [dark, setDark] = useState(() => {
    // Respect saved preference or system preference on first load
    const saved = localStorage.getItem("pw-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
    localStorage.setItem("pw-theme", dark ? "dark" : "light");
  }, [dark]);
  // ──────────────────────────────────────────────────────────────────────────

  const handleVote = (e) => {
    e.target.textContent = "✓ Vote recorded!";
  };

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* NAVBAR */}
      <nav id="LandingNavbar">
        <a href="#" className="nav-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 18 18" fill="none">
              <rect x="2" y="10" width="3" height="6" rx="1" fill="white" />
              <rect x="7" y="6" width="3" height="10" rx="1" fill="white" />
              <rect x="12" y="2" width="3" height="14" rx="1" fill="white" />
            </svg>
          </div>
          <span>Poll</span>
          <span>Wave</span>
        </a>

        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>

          {/* ── Dark mode toggle ── */}
          <button
            className="theme-toggle"
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
          >
            <div className="theme-toggle-track">
              <div className="theme-toggle-thumb">{dark ? "🌙" : "☀️"}</div>
            </div>
          </button>

          <Link to="/auth" className="nav-cta">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="LandingHero">
        {/* Background Circles */}
        <svg
          className="hero-bg-circles"
          viewBox="0 0 1400 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="100" cy="200" r="300" fill="#5B4FE8" opacity="0.04" />
          <circle cx="1300" cy="700" r="350" fill="#2EC4B6" opacity="0.05" />
          <circle cx="800" cy="100" r="200" fill="#C8F04A" opacity="0.08" />
        </svg>

        {/* Floating Cards */}
        <div className="hero-floats" aria-hidden="true">
          {/* Card 1 */}
          <div className="float-card float-1">
            <div className="float-card-title">🌍 Best travel destination?</div>
            <div className="float-bar-label">
              <span>Japan</span>
              <span>62%</span>
            </div>
            <div className="float-bar">
              <div
                className="float-bar-fill"
                style={{ width: "62%", background: "#5B4FE8" }}
              ></div>
            </div>
            <div className="float-bar-label">
              <span>Italy</span>
              <span>28%</span>
            </div>
            <div className="float-bar">
              <div
                className="float-bar-fill"
                style={{ width: "28%", background: "#2EC4B6" }}
              ></div>
            </div>
            <div className="float-bar-label">
              <span>Brazil</span>
              <span>10%</span>
            </div>
            <div className="float-bar">
              <div
                className="float-bar-fill"
                style={{ width: "10%", background: "#FFB347" }}
              ></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="float-card float-2">
            <div className="float-card-title">☕ Morning drink?</div>
            <div className="float-bar-label">
              <span>Coffee</span>
              <span>74%</span>
            </div>
            <div className="float-bar">
              <div
                className="float-bar-fill"
                style={{ width: "74%", background: "#5B4FE8" }}
              ></div>
            </div>
            <div className="float-bar-label">
              <span>Tea</span>
              <span>26%</span>
            </div>
            <div className="float-bar">
              <div
                className="float-bar-fill"
                style={{ width: "26%", background: "#C8F04A" }}
              ></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="float-card float-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#C8F04A",
                }}
              ></div>
              <span
                style={{
                  fontSize: "11px",
                  color: "#7B7F96",
                  fontWeight: "500",
                }}
              >
                LIVE · 1,284 votes
              </span>
            </div>
            <div className="float-card-title">🎮 Fav gaming genre?</div>
            <div className="float-bar-label">
              <span>RPG</span>
              <span>45%</span>
            </div>
            <div className="float-bar">
              <div
                className="float-bar-fill"
                style={{ width: "45%", background: "#FF6B6B" }}
              ></div>
            </div>
            <div className="float-bar-label">
              <span>FPS</span>
              <span>35%</span>
            </div>
            <div className="float-bar">
              <div
                className="float-bar-fill"
                style={{ width: "35%", background: "#5B4FE8" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="hero-eyebrow">
          <div className="eyebrow-dot"></div>
          Now in public beta
        </div>

        <h1 className="hero-title darkText">
          Create Polls.
          <br />
          <em>Collect</em> Opinions.
          <br />
          <span className="hero-tag darkText">In Seconds.</span>
        </h1>

        <p className="hero-sub">
          The simplest way to build beautiful polls, share them with anyone, and
          get real-time insights that actually matter.
        </p>

        {/* Buttons */}
        <div className="hero-actions">
          <Link to="/auth" className="btn-primary">
            Start for free
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <a href="#how" className="btn-secondary">
            See how it works →
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="container">
          <div className="reveal">
            <span className="section-label">The Process</span>
            <h2 className="section-title darkText">
              From idea to insights
              <br />
              in 3 simple steps
            </h2>
            <p className="section-sub">
              No sign-up friction. No complicated setup. Just build, share, and
              learn.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card reveal">
              <div className="step-number darkText">01</div>
              <div className="step-icon" style={{ background: "#ECEAFD" }}>
                📝
              </div>
              <h3>Build your poll</h3>
              <p>
                Write your question, add options, set a deadline if you want.
              </p>
            </div>

            <div
              className="step-card reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="step-number darkText">02</div>
              <div className="step-icon" style={{ background: "#E0F9F7" }}>
                🔗
              </div>
              <h3>Share anywhere</h3>
              <p>
                Copy your unique poll link and share it everywhere instantly.
              </p>
            </div>

            <div
              className="step-card reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="step-number darkText">03</div>
              <div className="step-icon" style={{ background: "#F0FBE0" }}>
                📊
              </div>
              <h3>Watch results live</h3>
              <p>See votes pour in real time with beautiful analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Capabilities</span>
            <h2 className="section-title darkText">
              Everything you need
              <br />
              to run great polls
            </h2>
          </div>

          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">⚡</div>
              <h3 className="darkText">Instant setup</h3>
              <p>
                Create a fully functional poll in under 60 seconds. Pick a
                template or start from scratch — your choice.
              </p>
            </div>

            <div
              className="feature-card reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="feature-icon">📡</div>
              <h3 className="darkText">Real-time analytics</h3>
              <p>
                Watch responses flow in live. See percentages shift as your
                audience votes, without refreshing the page.
              </p>
            </div>

            <div
              className="feature-card reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="feature-icon">🔒</div>
              <h3 className="darkText">Privacy controls</h3>
              <p>
                Choose between anonymous or identified voting. Set passwords,
                restrict by email domain, or go fully public.
              </p>
            </div>

            <div
              className="feature-card reveal"
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="feature-icon">🎨</div>
              <h3 className="darkText">Custom branding</h3>
              <p>
                Match your brand palette, upload your logo, and give respondents
                a seamless experience.
              </p>
            </div>

            <div
              className="feature-card wide reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              <div style={{ flex: 1 }}>
                <div className="feature-icon">🌐</div>
                <h3 className="darkText">Multi-format questions</h3>
                <p>
                  Go beyond simple multiple choice. Use ranked choice, rating
                  scales, open-ended text, image polls, or yes/no questions.
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "var(--bg)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      background: "var(--white)",
                      borderRadius: "10px",
                      border: "1px solid var(--card-border)",
                      fontSize: "13px",
                      color: "var(--ink2)",
                    }}
                  >
                    <span>🔘</span> Multiple choice
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      background: "var(--accent-soft)",
                      borderRadius: "10px",
                      border: "1px solid rgba(91,79,232,0.2)",
                      fontSize: "13px",
                      color: "var(--accent)",
                    }}
                  >
                    <span>⭐</span>
                    Rating scale
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "11px",
                        background: "var(--accent)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      Popular
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      background: "var(--white)",
                      borderRadius: "10px",
                      border: "1px solid var(--card-border)",
                      fontSize: "13px",
                      color: "var(--ink2)",
                    }}
                  >
                    <span>🖼️</span> Image poll
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      background: "var(--white)",
                      borderRadius: "10px",
                      border: "1px solid var(--card-border)",
                      fontSize: "13px",
                      color: "var(--ink2)",
                    }}
                  >
                    <span>📝</span> Open-ended text
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PREVIEW */}
      <section className="preview-section">
        <div className="container">
          <div className="preview-wrapper">
            <div className="preview-text reveal">
              <span className="section-label">Live preview</span>
              <h2 className="section-title darkText" style={{ color: "black" }}>
                Beautiful polls your audience will love
              </h2>
              <p className="section-sub" style={{ marginBottom: "36px" }}>
                Designed for clarity and engagement.
              </p>
            </div>

            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="mock-poll">
                <div className="mock-poll-header">
                  <div
                    className="mock-dot"
                    style={{ background: "#FF6B6B" }}
                  ></div>
                  <div
                    className="mock-dot"
                    style={{ background: "#FFB347" }}
                  ></div>
                  <div
                    className="mock-dot"
                    style={{ background: "#C8F04A" }}
                  ></div>
                </div>
                <div className="mock-question">
                  What's the best time for our team standup? 🕐
                </div>
                <div className="mock-option selected">
                  <div
                    className="mock-option-fill"
                    style={{ width: "65%", background: "var(--accent)" }}
                  ></div>
                  <div className="mock-option-text">
                    <span>9:00 AM — Morning</span>
                    <span className="mock-option-pct">65%</span>
                  </div>
                </div>
                <button className="mock-vote-btn" onClick={handleVote}>
                  Submit your vote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>
            Your next great insight
            <br />
            is one poll away.
          </h2>
          <p>Join 80,000+ creators and teams who already use PollWave.</p>
          <a href="#" className="btn-lime">
            Create your first poll — it's free
            <svg
              width="18"
              height="18"
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
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ color: "#fff" }}>
              <div className="logo-mark">
                <svg viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="10" width="3" height="6" rx="1" fill="white" />
                  <rect x="7" y="6" width="3" height="10" rx="1" fill="white" />
                  <rect
                    x="12"
                    y="2"
                    width="3"
                    height="14"
                    rx="1"
                    fill="white"
                  />
                </svg>
              </div>
              <span>Poll</span>
              <span style={{ color: "var(--accent2)" }}>Wave</span>
            </div>
            <p className="footer-brand-desc darkText">
              The simplest polling platform for creators, teams, and
              researchers.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="darkText">
            © 2026 PollWave. All rights reserved.
          </span>
          <div className="footer-socials">
            <a href="#" className="social-icon darkText">
              𝕏
            </a>
            <a href="#" className="social-icon darkText">
              in
            </a>
            <a href="#" className="social-icon darkText">
              ▶
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
