import React from "react";
import { Dialog } from "@headlessui/react";

function LogoutConfirm({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onCancel} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-6 w-96 shadow-2xl flex flex-col gap-4">
        <Dialog.Title className="text-xl font-bold text-white">
          Confirm Logout
        </Dialog.Title>
        <Dialog.Description className="text-white/80">
          Are you sure you want to logout? This will end your current session.
        </Dialog.Description>

        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 font-semibold rounded-lg bg-gray-600/40 hover:bg-gray-600/60 text-white transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 font-semibold rounded-lg bg-red-500/70 hover:bg-red-500/90 text-white transition"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default LogoutConfirm;
