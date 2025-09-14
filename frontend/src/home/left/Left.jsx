
import React from 'react';
import Search from './Search';
import Users from './Users';
import Logout from './Logout';
import LogoutConfirm from './LogoutConfirm';
import { useState } from 'react';
function Left({ selectedUser, onSelectUser }) {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => setShowLogout(true);
  const handleCancel = () => setShowLogout(false);
  const handleConfirm = () => {
    setShowLogout(false);
    alert('Logged out!'); // Replace with real logout logic
  };

  return (
    <>
      <div className="flex flex-col flex-[0.35] min-w-[280px] max-w-[400px] h-full border-r border-white bg-gray-800 text-white px-4 py-6 gap-4">
        <h2 className="font-bold text-xl mb-4 border-b border-gray-700 pb-2">Chats</h2>
        <Search />
        <div className="my-2 border-b border-gray-700" />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Users selectedUserId={selectedUser?.id} onSelectUser={onSelectUser} />
        </div>
        <div className="pt-2">
          <Logout onLogout={handleLogout} />
        </div>
      </div>
      <LogoutConfirm open={showLogout} onConfirm={handleConfirm} onCancel={handleCancel} />
    </>
  );
}

export default Left;
