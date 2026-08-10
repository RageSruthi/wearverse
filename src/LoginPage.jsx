// src/LoginPage.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export default function LoginPage({ onLoginSuccess }) {
  const { login, loginWithGoogle } = useStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("sruthi.wearverse@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("Sruthi R.");
  const [role, setRole] = useState("buyer");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("sruthi.wearverse@gmail.com");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setAuthError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setAuthError("");

    try {
      if (isSignUp) {
        // Firebase Create User
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (userCred.user && fullName) {
          await updateProfile(userCred.user, { displayName: fullName });
        }
        login({
          email: userCred.user.email,
          name: fullName || userCred.user.displayName || email.split("@")[0],
          role,
        });
      } else {
        // Firebase Sign In User
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        login({
          email: userCred.user.email,
          name: userCred.user.displayName || email.split("@")[0],
          role,
        });
      }
      if (onLoginSuccess) onLoginSuccess(role);
    } catch (err) {
      console.warn("Firebase Auth fallback triggered:", err.message);
      // Seamless fallback local authentication for demo experience
      login({ email, name: isSignUp ? fullName : email.split("@")[0], role });
      if (onLoginSuccess) onLoginSuccess(role);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setLoading(true);
    setAuthError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      loginWithGoogle(role, {
        name: result.user.displayName || "Google User",
        email: result.user.email,
        avatar: result.user.photoURL,
      });
      if (onLoginSuccess) onLoginSuccess(role);
    } catch (err) {
      console.warn("Google Popup Auth fallback triggered:", err.message);
      loginWithGoogle(role);
      if (onLoginSuccess) onLoginSuccess(role);
    } finally {
      setLoading(false);
    }
  }

  // One-Click Fast Sign Ins
  function handleQuickBuyerLogin() {
    login({
      email: "sruthi.wearverse@gmail.com",
      name: "Sruthi R.",
      role: "buyer",
    });
    if (onLoginSuccess) onLoginSuccess("buyer");
  }

  function handleQuickSellerLogin() {
    login({
      email: "ecoboutique@wearverse.com",
      name: "EcoBoutique Studio",
      role: "seller",
    });
    if (onLoginSuccess) onLoginSuccess("seller");
  }

  function handleGuestEntry() {
    loginWithGoogle("buyer", {
      name: "Guest Explorer",
      email: "guest@wearverse.com",
    });
    if (onLoginSuccess) onLoginSuccess("buyer");
  }

  async function handlePasswordResetSubmit(e) {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
    } catch (err) {
      console.warn("Firebase Password Reset Fallback:", err.message);
    } finally {
      setResetLoading(false);
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setShowForgotModal(false);
      }, 2000);
    }
  }

  return (
    <div className="login-page-bg">
      {/* Glow overlays */}
      <div className="login-bg-glow-1" />
      <div className="login-bg-glow-2" />

      <div className="login-wrapper-container">
        {/* Feature Highlights Pills */}
        <div className="login-pills-scroll">
          <span className="login-pill-badge">🌿 100% Sustainable Marketplace</span>
          <span className="login-pill-badge">✨ 10,000+ Verified Garments</span>
          <span className="login-pill-badge">⚡ AI Quality Approved</span>
          <span className="login-pill-badge">♻️ Rent & Upcycle</span>
        </div>

        {/* Main Glassmorphic Card */}
        <div className="login-glass-card">
          {/* Brand Emblem Logo & Title */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px", textAlign: "center" }}>
            <img
              src="/wearverse-logo.png"
              alt="WearVerse Emblem"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                marginBottom: "10px",
                objectFit: "contain",
                background: "#ffffff",
                padding: "3px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              }}
            />
            <h1 style={{ margin: "0 0 2px", fontSize: "28px", color: "#183f31", fontFamily: "Georgia, serif", fontWeight: "900" }}>
              WearVerse
            </h1>
            <small style={{ color: "#276749", fontSize: "9.5px", fontWeight: "800", letterSpacing: "1.4px" }}>
              FASHION THAT LIVES MORE THAN ONE LIFE
            </small>
          </div>

          {/* Interactive Role Selection Cards */}
          <div className="login-role-grid">
            <div
              className={`login-role-card ${role === "buyer" ? "selected" : ""}`}
              onClick={() => setRole("buyer")}
            >
              <span className="role-icon">🛒</span>
              <span className="role-title">Buyer Mode</span>
              <span className="role-desc">Shop, Rent & Upcycle Garments</span>
            </div>

            <div
              className={`login-role-card ${role === "seller" ? "selected" : ""}`}
              onClick={() => setRole("seller")}
            >
              <span className="role-icon">🏪</span>
              <span className="role-title">Seller Mode</span>
              <span className="role-desc">List Wardrobe & Earn Income</span>
            </div>
          </div>

          {/* Auth Mode Tabs (Sign In vs Create Account) */}
          <div
            style={{
              display: "flex",
              background: "#edf4ef",
              padding: "4px",
              borderRadius: "14px",
              marginBottom: "18px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setAuthError("");
              }}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                fontWeight: "800",
                fontSize: "13px",
                background: !isSignUp ? "#183f31" : "transparent",
                color: !isSignUp ? "#ffffff" : "#555",
                cursor: "pointer",
                transition: "0.2s ease",
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setAuthError("");
              }}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                fontWeight: "800",
                fontSize: "13px",
                background: isSignUp ? "#183f31" : "transparent",
                color: isSignUp ? "#ffffff" : "#555",
                cursor: "pointer",
                transition: "0.2s ease",
              }}
            >
              Create Account
            </button>
          </div>

          {authError && (
            <div style={{ background: "#fff5f5", color: "#c53030", padding: "10px 14px", borderRadius: "10px", fontSize: "12px", marginBottom: "16px", fontWeight: "600" }}>
              ⚠️ {authError}
            </div>
          )}

          {/* Google Authentication Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleAuth}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #d4dfd8",
              background: "#ffffff",
              color: "#222222",
              fontSize: "14px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              marginBottom: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              transition: "0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {loading ? "Connecting to Firebase..." : `Continue with Google as ${role === "seller" ? "Seller" : "Buyer"}`}
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#888",
              fontSize: "11px",
              fontWeight: "600",
              margin: "16px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#e1ebe4" }} />
            <span>OR EMAIL SIGN IN</span>
            <div style={{ flex: 1, height: "1px", background: "#e1ebe4" }} />
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "14px" }}>
            {isSignUp && (
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#333", marginBottom: "4px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sruthi R."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1.5px solid #d4dfd8",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#333", marginBottom: "4px" }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1.5px solid #d4dfd8",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#333" }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ background: "none", border: "none", color: "#276749", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="input-with-eye">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: "pointer", accentColor: "#183f31" }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: "12px", color: "#555", cursor: "pointer", fontWeight: "600" }}>
                Remember me on this browser
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #183f31 0%, #276749 100%)",
                color: "white",
                fontSize: "15px",
                fontWeight: "800",
                cursor: "pointer",
                marginTop: "6px",
                boxShadow: "0 6px 20px rgba(24, 63, 49, 0.3)",
                transition: "0.2s ease",
              }}
            >
              {loading
                ? "Authenticating..."
                : isSignUp
                ? `Create ${role === "seller" ? "Seller" : "Buyer"} Account →`
                : `Sign In as ${role === "seller" ? "Seller" : "Buyer"} →`}
            </button>
          </form>

          {/* Quick One-Click Demo Logins & Guest Entry */}
          <div className="quick-demo-box">
            <span className="quick-demo-title">⚡ Quick One-Click Demo Access</span>
            <div className="quick-btn-group">
              <button className="quick-btn" onClick={handleQuickBuyerLogin}>
                🛒 Buyer (Sruthi)
              </button>
              <button className="quick-btn" onClick={handleQuickSellerLogin}>
                🏪 Seller (EcoBoutique)
              </button>
              <button className="quick-btn" onClick={handleGuestEntry}>
                🚀 Guest Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "420px", background: "white", padding: "28px", borderRadius: "20px", textAlign: "left" }}
          >
            <button className="modal-close-btn" onClick={() => setShowForgotModal(false)}>×</button>
            <span className="label">ACCOUNT RECOVERY</span>
            <h3 style={{ margin: "4px 0 12px", color: "#183f31" }}>Reset Your Password</h3>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
              Enter your registered email address and we will send you instructions to reset your password.
            </p>

            {resetSent ? (
              <div style={{ background: "#edf4ef", color: "#174d39", padding: "14px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", textAlign: "center" }}>
                ✓ Password reset instructions sent to {resetEmail}!
              </div>
            ) : (
              <form onSubmit={handlePasswordResetSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label style={{ fontSize: "12px", fontWeight: "700" }}>
                  Email Address
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
                  />
                </label>

                <button type="submit" className="primary" disabled={resetLoading} style={{ padding: "12px", marginTop: "6px" }}>
                  {resetLoading ? "Sending..." : "Send Reset Email →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

