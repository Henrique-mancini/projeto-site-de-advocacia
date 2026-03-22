import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import SobreMim from './pages/SobreMim/SobreMim';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<Articles />} />
        <Route path="/sobre-mim" element={<SobreMim />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
