import React from "react";


function ChatUser({ user, selected, onClick }) {
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-xl transition cursor-pointer border border-transparent hover:border-primary hover:bg-primary/10 ${selected ? "bg-primary/10 border-primary" : "bg-base-200"}`}
      onClick={onClick}
    >
      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary shadow-sm">
        <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-base leading-tight text-base-content">{user.name}</h1>
        <span className="text-xs text-base-content/60">{user.email}</span>
      </div>
    </div>
  );
}

export default ChatUser;

