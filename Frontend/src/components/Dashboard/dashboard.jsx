import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import showPopup from "./dashboardPopUp.js";

export default function Dashboard() {
  const { user, setUser } = useAuth();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [submittedPoll, setSubmittedPoll] = useState([]);
  const [anonymousMap, setAnonymousMap] = useState({});
  const [customTime, setCustomTime] = useState({});
  const [expiryMap, setExpiryMap] = useState({});

  const [pollData, setPollData] = useState({
    question: "",
    options: [""],
  });
  const setCustomPollTimer = (id) => {
    const value = Number(customTime[id]);

    if (!value || value <= 0) return;

    const expiryTime = Date.now() + value * 60 * 1000;

    setExpiryMap((prev) => ({
      ...prev,
      [id]: expiryTime,
    }));
  };

  const toggleAnonymous = (id) => {
    setAnonymousMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  console.log(expiryMap);
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

  // Submit
  function submitResponse() {
    setSubmit(true);

    const newPoll = {
      question: pollData.question,
      options: [...pollData.options],
    };

    setSubmittedPoll((prev) => [newPoll, ...prev]);

    setPollData({
      question: "",
      options: [""],
    });
  }

  async function handlePublish(e) {
    let question = e.question;

    let optionsElements = e.options;

    let formattedOptions = Array.from(optionsElements).map((option) => ({
      text: option.trim(),
    }));

    const pollData = {
      question,
      options: formattedOptions,
      allowAnonymous: anonymousMap,
      expiresAt: expiryMap[0],
    };

    const isPollActive = (id) => {
      return !expiryMap[id] || Date.now() < expiryMap[id];
    };

    let res = await fetch(
      "https://pollwave-0qpi.onrender.com/poll/pollCreate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(pollData),
      },
    );

    let response = await res.json();
    console.log(response);
    if (response.success) {
      showPopup(
        `https://pollwave-0qpi.onrender.com/poll/${response.data.resObject}`,
        "success",
      );
    }
  }

  async function handleSignOut() {
    try {
      await fetch("https://pollwave-0qpi.onrender.com/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);

      window.location.href = "/auth";
    } catch (error) {
      console.log(error);
    }
  }
  console.log(anonymousMap);

  return (
    <div className="min-h-screen bg-[#070A14] text-white font-sans ">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0B1120]">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-[#5B4FE8] flex items-center justify-center font-bold">
            P
          </div>

          <span className="font-bold text-[16px]">PollWave</span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Link
            to="/analytics"
            className="px-4 py-2 rounded-[10px] border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            📊 Analytics
          </Link>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown((prev) => !prev)}
              className="cursor-pointer"
            >
              <div className="w-[42px] h-[42px] rounded-full bg-[#5B4FE8] flex items-center justify-center font-bold text-white text-[16px]">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </button>

            {/* DROPDOWN */}
            {showProfileDropdown && (
              <div className="absolute top-[55px] right-0 w-[260px] bg-[#111827] border border-white/10 rounded-2xl p-4 z-50 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#5B4FE8] flex items-center justify-center font-bold text-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      {user?.name || "Unknown User"}
                    </p>

                    <p className="text-[13px] text-gray-400">
                      {user?.email || "No Email"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* EDITOR */}
        <div className="bg-[#0F172A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur">
          {/* HEADER */}
          <div className="px-8 py-7 border-b border-white/10">
            <div className="text-4xl font-bold tracking-tight">
              Create a new poll
            </div>

            <div className="text-gray-400 mt-2 text-[15px]">
              Add your question and options below.
            </div>
          </div>

          {/* BODY */}
          <div className="px-8 py-8">
            {/* QUESTION */}
            <div className="mb-6">
              <label className="block mb-3 text-sm font-semibold text-gray-200">
                Question
              </label>

              <input
                type="text"
                placeholder="Enter your question"
                value={pollData.question}
                onChange={handleQuestionChange}
                className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#5B4FE8]"
              />
            </div>

            {/* OPTIONS */}
            <div className="space-y-4">
              {pollData.options.map((option, index) => (
                <div key={index}>
                  <label className="block mb-3 text-sm font-semibold text-gray-200">
                    Option {index + 1}
                  </label>

                  <input
                    type="text"
                    placeholder="Enter option"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#5B4FE8]"
                  />
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={handleAddOption}
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-medium"
              >
                Add Option
              </button>

              <button
                onClick={submitResponse}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#5B4FE8] to-[#7C6CFF] hover:scale-[1.02] transition font-semibold shadow-lg shadow-[#5B4FE8]/30"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* SUBMITTED POLLS */}
        {submit &&
          submittedPoll.length > 0 &&
          submittedPoll.map((ele, index) => (
            <div
              key={index}
              className="mt-6 bg-[#111827] border border-white/10 rounded-3xl p-6"
            >
              {/* Question */}
              <p className="text-xl font-bold mb-5">{ele.question}</p>

              {/* Options */}
              <div className="flex flex-wrap gap-3 mb-4">
                {ele.options.map((elem, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-[#1F2937] border border-white/10 text-sm"
                  >
                    {elem}
                  </span>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between bg-[#0B1220] border border-white/10 p-4 rounded-xl">
                {/* Anonymous Toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300">Anonymous</span>

                  <button
                    onClick={() => toggleAnonymous(ele._id || index)}
                    className={`w-12 h-6 flex items-center rounded-full transition-all duration-300
              ${anonymousMap[ele._id || index] ? "bg-green-500" : "bg-gray-600"}`}
                  >
                    <span
                      className={`h-5 w-5 bg-white rounded-full transition-all duration-300
                ${anonymousMap[ele._id || index] ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2">
                  {/* Minutes input */}
                  <input
                    type="number"
                    min="1"
                    placeholder="mins"
                    value={customTime[ele._id || index] || ""}
                    onChange={(e) =>
                      setCustomTime((prev) => ({
                        ...prev,
                        [ele._id || index]: e.target.value,
                      }))
                    }
                    className="w-16 bg-[#1F2937] text-white text-xs px-2 py-1 rounded-lg border border-white/10"
                  />

                  {/* Set button */}
                  <button
                    onClick={() => setCustomPollTimer(ele._id || index)}
                    className="px-3 py-1 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                  >
                    Set
                  </button>

                  {/* Status */}
                  <span className="text-xs text-gray-400">
                    {expiryMap[ele._id || index]
                      ? Date.now() < expiryMap[ele._id || index]
                        ? "🟢 Active"
                        : "🔴 Expired"
                      : "♾️ Unlimited"}
                  </span>
                </div>
              </div>

              {/* Publish */}
              <button
                onClick={() =>
                  handlePublish(
                    ele,
                    anonymousMap[ele._id || index],
                    expiryMap[ele._id || index] || null,
                  )
                }
                className="cursor-pointer ml-auto mt-6 block px-6 py-3 rounded-2xl bg-gradient-to-r from-[#5B4FE8] to-[#6F63FF] font-semibold shadow-lg shadow-[#5B4FE8]/30 hover:scale-[1.02] transition"
              >
                Publish
              </button>
            </div>
          ))}
      </main>
    </div>
  );
}
