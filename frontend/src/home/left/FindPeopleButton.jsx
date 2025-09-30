import React from "react";
import { FiUserPlus } from "react-icons/fi";

function FindPeopleButton({ onClick }) {
  return (
    <button
      className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition font-semibold text-base"
      onClick={onClick}
      title="Find People"
    >
      <FiUserPlus size={20} />
      <span className="hidden sm:inline">Find People</span>
    </button>
  );
}

export default FindPeopleButton;
