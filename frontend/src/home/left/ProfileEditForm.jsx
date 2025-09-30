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
    <div className="bg-base-100 p-8 rounded-xl shadow-card w-full max-w-md flex flex-col gap-8 border border-base-200">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2 className="text-2xl font-display font-bold mb-2 text-primary">Edit Profile</h2>
        <label className="text-base-content/80 font-medium">Name
          <input name="name" value={form.name} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-lg bg-base-200 text-base-content border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary" required />
        </label>
        <label className="text-base-content/80 font-medium">Email
          <input name="email" value={form.email} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-lg bg-base-200 text-base-content border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary" required />
        </label>
        <label className="text-base-content/80 font-medium">Avatar URL
          <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full mt-1 px-4 py-3 rounded-lg bg-base-200 text-base-content border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        {error && <div className="text-error text-sm">{error}</div>}
        <button type="submit" className="bg-primary hover:bg-primary-focus text-primary-content px-6 py-3 rounded-lg font-semibold shadow transition" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      </form>
      <div className="border-t border-base-200 pt-6">
        <button
          className="text-primary underline text-sm mb-2 font-medium"
          onClick={() => setShowPassword((v) => !v)}
        >{showPassword ? "Hide" : "Change Password"}</button>
        {showPassword && (
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4 mt-2">
            <label className="text-base-content/80 font-medium">Current Password
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-lg bg-base-200 text-base-content border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary" required />
            </label>
            <label className="text-base-content/80 font-medium">New Password
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-lg bg-base-200 text-base-content border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary" required />
            </label>
            <label className="text-base-content/80 font-medium">Confirm New Password
              <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-lg bg-base-200 text-base-content border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary" required />
            </label>
            {passwordError && <div className="text-error text-sm">{passwordError}</div>}
            {passwordMsg && <div className="text-success text-sm">{passwordMsg}</div>}
            <button type="submit" className="bg-primary hover:bg-primary-focus text-primary-content px-6 py-3 rounded-lg font-semibold shadow transition">Change Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileEditForm;
