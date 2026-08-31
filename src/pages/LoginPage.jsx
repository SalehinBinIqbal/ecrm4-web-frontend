import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

import bgImage from "../assets/bg.jpg";
import logo from "../assets/ECRM_Logo.svg";

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  if (isAuthenticated) return <Navigate to="/home" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/home");
    } else {
      setError("Invalid email or password.");
    }
  }

  function handleSendVerificationCode(e) {
    e.preventDefault();
    setVerificationSent(true);
  }

  function handleBackToLogin() {
    setShowForgotPassword(false);
    setForgotEmail("");
    setVerificationSent(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-200 p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card w-full max-w-3xl bg-base-100 rounded-box shadow-2xl shadow-black/20 overflow-hidden border border-base-200">
        <div className="flex flex-row">
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <img src={logo} alt="Prism ECRM" className="w-20 mb-8 mx-auto" />

            {showForgotPassword ? (
              <form
                onSubmit={handleSendVerificationCode}
                className="flex flex-col gap-3 text-center"
              >
                <h2 className="text-lg font-semibold -mt-2">
                  Trouble Logging In?
                </h2>
                <p className="text-sm text-base-content/70 mb-1">
                  Tell us your email and we will send you a verification code
                </p>

                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Email"
                />

                {verificationSent && (
                  <p className="text-success text-sm">
                    Verification code sent to {forgotEmail}.
                  </p>
                )}

                <button type="submit" className="btn btn-primary w-full mt-2">
                  Send Verification Code
                </button>
                <div className="flex items-center justify-center text-sm">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="link link-hover text-base-content/70 hover:text-base-content w-fit"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Email"
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full pr-10"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-base-content/50 hover:text-base-content"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-end text-sm mt-1">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="link link-hover text-base-content/70 hover:text-base-content"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {error && <p className="text-error text-sm">{error}</p>}

                  <button type="submit" className="btn btn-primary w-full mt-2">
                    Login
                  </button>
                </form>

                <p className="text-xs text-base-content/50 mt-6">
                  Demo credentials: admin@ecrm.com / admin123
                </p>
              </>
            )}
          </div>

          <div className="hidden sm:flex relative w-full md:w-1/2 bg-linear-to-br from-primary to-secondary text-primary-content p-10 flex-col justify-center overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white/10" />
            <h2 className="relative text-3xl font-bold tracking-tight mb-4">
              Welcome to Prism ECRM!
            </h2>
            <p className="relative text-primary-content/85 leading-relaxed">
              Everything you need to manage your business, in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
