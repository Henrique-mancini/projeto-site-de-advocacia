import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artigos" element={<Articles />} />
    </Routes>
  );
}

export default App;
