import React from "react";

function ChatHeader({ user }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white sticky top-0 z-10">
      <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
        <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
    </div>
  );
}

export default ChatHeader;
