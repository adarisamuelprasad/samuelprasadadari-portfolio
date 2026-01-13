import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle, Terminal } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };
  return <main className="flex min-h-screen items-center justify-center bg-background p-6"><div className="pointer-events-none absolute inset-0"><div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" /><div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" /></div><motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative w-full max-w-md"
  ><div className="glass-card p-8"><div className="mb-8 text-center"><Link to="/" className="mb-6 inline-flex items-center gap-2"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20"><Terminal className="h-6 w-6 text-primary" /></div></Link><h1 className="mb-2 text-2xl font-bold text-foreground">Admin Login</h1><p className="text-muted-foreground">Access the dashboard to manage your portfolio</p></div><form onSubmit={handleSubmit} className="space-y-6"><div><label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Email
              </label><div className="relative"><Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" /><Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="admin@example.com"
    className="pl-10"
    required
  /></div></div><div><label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label><div className="relative"><Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" /><Input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="••••••••"
    className="pl-10"
    required
  /></div></div>{error && <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
  ><AlertCircle size={16} />{error}</motion.div>}<Button type="submit" disabled={loading} className="btn-primary w-full">{loading ? <span className="flex items-center gap-2"><div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Signing in...
                </span> : "Sign In"}</Button></form><div className="mt-6 text-center"><Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link></div></div></motion.div></main>;
};
var stdin_default = AdminLogin;
export {
  stdin_default as default
};
