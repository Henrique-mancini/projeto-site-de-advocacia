import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className={styles.homeLayout}>
      <Header />
      <main className={styles.mainContent}>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
