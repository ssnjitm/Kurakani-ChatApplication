import React from "react";

function IncomingRequestsList({ requests, onAccept, onReject }) {
  if (!requests.length) {
    return <div className="text-white/70 text-center mt-8">No incoming requests.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {requests.map((req) => (
        <div
          key={req._id}
          className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition hover:shadow-2xl"
        >
          <img
            src={req.fromUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(req.fromUser?.username || "User")}`}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-indigo-400 shadow"
          />
          <div className="flex-1">
            <div className="font-semibold text-white">{req.fromUser?.username || "User"}</div>
            <div className="text-sm text-white/70">{req.fromUser?.email}</div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition"
              onClick={() => onAccept(req._id)}
            >
              Accept
            </button>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow transition"
              onClick={() => onReject(req._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IncomingRequestsList;
