import React, { useState } from "react";


function ProfileEditForm({ user, onSave }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    avatar: user.avatar || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Change password state
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      // Real API call to update user profile
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ username: form.name, email: form.email, avatar: form.avatar }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      onSave(form);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    setPasswordError("");
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to change password");
      setPasswordMsg("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setPasswordError(err.message);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-2 text-white">Edit Profile</h2>
        <label className="text-gray-300">Name
          <input name="name" value={form.name} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700" required />
        </label>
        <label className="text-gray-300">Email
          <input name="email" value={form.email} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700" required />
        </label>
        <label className="text-gray-300">Avatar URL
          <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700" />
        </label>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      </form>
      <div className="border-t border-gray-700 pt-4">
        <button
          className="text-blue-400 underline text-sm mb-2"
          onClick={() => setShowPassword((v) => !v)}
        >{showPassword ? "Hide" : "Change Password"}</button>
        {showPassword && (
          <form onSubmit={handleChangePassword} className="flex flex-col gap-3 mt-2">
            <label className="text-gray-300">Current Password
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700" required />
            </label>
            <label className="text-gray-300">New Password
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700" required />
            </label>
            <label className="text-gray-300">Confirm New Password
              <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700" required />
            </label>
            {passwordError && <div className="text-red-400 text-sm">{passwordError}</div>}
            {passwordMsg && <div className="text-green-400 text-sm">{passwordMsg}</div>}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">Change Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileEditForm;
