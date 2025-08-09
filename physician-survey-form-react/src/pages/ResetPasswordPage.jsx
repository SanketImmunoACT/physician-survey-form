import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";
import api from '../api/axios';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      // This API endpoint will need to be replaced with your new backend API endpoint
      const res = await api.post("/auth/reset-password", { token, password }); // Use api.post

      toast.success("Password updated successfully!");
      window.location.href = "/"; // Redirect to home or login page
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token)
    return <p className="text-center text-red-500">Invalid or expired token</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        onSubmit={handleReset}
        className="max-w-sm w-full space-y-4 bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold">Reset your password</h2>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
