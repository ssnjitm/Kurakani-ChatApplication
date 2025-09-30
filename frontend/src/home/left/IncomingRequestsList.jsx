import React from "react";

function IncomingRequestsList({ requests, onAccept, onReject }) {
  if (!requests.length) {
    return <div className="text-gray-400 text-center mt-8">No incoming requests.</div>;
  }
  return (
    <div className="flex flex-col gap-3">
      {requests.map((req) => (
        <div key={req._id} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg shadow">
          <img src={req.fromUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(req.fromUser?.username || 'User')}`} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <div className="font-semibold">{req.fromUser?.username || 'User'}</div>
            <div className="text-xs text-gray-400">{req.fromUser?.email}</div>
          </div>
          <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded" onClick={() => onAccept(req._id)}>Accept</button>
          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded" onClick={() => onReject(req._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default IncomingRequestsList;
