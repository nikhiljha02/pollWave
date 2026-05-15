import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Analytics() {
  const [active, setActive] = useState("home");

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={styles.header}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoBox}>P</div>
          <span style={styles.logoText}>PollWave</span>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <Link to="/dashboard" style={styles.analyticsBtn}>
            Dashboard
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <h1>Analytics</h1>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#070A14",
    color: "#fff",
    fontFamily: "DM Sans, sans-serif",
  },

  /* HEADER */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 28px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#5B4FE8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },

  logoText: {
    fontWeight: 700,
    fontSize: 16,
  },

  actions: {
    display: "flex",
    gap: 10,
  },

  analyticsBtn: {
    padding: "9px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    textDecoration: "none",
  },

  createBtn: {
    padding: "9px 14px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#5B4FE8,#4a3ed0)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },

  /* MAIN */
  main: {
    padding: 28,
    maxWidth: 1100,
    margin: "0 auto",
  },

  /* STATS */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 14,
    marginBottom: 28,
  },

  card: {
    padding: 18,
    borderRadius: 14,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
  },

  cardLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },

  cardValue: {
    fontSize: 26,
    fontWeight: 700,
    marginTop: 8,
  },

  /* SECTION */
  section: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    color: "rgba(255,255,255,0.7)",
  },

  pollCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  pollQuestion: {
    fontWeight: 600,
  },

  pollMeta: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },

  viewBtn: {
    padding: "6px 10px",
    borderRadius: 8,
    border: "none",
    background: "rgba(91,79,232,0.2)",
    color: "#fff",
    cursor: "pointer",
  },
};
