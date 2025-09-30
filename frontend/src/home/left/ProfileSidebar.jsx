import React, { useState } from "react";
import { FiSearch, FiUser, FiUserCheck, FiUserPlus, FiEdit2, FiLogOut } from "react-icons/fi";
import Users from "./Users";

function ProfileSidebar({ user, onEdit, onLogout, onViewRequests, onViewSent }) {
  return (
    <div className="flex flex-col gap-6 bg-gray-800 text-white p-6 rounded-lg shadow-lg min-w-[260px] max-w-[320px] h-full">
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
          <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
        </div>
        <h3 className="font-bold text-lg mt-2">{user.name}</h3>
        <span className="text-xs text-gray-300">{user.email}</span>
        <button className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center gap-1 text-sm" onClick={onEdit}>
          <FiEdit2 /> Edit Profile
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-left" onClick={onViewRequests}>
          <FiUserCheck /> Incoming Requests
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-left" onClick={onViewSent}>
          <FiUserPlus /> Sent Requests
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-left text-red-400" onClick={onLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
