import React from "react";

function SentRequestsList({ requests }) {
  if (!requests.length) {
    return <div className="text-gray-400 text-center mt-8">No sent requests.</div>;
  }
  return (
    <div className="flex flex-col gap-3">
      {requests.map((req) => (
        <div key={req._id} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg shadow">
          <img src={req.to?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(req.to?.username || 'User')}`} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <div className="font-semibold">{req.to?.username || 'User'}</div>
            <div className="text-xs text-gray-400">{req.to?.email}</div>
          </div>
          <span className={`px-3 py-1 rounded text-xs ${req.status === 'pending' ? 'bg-yellow-600 text-white' : req.status === 'accepted' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{req.status}</span>
        </div>
      ))}
    </div>
  );
}

export default SentRequestsList;
