import { motion } from 'framer-motion';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <motion.div 
      className={styles.homeLayout}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Header />
      <main className={styles.mainContent}>
        <HeroSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;
