import { motion } from "framer-motion";
const SectionTitle = ({ title, subtitle, centered = true }) => {
  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${centered ? "text-center" : ""}`}
  ><h2 className="section-title mb-4"><span className="gradient-text">{title}</span></h2>{subtitle && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}</motion.div>;
};
var stdin_default = SectionTitle;
export {
  stdin_default as default
};
