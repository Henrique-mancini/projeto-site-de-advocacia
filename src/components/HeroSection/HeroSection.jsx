import styles from './HeroSection.module.css';
import Monogram from '../Monogram/Monogram';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

const HeroSection = () => {
  return (
    <section className={styles.heroSection} aria-label="Apresentação de Maria Eduarda Bressan">
      <div className={styles.contentArea}>
        <div className={styles.introWrapper}>
          <div className={styles.titleGroup}>
            <Monogram />
            <h1 className={styles.title}>Maria Eduarda Bressan</h1>
          </div>
          <p className={styles.description}>
            Bem-vindo(a)! Sou estudante de Direito apaixonada por textos jurídicos e reflexões sobre justiça. Compartilho minha jornada acadêmica e insights sobre o mundo do Direito.
          </p>
          <NavigationButtons />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
