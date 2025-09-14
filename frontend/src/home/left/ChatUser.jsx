import React from "react";

function ChatUser({ user, selected, onClick }) {
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg transition cursor-pointer hover:bg-blue-100 ${selected ? "bg-blue-200" : "bg-gray-900"}`}
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400">
        <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-sm leading-tight text-white">{user.name}</h1>
        <span className="text-xs text-gray-400">{user.email}</span>
      </div>
    </div>
  );
}

export default ChatUser;

