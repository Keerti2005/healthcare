import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const HuggingChatbot = ({
  fullPage = false,
  vitals = {
    heartRate: 80,
    temperature: 36.6,
    spo2: 98,
    bloodPressure: "120/80",
    ecgStatus: "Normal",
  },
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const vitalSummary = `Current patient vitals: Heart Rate = ${vitals.heartRate} bpm, Temperature = ${vitals.temperature}°C, SpO₂ = ${vitals.spo2}%, Blood Pressure = ${vitals.bloodPressure}, ECG = ${vitals.ecgStatus}.`;

    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `Instruction: You are a helpful medical assistant. ${vitalSummary} Based on this, respond to the user query.\nUser: ${input}\nAssistant:`,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        alert("Hugging Face Error: " + data.error);
      } else {
        const botMessage = {
          role: "assistant",
          content:
            data[0]?.generated_text
              ?.replace(
                `Instruction: You are a helpful medical assistant. ${vitalSummary} Based on this, respond to the user query.\nUser: ${input}\nAssistant:`,
                ""
              )
              ?.trim() || "Sorry, I didn’t understand that.",
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Floating Button
  if (!fullPage) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative group">
          <div className="absolute right-16 bg-blue-600 text-white px-3 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Hi, how can I help you?
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
            onClick={() => navigate("/chatbot")}
          >
            <FaRobot size={24} />
          </button>
        </div>
      </div>
    );
  }

  // Full Page Chatbot
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden text-white">
      {/* 🌟 Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0 animate-pulse" />

      <div className="relative z-10 w-full max-w-3xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-blue-700 rounded-2xl shadow-2xl p-6">
        {/* Heading */}
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-6 text-blue-400 animate-bounce">
          Ask Me Anything 🩺✨
        </h1>

        {/* Messages */}
        <div className="flex-1 h-[400px] overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-blue-700 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-700 text-white text-right"
                  : "bg-gray-800 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-gray-400 text-sm">Typing...</div>}
        </div>

        {/* Input Box */}
        <div className="flex">
          <input
            className="flex-1 bg-gray-900 border border-blue-700 text-white px-4 py-2 rounded-l-full placeholder-gray-400 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-full font-semibold transition"
            onClick={sendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default HuggingChatbot;
