import React, { useState } from "react";
import { FiSearch, FiUser, FiUserCheck, FiUserPlus, FiEdit2, FiLogOut } from "react-icons/fi";
import Users from "./Users";

function ProfileSidebar({ user, onEdit, onLogout, onViewRequests, onViewSent }) {
  return (
    <div className="flex flex-col gap-8 bg-base-100 text-base-content p-8 rounded-xl shadow-card min-w-[260px] max-w-[320px] h-full border border-base-200">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary shadow-sm">
          <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
        </div>
        <h3 className="font-display font-bold text-xl mt-2 text-primary">{user.name}</h3>
        <span className="text-xs text-base-content/60">{user.email}</span>
        <button className="mt-2 px-4 py-1 bg-primary hover:bg-primary-focus rounded-lg text-primary-content flex items-center gap-2 text-sm font-semibold shadow transition" onClick={onEdit}>
          <FiEdit2 /> Edit Profile
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-base-200 transition text-left font-medium" onClick={onViewRequests}>
          <FiUserCheck /> Incoming Requests
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-base-200 transition text-left font-medium" onClick={onViewSent}>
          <FiUserPlus /> Sent Requests
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-error/10 transition text-left text-error font-semibold" onClick={onLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
