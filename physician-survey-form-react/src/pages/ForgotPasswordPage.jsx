import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";
import api from '../api/axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This API endpoint will need to be replaced with your new backend API endpoint
      const res = await api.post("/auth/forgot-password", { email }); // Use api.post

      toast.success("Password reset link sent to your email.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleForgotPassword}
        className="max-w-sm w-full space-y-4 bg-white p-6 rounded-[15px] shadow-sm"
      >
        <h2 className="text-xl font-semibold">Forgot your password ?</h2>
        <p className="text-gray-500 text-sm">
          Enter your email address and we'll send you a reset link.
        </p>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 disabled:hover:shadow-none bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white font-medium py-3 px-6 rounded-lg border-0 shadow-md hover:shadow-xl cursor-pointer"
          disabled={loading}
          aria-label={
            loading ? "Sending reset link..." : "Send password reset link"
          }
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
