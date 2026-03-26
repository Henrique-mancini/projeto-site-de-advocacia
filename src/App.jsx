import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { sanityClient } from './services/sanity';
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import AboutMe from './pages/AboutMe/AboutMe';
import AcademicEvolution from './pages/AcademicEvolution/AcademicEvolution';
import AcademicEventDetail from './pages/AcademicEventDetail/AcademicEventDetail';
import Footer from './components/Footer/Footer';

function App() {
  const location = useLocation();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadDynamicFont = async () => {
      try {
        const settings = await sanityClient.fetch(
          '*[_type == "siteSettings"][0]{baseFont}'
        );
        const fontName = settings?.baseFont;
        if (!fontName) return;

        // Build Google Fonts URL
        const fontUrlName = fontName.replace(/\s+/g, '+');
        const href = `https://fonts.googleapis.com/css2?family=${fontUrlName}:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap`;

        // Inject <link> into <head>
        const linkEl = document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.href = href;
        linkEl.id = 'dynamic-font-link';
        document.head.appendChild(linkEl);

        // Update CSS custom property
        document.documentElement.style.setProperty(
          '--font-serif',
          `'${fontName}', 'Times New Roman', serif`
        );

        setFontLoaded(true);

        return () => {
          const existing = document.getElementById('dynamic-font-link');
          if (existing) existing.remove();
        };
      } catch (error) {
        console.error('Erro ao carregar fonte dinâmica:', error);
      }
    };

    loadDynamicFont();
  }, []);

  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/artigos" element={<Articles />} />
            <Route path="/artigos/:slug" element={<ArticleDetail />} />
            <Route path="/sobre-mim" element={<AboutMe />} />
            <Route path="/evolucao-academica" element={<AcademicEvolution />} />
            <Route path="/evolucao-academica/:slug" element={<AcademicEventDetail />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}

export default App;

