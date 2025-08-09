import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { SignInButton } from "../components/ui/button";
import { User, Stethoscope } from "lucide-react";
import toast from "react-hot-toast";
import api from '../api/axios';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email) {
        throw new Error("Email is required");
      }

      if (isLogin && !password) {
        throw new Error("Password is required");
      }

      // These API endpoints will need to be replaced with your new backend API endpoints
      const endpoint = isLogin ? "/auth/login" : "/auth/register"; // Use relative path for axios
      const body = isLogin ? { email, password } : { name, email, password }; // Added password for register

      const response = await api.post(endpoint, body); // Use api.post, Axios sends JSON by default

      const data = response.data; // Axios puts data in .data

      if (isLogin) {
        console.log("Login successful, API response:", data);
        toast.success("Logged in successfully");
        console.log("Checking role for redirection:", data.role);
        if (data.role === 'SUPERADMIN') {
          console.log("Redirecting to admin dashboard...");
          navigate("/admin/dashboard");
        } else if (data.role === 'SALESPERSON') {
          console.log("Redirecting to salesperson dashboard...");
          setTimeout(() => {
            navigate("/salesperson");
          }, 0);
        } else {
          console.log("Redirecting to default page...");
          navigate("/");
        }
      } else {
        toast.success(data.message);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Something went wrong"); // Axios error handling
      toast.error(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Login" : "Request Access"}
            </h1>
          </div>
          <p className="text-gray-600">
            {isLogin
              ? "Access to the Physician Survey Form"
              : "Request access to create an account"}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              {isLogin ? "Sign In" : "Register"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                  />
                </div>
              )}
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
              {isLogin && (
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
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <SignInButton
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Signing in..."
                    : "Submitting Request..."
                  : isLogin
                  ? "Sign In"
                  : "Request Access"}
              </SignInButton>
            </form>

            <div className="text-sm text-center mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "Request Access" : "Sign In"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
