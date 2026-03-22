import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import AboutMe from './pages/AboutMe/AboutMe';
import AcademicEvolution from './pages/AcademicEvolution/AcademicEvolution';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<Articles />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/academic-evolution" element={<AcademicEvolution />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
