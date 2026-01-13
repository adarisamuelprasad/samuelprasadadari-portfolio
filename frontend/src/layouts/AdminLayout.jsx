import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    Award,
    Briefcase,
    GraduationCap,
    FileText,
    LogOut,
    Menu,
    X,
    Settings,
    Home,
    User,
    Code,
    Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const navItems = [
        { path: "/admin/home", label: "Home", icon: Home },
        { path: "/admin/about", label: "About", icon: User },
        { path: "/admin/skills", label: "Skills", icon: Code },
        { path: "/admin/projects", label: "Projects", icon: FolderKanban },
        { path: "/admin/achievements", label: "Achievements", icon: Award },
        { path: "/admin/experience", label: "Experience", icon: Briefcase },
        { path: "/admin/education", label: "Education", icon: GraduationCap },
        { path: "/admin/contact", label: "Contact", icon: Mail },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-card/50 backdrop-blur-md border-r border-border transition-all duration-300 flex flex-col fixed h-full z-20 hidden md:flex`}
            >
                <div className="p-4 flex items-center justify-between border-b border-border/50">
                    {isSidebarOpen ? (
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            Admin Panel
                        </span>
                    ) : (
                        <span className="text-xl font-bold text-primary mx-auto">AP</span>
                    )}
                    <button onClick={toggleSidebar} className="p-1 hover:bg-muted rounded-md text-muted-foreground">
                        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    } ${!isSidebarOpen && "justify-center"}`}
                            >
                                <Icon size={20} />
                                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border/50">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 ${!isSidebarOpen && "justify-center px-2"}`}
                        onClick={handleLogout}
                    >
                        <LogOut size={20} className={isSidebarOpen ? "mr-2" : ""} />
                        {isSidebarOpen && "Logout"}
                    </Button>
                </div>
            </aside>

            {/* Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-card/50 border-b border-border sticky top-0 z-30 backdrop-blur-md">
                    <span className="text-lg font-bold">Admin Panel</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Menu />
                    </Button>
                </header>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            className="fixed inset-0 z-40 md:hidden"
                        >
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                            <div className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col">
                                <div className="p-4 flex items-center justify-between border-b border-border">
                                    <span className="text-xl font-bold">Admin Panel</span>
                                    <button onClick={() => setIsSidebarOpen(false)}><X /></button>
                                </div>
                                <nav className="flex-1 p-4 space-y-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={`flex items-center gap-3 p-3 rounded-lg ${location.pathname.startsWith(item.path)
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted"
                                                }`}
                                        >
                                            <item.icon size={20} />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    ))}
                                </nav>
                                <div className="p-4 border-t border-border">
                                    <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                                        <LogOut size={20} className="mr-2" /> Logout
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
