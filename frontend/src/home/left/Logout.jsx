import React from "react";
import { FiLogOut } from "react-icons/fi";

function Logout({ onLogout }) {
  return (
    <button
      className="flex items-center gap-3 px-6 py-3 mt-6 bg-white/20 hover:bg-white/30 text-white rounded-xl shadow-lg w-full justify-center font-bold text-base transition-all duration-150 backdrop-blur-lg border border-white/30"
      onClick={onLogout}
    >
      <FiLogOut size={22} />
      Logout
    </button>
  );
}

export default Logout;
