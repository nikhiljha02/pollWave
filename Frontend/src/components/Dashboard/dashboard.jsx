import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import showPopup from "./dashboardPopUp.js";

export default function Dashboard() {
  const [showEditor, setShowEditor] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submittedPoll, setSubmittedPoll] = useState([]);

  const [pollData, setPollData] = useState({
    question: "",
    options: [""],
  });

  // Handle Question Change
  function handleQuestionChange(e) {
    setPollData({
      ...pollData,
      question: e.target.value,
    });
  }

  // Handle Option Change
  function handleOptionChange(index, value) {
    const updatedOptions = [...pollData.options];
    updatedOptions[index] = value;

    setPollData({
      ...pollData,
      options: updatedOptions,
    });
  }

  // Add New Option
  function handleAddOption() {
    setPollData({
      ...pollData,
      options: [...pollData.options, ""],
    });
  }

  // Show Editor
  function handleCreatePoll() {
    setShowEditor(true);
  }

  // Submit
  function submitResponse() {
    console.log(pollData);
    setSubmit(true);
    const newPoll = {
      question: pollData.question,
      options: [...pollData.options],
    };

    // Add new poll without removing old ones
    setSubmittedPoll((prev) => [newPoll, ...prev]);
    submittedPoll.reverse();
    // Optional: clear form after submit
    setPollData({
      question: "",
      options: [""],
    });
  }

  function handlePublish() {
    showPopup("localhost:5173/poll/12345", "success");
  }

  return (
    <div style={styles.wrapper} className="dashboardWrap">
      {/* HEADER */}
      <header className="dashboardHeader" style={styles.header}>
        <div className="dashboardLogo" style={styles.logo}>
          <div className="logoBox" style={styles.logoBox}>
            P
          </div>
          <span className="logoText" style={styles.logoText}>
            PollWave
          </span>
        </div>

        <div className="dashboardActions" style={styles.actions}>
          <Link
            to="/analytics"
            className="analyticsBtn"
            style={styles.analyticsBtn}
          >
            📊 Analytics
          </Link>

          {/* <button
            className="createBtn"
            style={styles.createBtn}
            onClick={handleCreatePoll}
          >
            + Create Poll
          </button> */}
        </div>
      </header>

      <main className="mainContainer">
        <div className="editor" role="region" aria-label="Create poll">
          <div className="editorHeader">
            <div>
              <div className="editorTitle">Create a new poll</div>
              <div className="editorHint">
                Add your question and options below.
              </div>
            </div>
          </div>

          <div className="editorBody">
            {/* Question */}
            <div className="questionArea">
              <label>Question</label>
              <input
                type="text"
                placeholder="Enter your question"
                value={pollData.question}
                onChange={handleQuestionChange}
              />
            </div>

            {/* Options */}
            <div className="optionArea">
              {pollData.options.map((option, index) => (
                <div key={index} className="optionRow">
                  <label>Option {index + 1}</label>
                  <input
                    type="text"
                    placeholder="Enter option"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    style={{ marginTop: "0.5rem" }}
                  />
                </div>
              ))}
            </div>

            <div className="editorFooter">
              <button className="addOption" onClick={handleAddOption}>
                Add Option
              </button>

              <button className="submitResponse" onClick={submitResponse}>
                Submit
              </button>
            </div>
          </div>
        </div>

        {
          submit &&
            submittedPoll.length > 0 &&
            // <div className="responseCard">
            submittedPoll.map((ele, index) => (
              <div
                key={index}
                className="responseCard"
                style={{ padding: "15px" }}
              >
                <p className="submitQuestion">{ele.question}</p>
                <div className="submitOptionsWrap">
                  {ele.options.map((elem, index) => (
                    <span className="submitOption" key={index}>
                      {elem}
                    </span>
                  ))}
                </div>
                <button
                  className="publish-btn"
                  style={styles.publish}
                  onClick={handlePublish}
                >
                  Publish
                </button>
              </div>
            ))
          //     {/* <p className="submitQuestion">{submittedPoll[0].question}</p>

          //     <div className="submitOptionsWrap">
          //         {submittedPoll[0].options.map((ele, index) => (
          //             <span className="submitOption" key={index}>
          //                 {ele}
          //             </span>
          //         ))}
          //     </div> */}
          // {/* </div> */}
        }
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#070A14",
    color: "#fff",
    fontFamily: "DM Sans, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 28px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
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
  },

  createBtn: {
    padding: "9px 14px",
    borderRadius: 10,
    border: "none",
    background: "#5B4FE8",
    color: "#fff",
  },

  publish: {
    fontSize: "16px",
    fontWeight: "600",
    padding: "12px 22px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, rgb(91,79,232), rgb(111,99,255))",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(91,79,232,0.35)",
    transition: "all 0.25s ease",
    display: "block",
    marginLeft: "auto",
    marginTop: "24px",
  },
};
