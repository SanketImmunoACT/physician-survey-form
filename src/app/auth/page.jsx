"use client";

import { useState } from "react";
// import { supabase } from '@/lib/supabaseClient';
import { SignInButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Stethoscope } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Redirect to the dashboard or home page on successful login
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Salesperson Login
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Access to the Physician Survey Form
          </p>
        </div>
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-pink-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <SignInButton
                type="submit"
                className="w-full cursor-pointer rounded-full"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </SignInButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
