import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function BackToChatsButton() {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow font-semibold text-base"
      onClick={() => navigate("/")}
      title="Back to Chats"
    >
      <FiArrowLeft size={20} />
      <span className="hidden sm:inline">Back to Chats</span>
    </button>
  );
}

export default BackToChatsButton;
