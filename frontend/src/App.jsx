import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import AdminApp from './admin/AdminApp';

const Portfolio = () => (
  <div className="min-h-screen bg-dark text-white">
    <ScrollProgress />
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Achievements />
    <Contact />
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Portfolio />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
