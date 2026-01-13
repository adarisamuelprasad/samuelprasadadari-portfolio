import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="border-t border-border/50 bg-card/50"><div className="container mx-auto px-6 py-12"><div className="grid gap-8 md:grid-cols-4">{
    /* Brand */
  }<div className="md:col-span-2"><Link to="/" className="mb-4 flex items-center gap-2"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"><Terminal className="h-5 w-5 text-primary" /></div><span className="text-xl font-bold"><span className="gradient-text">Adari</span> Samuel Prasad
  </span></Link><p className="max-w-md text-muted-foreground">
        Backend & AI Developer crafting scalable solutions and intelligent systems.
        Let's build something amazing together.
      </p></div>{
      /* Quick Links */
    }<div><h4 className="mb-4 font-semibold text-foreground">Quick Links</h4><ul className="space-y-2">{["About", "Projects", "Achievements", "Contact"].map((link) => <li key={link}><Link
      to={`/${link.toLowerCase()}`}
      className="text-muted-foreground transition-colors hover:text-primary"
    >{link}</Link></li>)}</ul></div>{
      /* Social */
    }<div><h4 className="mb-4 font-semibold text-foreground">Connect</h4><div className="flex gap-3"><a
      href="https://github.com/adarisamuelprasad/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:text-primary"
    ><Github size={18} /></a><a
      href="https://www.linkedin.com/in/adarisamuelprasad/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:text-primary"
    ><Linkedin size={18} /></a><a
      href="mailto:samuelprasadadari1@gmail.com"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:text-primary"
    ><Mail size={18} /></a></div></div></div><div className="mt-12 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground"><p>© {(/* @__PURE__ */ new Date()).getFullYear()} Adari Samuel Prasad. Built with React & Spring Boot.</p></div></div></footer>;
};
var stdin_default = Footer;
export {
  stdin_default as default
};
