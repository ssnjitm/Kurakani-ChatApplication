import React from "react";
import { FiUserPlus } from "react-icons/fi";

function FindPeopleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Find People"
      className="flex items-center gap-2 px-4 py-2 
                 bg-gradient-to-r from-indigo-500 to-purple-600 
                 hover:from-purple-600 hover:to-indigo-500
                 text-white rounded-xl shadow-md hover:shadow-lg 
                 transition-all duration-200 font-semibold text-base"
    >
      <FiUserPlus size={20} />
      <span className="hidden sm:inline">Find People</span>
    </button>
  );
}

export default FindPeopleButton;
