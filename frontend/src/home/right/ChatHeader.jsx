import React from "react";

function ChatHeader({ user }) {
  return (
    <div className="flex items-center gap-4 p-6 border-b border-base-200 bg-white sticky top-0 z-10 rounded-t-3xl shadow-lg">
      <div className="w-14 h-14 rounded-full overflow-hidden cursor-pointer border-2 border-primary shadow-md">
        <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
      </div>
      <div>
        <h3 className="font-bold text-xl text-base-content">{user.name}</h3>
        <span className="text-xs text-base-content/60 font-medium">{user.email}</span>
      </div>
    </div>
  );
}

export default ChatHeader;
