import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactApi } from "@/api/api";
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(1e3)
});
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentApi.getBySection("contact");
        const contentMap = {};
        response.data.forEach(item => {
          contentMap[item.field] = { ...item };
        });
        setContent(contentMap);
      } catch (error) {
        console.error("Failed to load contact content:", error);
      }
    };
    fetchContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setErrorMessage("");
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }
    try {
      await contactApi.send({ name: form.name, email: form.email, message: form.message });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      if (error.response?.status === 429) {
        setErrorMessage("Please wait before sending another message.");
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
    }
  };
  return <><Navbar /><main className="min-h-screen pt-24"><div className="container mx-auto px-6 py-12"><SectionTitle
    title="Contact"
    subtitle={content.subtitle?.value || "Have a project in mind? Let's work together"}
  /><div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">{
    /* Contact Info */
  }<motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  ><div className="glass-card p-8"><h3 className="mb-6 text-2xl font-semibold text-foreground">{content.formTitle?.value || "Get in Touch"}</h3><p className="mb-8 text-muted-foreground">
    {content.formDescription?.value || "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
  </p><div className="space-y-4">{[
    { Icon: Mail, label: "Email", value: content.email?.value || "samuelprasadadari1@gmail.com" },
    { Icon: MapPin, label: "Location", value: content.location?.value || "India" }
  ].map(({ Icon, label, value }) => <div key={label} className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div><div><p className="text-sm text-muted-foreground">{label}</p><p className="font-medium text-foreground">{value}</p></div></div>)}</div></div></motion.div>{
        /* Contact Form */
      }<motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      ><form onSubmit={handleSubmit} className="glass-card space-y-6 p-8"><div><label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
        Name
      </label><Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className={errors.name ? "border-destructive" : ""}
        />{errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}</div><div><label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
          Email
        </label><Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "border-destructive" : ""}
            />{errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}</div><div><label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
              Message
            </label><Textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={5}
              className={errors.message ? "border-destructive" : ""}
            />{errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}</div>{status === "success" && <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg bg-green-500/10 p-4 text-green-500"
            ><CheckCircle size={20} /><span>{content.successMessage?.value || "Message sent successfully!"}</span></motion.div>}{status === "error" && <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-destructive"
            ><AlertCircle size={20} /><span>{errorMessage}</span></motion.div>}<Button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full"
            >{status === "loading" ? <span className="flex items-center gap-2"><div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Sending...
            </span> : <span className="flex items-center gap-2"><Send size={18} />
              {content.buttonText?.value || "Send Message"}
            </span>}</Button></form></motion.div></div></div></main><Footer /></>;
};
var stdin_default = Contact;
export {
  stdin_default as default
};
