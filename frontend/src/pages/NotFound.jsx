import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return <div className="flex min-h-screen items-center justify-center bg-background"><div className="pointer-events-none absolute inset-0"><div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" /><div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" /></div><motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative text-center"
  ><motion.h1
    initial={{ scale: 0.5 }}
    animate={{ scale: 1 }}
    className="mb-4 text-9xl font-bold"
  ><span className="gradient-text">404</span></motion.h1><p className="mb-8 text-xl text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p><div className="flex justify-center gap-4"><Link
    to="/"
    className="btn-primary flex items-center gap-2"
  ><Home size={18} />
            Go Home
          </Link><button
    onClick={() => window.history.back()}
    className="btn-outline flex items-center gap-2"
  ><ArrowLeft size={18} />
            Go Back
          </button></div></motion.div></div>;
};
var stdin_default = NotFound;
export {
  stdin_default as default
};
