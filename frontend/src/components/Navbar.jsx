import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/achievements", label: "Achievements" },
  { path: "/contact", label: "Contact" }
];
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  return <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "glass-card border-b border-border/50" : "bg-transparent"}`}
  ><div className="container mx-auto flex items-center justify-between px-6 py-4"><Link to="/" className="flex items-center gap-2"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"><Terminal className="h-5 w-5 text-primary" /></div><span className="text-xl font-bold"><span className="gradient-text">Adari</span> Samuel Prasad
  </span></Link>{
        /* Desktop Navigation */
      }<div className="hidden items-center gap-1 md:flex">{navLinks.map((link) => <Link
        key={link.path}
        to={link.path}
        className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
      >{link.label}</Link>)}</div>{
        /* Mobile Menu Button */
      }<button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
      >{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>{
      /* Mobile Menu */
    }<AnimatePresence>{mobileMenuOpen && <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="glass-card border-t border-border/50 md:hidden"
    ><div className="container mx-auto flex flex-col gap-2 px-6 py-4">{navLinks.map((link) => <Link
      key={link.path}
      to={link.path}
      className={`rounded-lg px-4 py-3 transition-colors ${location.pathname === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >{link.label}</Link>)}</div></motion.div>}</AnimatePresence></motion.nav>;
};
var stdin_default = Navbar;
export {
  stdin_default as default
};
