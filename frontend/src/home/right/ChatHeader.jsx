import React from "react";

function ChatHeader({ user }) {
  return (
    <div className="flex items-center gap-4 p-5 border-b border-base-200 bg-base-100 sticky top-0 z-10 rounded-t-xl">
      <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 border-primary shadow-sm">
        <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-base-content">{user.name}</h3>
        <span className="text-xs text-base-content/60">{user.email}</span>
      </div>
    </div>
  );
}

export default ChatHeader;
