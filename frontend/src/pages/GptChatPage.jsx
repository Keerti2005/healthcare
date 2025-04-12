import React from "react";
import HuggingChatbot from "../components/GptChatBot"; // path might vary

const GptChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <HuggingChatbot fullPage />
    </div>
  );
};

export default GptChatPage;
