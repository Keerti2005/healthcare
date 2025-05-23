import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const HuggingChatbot = ({ fullPage = false }) => {
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

    let responseContent = "Hello! How can I assist you today?";

    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `Instruction: You are a helpful assistant. User: ${input}\nAssistant:`,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (data?.error) {
        throw new Error(`Hugging Face Error: ${data.error}`);
      }

      responseContent =
        data?.[0]?.generated_text?.replace(
          `Instruction: You are a helpful assistant. User: ${input}\nAssistant:`,
          ""
        )?.trim() || "Sorry, I didn’t understand that.";
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
      console.error("Error during API request:", error);
    }

    const botMessage = {
      role: "assistant",
      content: responseContent,
    };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  // Floating button for compact version
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

  // Full page version
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between bg-black text-white relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px] opacity-10 animate-pulse z-0" />

      {/* Chat container */}
      <div className="relative z-10 flex flex-col w-full max-w-4xl h-full p-6">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-blue-400 animate-bounce mb-4">
          Ask Me Anything 🩺✨
        </h1>

        <div className="flex-1 overflow-y-auto bg-gray-900 rounded-xl p-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-700">
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
          {loading && (
            <div className="text-gray-400 text-sm italic">Typing...</div>
          )}
        </div>

        <div className="flex mt-4">
          <input
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything..."
          />
          <button
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default HuggingChatbot;
