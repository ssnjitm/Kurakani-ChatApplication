import React from "react";
import { FiLogOut } from "react-icons/fi";

function Logout({ onLogout }) {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 mt-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition w-full justify-center font-semibold text-base"
      onClick={onLogout}
    >
      <FiLogOut size={20} />
      Logout
    </button>
  );
}

export default Logout;
