import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function BackToChatsButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      title="Back to Chats"
      className="flex items-center gap-2 px-6 py-3 
                 bg-gradient-to-r from-indigo-500 to-purple-600 
                 text-white font-semibold rounded-2xl shadow-lg 
                 hover:from-indigo-600 hover:to-purple-700 
                 transition-all duration-200 ease-in-out"
    >
      <FiArrowLeft size={22} className="text-white" />
      <span className="hidden sm:inline">Back to Chats</span>
    </button>
  );
}

export default BackToChatsButton;
