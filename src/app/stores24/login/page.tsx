"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, setSession } from "@/lib/stores24/auth";
import { readStores24Data } from "@/lib/stores24/storage";
import { loginUser, registerUser } from "@/app/actions/auth";
import { Loader2 } from "lucide-react";

export default function Stores24AuthPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("Stores24");

  // Auth Modes
  const [isSignUp, setIsSignUp] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStoreName(readStores24Data().settings.storeName || "Stores24");

    const current = getSession();
    if (current) {
      router.replace(current.role === "Cashier" ? "/stores24/pos" : "/stores24/dashboard");
    }
  }, [router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setIsLoading(false);
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        setIsLoading(false);
        return;
      }

      const result = await registerUser({ name, username, password });

      if (result.success && result.user) {
        // Auto-login after successful registration
        const session = {
          id: result.user.id.toString(),
          username: result.user.username,
          name: name,
          role: result.user.role
        };
        setSession(session);
        router.push("/stores24/dashboard");
      } else {
        setError(result.error || "Failed to create account.");
        setIsLoading(false);
      }
    } else {
      // Login Mode
      const result = await loginUser({ username, password });

      if (result.success && result.user) {
        const session = {
          id: result.user.id.toString(),
          username: result.user.username,
          name: result.user.name,
          role: result.user.role
        };
        setSession(session);
        router.push(session.role === "Cashier" ? "/stores24/pos" : "/stores24/dashboard");
      } else {
        setError(result.error || "Invalid credentials.");
        setIsLoading(false);
      }
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(160deg, #eff6ff 0%, #f8fafc 55%, #ecfeff 100%)", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "430px", background: "#fff", border: "1px solid #dbeafe", borderRadius: "18px", boxShadow: "0 20px 40px rgba(15,23,42,0.08)", padding: "2rem" }}>

        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>{storeName}</div>
          <div style={{ fontSize: "0.95rem", color: "#64748b", marginTop: "0.25rem" }}>
            {isSignUp ? "Create your workspace account" : "Secure admin & staff login"}
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>

          {isSignUp && (
            <label style={{ display: "grid", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>
              Full Name
              <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" style={{ border: "1px solid #cbd5e1", borderRadius: "10px", padding: "0.75rem", outline: "none", fontSize: "0.95rem" }} />
            </label>
          )}

          <label style={{ display: "grid", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>
            Work Email / Username
            <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="name@company.com" style={{ border: "1px solid #cbd5e1", borderRadius: "10px", padding: "0.75rem", outline: "none", fontSize: "0.95rem" }} />
          </label>

          <label style={{ display: "grid", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>
            Password
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ border: "1px solid #cbd5e1", borderRadius: "10px", padding: "0.75rem", outline: "none", fontSize: "0.95rem" }} />
          </label>

          {isSignUp && (
            <label style={{ display: "grid", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>
              Confirm Password
              <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={{ border: "1px solid #cbd5e1", borderRadius: "10px", padding: "0.75rem", outline: "none", fontSize: "0.95rem" }} />
            </label>
          )}

          {error && <p style={{ margin: 0, color: "#dc2626", fontSize: "0.9rem", background: "#fee2e2", padding: "0.75rem", borderRadius: "8px", fontWeight: 500 }}>{error}</p>}

          <button type="submit" disabled={isLoading} style={{ border: "none", background: "#1d4ed8", color: "white", borderRadius: "10px", padding: "0.9rem", fontSize: "1rem", fontWeight: 700, cursor: isLoading ? "not-allowed" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", boxShadow: "0 4px 14px rgba(29, 78, 216, 0.2)" }}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? "Create Workspace" : "Sign In")}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#64748b", textAlign: "center" }}>
          {isSignUp ? "Already have an account? " : "Don't have a workspace? "}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(""); }} style={{ background: "none", border: "none", color: "#1d4ed8", fontWeight: 700, cursor: "pointer", padding: 0, fontSize: "0.9rem" }}>
            {isSignUp ? "Sign In" : "Create an Account"}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
          <Link href="/" style={{ display: "inline-block", color: "#64748b", fontSize: "0.85rem", textDecoration: "none", fontWeight: 500 }}>
            &larr; Back to BlueVolt Home
          </Link>
        </div>
      </div>
    </main>
  );
}


