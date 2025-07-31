// OLD CODE SNIPPET
// "use client";
// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { SignInButton } from "@/components/ui/button";
// import { User, Stethoscope } from "lucide-react";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       if (!email || !password) {
//         throw new Error("Email and password are required");
//       }

//       if (!isLogin && password !== confirmPassword) {
//         throw new Error("Passwords do not match");
//       }

//       const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong");
//       }

//       // ✅ Login or registration was successful
//       window.location.href = "/salesperson";
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <User className="w-8 h-8 text-blue-600" />
//             <h1 className="text-3xl font-bold text-gray-800">
//               {isLogin ? "Salesperson Login" : "Register"}
//             </h1>
//           </div>
//           <p className="text-gray-600 text-lg">
//             {isLogin
//               ? "Access to the Physician Survey Form"
//               : "Create a new account"}
//           </p>
//         </div>

//         <Card className="shadow-lg border-0">
//           <CardHeader className="bg-gradient-to-r from-pink-600 to-pink-700 text-white">
//             <CardTitle className="flex items-center gap-2">
//               <Stethoscope className="w-5 h-5" />
//               {isLogin ? "Sign In" : "Register"}
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="p-6">
//             <form onSubmit={handleAuth} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your-email@example.com"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm Password</Label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               )}
//               {error && <p className="text-red-500 text-sm">{error}</p>}
//               <SignInButton
//                 type="submit"
//                 className="w-full cursor-pointer rounded-full"
//                 disabled={loading}
//               >
//                 {loading
//                   ? isLogin
//                     ? "Signing in..."
//                     : "Registering..."
//                   : isLogin
//                   ? "Sign In"
//                   : "Register"}
//               </SignInButton>
//             </form>

//             <div className="text-sm text-center mt-4 text-gray-600">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <button
//                 type="button"
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-blue-600 hover:underline ml-1"
//               >
//                 {isLogin ? "Register" : "Sign In"}
//               </button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInButton } from "@/components/ui/button";
import { User, Stethoscope } from "lucide-react";
import toast from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved email if Remember Me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    if (!email.trim()) {
      throw new Error("Email is required");
    }
    if (!isValidEmail(email)) {
      throw new Error("Please enter a valid email address");
    }
    if (!password.trim()) {
      throw new Error("Password is required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (!isLogin && password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
  };

  const handleAuth = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        // Validate form inputs
        validateForm();

        // Save or clear email in localStorage
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        if (!isLogin) {
          // Register user
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Registration failed");
          }

          // Clear form after successful registration
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setRememberMe(false);
          toast.success("Registered successfully! You can now log in.");
          setIsLogin(true); // switch to login mode
        } else {
          // Login user
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          toast.success("Logged in successfully");
          // Redirect to salesperson
          router.push("/salesperson");
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [email, password, confirmPassword, rememberMe, isLogin, router]
  );

  const handleModeToggle = useCallback(() => {
    setIsLogin((prev) => !prev);
    setError(null);
    setPassword("");
    setConfirmPassword("");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Salesperson Login" : "Register"}
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {isLogin
              ? "Access to the Physician Survey Form"
              : "Create a new account"}
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-pink-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              {isLogin ? "Sign In" : "Register"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleAuth} className="space-y-4" noValidate>
              <FormField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && error.includes("email") ? error : null}
              />

              <FormField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error && error.includes("password") ? error : null}
              />

              {!isLogin && (
                <FormField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={error && error.includes("match") ? error : null}
                />
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    aria-label="Remember me"
                  />
                  Remember me
                </label>
                {isLogin && (
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm" role="alert">
                  {error}
                </p>
              )}

              <SignInButton
                type="submit"
                className="w-full rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                aria-label={
                  loading ? "Processing..." : isLogin ? "Sign In" : "Register"
                }
              >
                {loading
                  ? isLogin
                    ? "Signing in..."
                    : "Registering..."
                  : isLogin
                  ? "Sign In"
                  : "Register"}
              </SignInButton>
            </form>

            <div className="text-sm text-center mt-4 text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={handleModeToggle}
                className="text-blue-600 hover:underline ml-1 transition-colors cursor-pointer"
                aria-label={
                  isLogin ? "Switch to registration" : "Switch to login"
                }
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable Input Field Component
function FormField({ id, label, type, value, onChange, error }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={type === "email" ? "your-email@example.com" : "••••••••"}
        required
        className={`${error ? "border-red-500 focus:border-red-500" : ""}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
