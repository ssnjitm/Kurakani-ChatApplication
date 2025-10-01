import React from "react";

function ChatUser({ user, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 
        ${selected 
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl" 
          : "bg-gradient-to-r from-white to-gray-50 hover:from-indigo-50 hover:to-purple-50 shadow-md hover:shadow-lg"
        }`}
    >
      {/* Avatar */}
      <div
        className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-md flex-shrink-0 
          ${selected ? "border-white" : "border-indigo-500/40"}`}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name + Email */}
      <div className="flex flex-col justify-center">
        <h1
          className={`font-bold text-base leading-tight 
            ${selected ? "text-white" : "text-gray-900"}`}
        >
          {user.name}
        </h1>
        <span
          className={`text-xs font-medium 
            ${selected ? "text-indigo-100" : "text-gray-500"}`}
        >
          {user.email}
        </span>
      </div>
    </div>
  );
}

export default ChatUser;
