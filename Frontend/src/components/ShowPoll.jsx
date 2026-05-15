import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { socket } from "../Socket.js";
import showPopup from "./Dashboard/dashboardPopUp.js";
import AccessDenied from "./firstScreen/Anonymous.jsx";
import PollExpired from "./firstScreen/expired.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useMemo } from "react";

function ShowPoll() {
  const COLORS = [
    "#3B82F6", // blue
    "#EF4444", // red
    "#10B981", // green
    "#F59E0B", // yellow
    "#8B5CF6", // purple
  ];

  const { id } = useParams();
  const { user, setUser } = useAuth();

  const [data, setData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState({});
  const [guest, setGuest] = useState(false);
  const [expire, setExpire] = useState(false);

  // const [mergedOptions, setMergedOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let _id = user?._id;

        const res = await fetch(
          "https://pollwave-0qpi.onrender.com/poll/pollData",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ id, userId: _id }),
          },
        );

        const response = await res.json();

        if (res.ok) {
          if (
            response.data.allowAnonymous == false ||
            response.data.expireStatus == true
          ) {
            setPageLoading(false);
            if (response.data.expireStatus) {
              setData(response.data.data);
              setExpire(true);
            } else {
              setGuest(true);
            }
          } else {
            setData(response.data);
            setPageLoading(false);
          }
        } else {
          if (!response.success) {
            setPageLoading(false);
            setGuest(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [id, user]);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit("joinPoll", id);
    };

    const handlePollUpdate = (data) => {
      console.log("pollUpdate", data);
      setResults(data);
    };

    const handleConnectError = (err) => {
      console.error("Socket connection error:", err);
    };

    socket.on("connect", handleConnect);
    socket.on("pollUpdate", handlePollUpdate);
    socket.on("connect_error", handleConnectError);

    if (!socket.connected) {
      socket.connect();
    } else {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("pollUpdate", handlePollUpdate);
      socket.off("connect_error", handleConnectError);
    };
  }, [id]);

  const mergedOptions = useMemo(() => {
    if (!data?.options) return [];

    return data.options.map((opt) => ({
      ...opt,
      votes: results[opt._id] ?? opt.vote ?? 0,
    }));
  }, [data, results]);

  const handleSubmit = () => {
    async function submitVote() {
      try {
        let name;
        if (!user.name) {
          if (!name || name.trim() === "") {
            name = prompt("Enter Your Name");
          }

          if (!name || name.trim() === "") {
            return; // stop submit if still invalid
          }
          name = name.trim();
        } else {
          name = user?.name;
        }

        setBtnLoading(true);

        const res = await fetch(
          "https://pollwave-0qpi.onrender.com/poll/vote",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ pollId: id, optionId: selected, name }),
          },
        );

        const response = await res.json();

        if (!res.ok) {
          showPopup(response.message);
          setSubmitted(true);
          return;
        }

        socket.emit("vote", {
          pollId: id,
          optionId: selected,
        });

        setSubmitted(true);
      } catch (err) {
        console.log(err);
      } finally {
        setBtnLoading(false);
      }
    }

    submitVote();
  };

  if (pageLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading poll...
      </div>
    );
  }
  if (guest) {
    return <AccessDenied />;
  }
  if (expire) {
    return <PollExpired mergedOptions={mergedOptions} />;
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Poll not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#020617] text-white">
      {/* NAVBAR */}
      <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0">
        <div className="flex items-center gap-2 font-bold text-lg">
          🌊 PollWave
        </div>

        <div className="text-xs text-gray-400">Live Poll System</div>
      </div>

      {/* CENTER CONTENT */}

      <div className="flex flex-col md:flex-row justify-evenly">
        <div className="flex items-center justify-center min-h-[58vh] md:min-h-[90vh] p-4 w-full">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
            {/* QUESTION */}
            <h2 className="text-xl font-semibold text-center mb-8">
              {data.question}
            </h2>

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.options.map((opt, index) => {
                const isSelected = selected === opt._id;

                return (
                  <div
                    key={opt._id}
                    onClick={() => !submitted && setSelected(opt._id)}
                    className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 transform
                  ${
                    submitted
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-[1.03]"
                  }
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    {/* OPTION TEXT */}
                    <span className="font-medium">{opt.text}</span>

                    {/* SELECTION GLOW */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-2xl bg-blue-500/10 animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                disabled={!selected || submitted || btnLoading}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2
    ${
      submitted || btnLoading
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
    }
    disabled:opacity-40`}
              >
                {btnLoading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Submitting...
                  </>
                ) : submitted ? (
                  "Vote Submitted ✔"
                ) : (
                  "Submit Vote 🚀"
                )}
              </button>
            </div>

            {submitted && !showResult && (
              <button
                onClick={() => setShowResult(true)}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl"
              >
                View Result 📊
              </button>
            )}
          </div>
        </div>

        {showResult && (
          <div className="m-auto mr-5 w-full h-fit max-w-sm bg-gradient-to-br from-[#0F172A] to-[#111827] p-4 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white text-base font-semibold">
                Poll Results
              </h2>

              <span className="text-xs text-slate-400">Live Votes</span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                style={{ color: "white" }}
                data={mergedOptions.map((opt) => ({
                  name: opt.text,
                  votes: results[opt._id] ?? opt.vote ?? 0,
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
                  {data.options.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowPoll;

//socket not working
