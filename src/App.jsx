import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import AboutMe from './pages/AboutMe/AboutMe';
import AcademicEvolution from './pages/AcademicEvolution/AcademicEvolution';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<Articles />} />
        <Route path="/artigos/:slug" element={<ArticleDetail />} />
        <Route path="/sobre-mim" element={<AboutMe />} />
        <Route path="/evolucao-academica" element={<AcademicEvolution />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
