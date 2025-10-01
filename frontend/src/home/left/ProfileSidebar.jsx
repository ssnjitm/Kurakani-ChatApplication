import React, { useState } from "react";
import { FiSearch, FiUser, FiUserCheck, FiUserPlus, FiEdit2, FiLogOut } from "react-icons/fi";
import Users from "./Users";

function ProfileSidebar({ user, onEdit, onLogout, onViewRequests, onViewSent }) {
  return (
    <div className="flex flex-col gap-10 bg-white text-base-content p-10 rounded-3xl shadow-2xl min-w-[260px] max-w-[320px] h-full border border-base-200">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-md">
          <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
        </div>
        <h3 className="font-display font-extrabold text-2xl mt-2 text-primary">{user.name}</h3>
        <span className="text-sm text-base-content/60 font-medium">{user.email}</span>
        <button className="mt-3 px-6 py-2 bg-primary hover:bg-primary-focus rounded-xl text-primary-content flex items-center gap-2 text-base font-bold shadow-md transition-all duration-150" onClick={onEdit}>
          <FiEdit2 size={18} /> Edit Profile
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <button className="flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-base-200 transition-all duration-150 text-left font-bold" onClick={onViewRequests}>
          <FiUserCheck size={18} /> Incoming Requests
        </button>
        <button className="flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-base-200 transition-all duration-150 text-left font-bold" onClick={onViewSent}>
          <FiUserPlus size={18} /> Sent Requests
        </button>
        <button className="flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-error/10 transition-all duration-150 text-left text-error font-bold" onClick={onLogout}>
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
