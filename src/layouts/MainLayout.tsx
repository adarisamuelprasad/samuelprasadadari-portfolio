import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const MainLayout = ({ children, showFooter = true }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default MainLayout;
