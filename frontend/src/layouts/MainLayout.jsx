import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const MainLayout = ({ children, showFooter = true }) => {
  return <><Navbar />{children}{showFooter && <Footer />}</>;
};
var stdin_default = MainLayout;
export {
  stdin_default as default
};
