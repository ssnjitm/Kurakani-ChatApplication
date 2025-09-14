import React from 'react'

function User({ name = "Sanjeet Mijar", email = "ssnjitm6@domain.com", avatar = "https://img.daisyui.com/images/profile/demo/gordon@192.webp" }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg shadow-sm transition hover:bg-gray-700 group">
      <div className="avatar avatar-online">
        <div className="w-14 h-14 rounded-full ring ring-blue-400 ring-offset-2 ring-offset-gray-900 overflow-hidden transition group-hover:ring-blue-300 group-hover:scale-105 cursor-pointer">
          <img
            src={avatar}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-base leading-tight">{name}</h1>
        <span className="text-xs text-gray-400">{email}</span>
      </div>
    </div>
  );
}

export default User
