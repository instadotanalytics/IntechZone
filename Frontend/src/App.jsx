import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// Pages
import Home from './Pages/Home/Home'
import MainContect from './Pages/Contact/MainContect'


// Components
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import FastDeliveryHero from './Components/FastDelivery/FastDeliveryHero'
import Support24Into7 from './Components/Support/Support24Into&'
import ExpertTeam from './Components/ExpertTeam/ExpertTeam'
import AffordablePricing from './Components/affordable-pricing/AffordablePricing'
import SecureSolutions from './Components/Securesolutions/Securesolutions'
import ScalableGrowth from './Components/scalable-growth/ScalableGrowth'
import About from './Pages/About/About'
import ServicesPage from './Pages/CompanyServices/ServicesPage'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminDashboard from './Pages/Admin/AdminDashboard'

// Development Services
import Webdevelopment from './Components/AllServicesPage/Development/Webdevelopment'
import AppDevelopment from './Components/AllServicesPage/Development/AppDevelopment'
import SoftwareDevelopment from './Components/AllServicesPage/Development/SoftwareDevelopment'
import UiUxDesign from './Components/AllServicesPage/Development/UiUxDesign'
import DigitalMarketing from './Components/AllServicesPage/Development/DigitalMarketing'
import GraphicDesign from './Components/AllServicesPage/Development/GraphicDesign'

// Infrastructure Services
import CloudSolutions from './Components/AllServicesPage/Infrastructure/CloudSolutions'
import NetworkSetup from './Components/AllServicesPage/Infrastructure/NetworkSetup'
import HardwareSupport from './Components/AllServicesPage/Infrastructure/HardwareSupport'
import DataBackup from './Components/AllServicesPage/Infrastructure/DataBackup'
import AMCServices from './Components/AllServicesPage/Infrastructure/AMCServices'
import ITOutsourcing from './Components/AllServicesPage/Infrastructure/ITOutsourcing'

// Consulting & Analytics Services
import ItConsulting from './Components/AllServicesPage/Consulting & Analytics/ItConsulting'
import CyberSecurity from './Components/AllServicesPage/Consulting & Analytics/CyberSecurity'
import DataAnalytics from './Components/AllServicesPage/Consulting & Analytics/DataAnalytics'
import ErpSolutions from './Components/AllServicesPage/Consulting & Analytics/ErpSolutions'
import ItAudit from './Components/AllServicesPage/Consulting & Analytics/ItAudit'
import ItTraining from './Components/AllServicesPage/Consulting & Analytics/ItTraining'

// Career Pages
import FullTimeJob from './Components/Career/JoinOurTeam/FullTimeJob'
import Internship from './Components/Career/JoinOurTeam/Internship'
import Career from './Components/Career/Career'
import PartTime from './Components/Career/JoinOurTeam/PartTime'
import SearchResults from './Components/Header/SearchResults'
import PortfolioHomepage from './Components/Portfolio/PortfolioHomepage'


// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

// Protected Route component for admin
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    window.location.href = '/admin-login';
    return null;
  }
  
  return children;
};

// Layout component to conditionally show Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Routes where Header and Footer should NOT be shown
  const hideHeaderFooterRoutes = ['/admin-login', '/admin/dashboard'];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
  
  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><MainContect /></Layout>} />
        <Route path="/portfolio" element={<Layout><PortfolioHomepage/></Layout>} />
        <Route path="/fast-delivery" element={<Layout><FastDeliveryHero /></Layout>} />
        <Route path="/247-support" element={<Layout><Support24Into7 /></Layout>} />
        <Route path="/expert-team" element={<Layout><ExpertTeam /></Layout>} />
        <Route path="/affordable-pricing" element={<Layout><AffordablePricing /></Layout>} />
        <Route path="/secure-solutions" element={<Layout><SecureSolutions /></Layout>} />
        <Route path="/scalable-growth" element={<Layout><ScalableGrowth /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
       
        {/* Development Services Routes */}
        <Route path="/services/web-development" element={<Layout><Webdevelopment /></Layout>} />
        <Route path="/services/app-development" element={<Layout><AppDevelopment /></Layout>} />
        <Route path="/services/software-development" element={<Layout><SoftwareDevelopment /></Layout>} />
        <Route path="/services/ui-ux-design" element={<Layout><UiUxDesign /></Layout>} />
        <Route path="/services/digital-marketing" element={<Layout><DigitalMarketing /></Layout>} />
        <Route path="/services/graphic-design" element={<Layout><GraphicDesign /></Layout>} />
        
        {/* Infrastructure Services Routes */}
        <Route path="/services/cloud-solutions" element={<Layout><CloudSolutions /></Layout>} />
        <Route path="/services/network-setup" element={<Layout><NetworkSetup /></Layout>} />
        <Route path="/services/hardware-support" element={<Layout><HardwareSupport /></Layout>} />
        <Route path="/services/data-backup" element={<Layout><DataBackup /></Layout>} />
        <Route path="/services/amc" element={<Layout><AMCServices /></Layout>} />
        <Route path="/services/it-outsourcing" element={<Layout><ITOutsourcing /></Layout>} />
        
        {/* Consulting & Analytics Routes */}
        <Route path="/services/it-consulting" element={<Layout><ItConsulting /></Layout>} />
        <Route path="/services/cybersecurity" element={<Layout><CyberSecurity /></Layout>} />
        <Route path="/services/data-analytics" element={<Layout><DataAnalytics /></Layout>} />
        <Route path="/services/erp-solutions" element={<Layout><ErpSolutions /></Layout>} />
        <Route path="/services/it-audit" element={<Layout><ItAudit /></Layout>} />
        <Route path="/services/it-training" element={<Layout><ItTraining /></Layout>} />
        
        {/* Career Routes - Join Our Team */}
        <Route path="/careers" element={<Layout><Career/></Layout>} />
        <Route path="/careers/full-time" element={<Layout><FullTimeJob /></Layout>} />
        <Route path="/careers/internships" element={<Layout><Internship/></Layout>} />
        <Route path="/careers/part-time" element={<Layout><PartTime/></Layout>} />


        <Route path="/search" element={<Layout><SearchResults/></Layout>} />

       
      
        
        {/* Admin Routes (No Header/Footer) */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// 404 Component
const NotFound = () => {
  return (
    <div style={{ 
      minHeight: '60vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#1e64d2' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ 
        marginTop: '1rem', 
        padding: '0.75rem 1.5rem', 
        background: '#1e64d2', 
        color: 'white', 
        textDecoration: 'none', 
        borderRadius: '8px' 
      }}>
        Go Back Home
      </a>
    </div>
  );
}

export default App;