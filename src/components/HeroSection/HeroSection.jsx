import { useState, useEffect } from 'react';
import styles from './HeroSection.module.css';
import Monogram from '../Monogram/Monogram';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import { sanityClient } from '../../services/sanity';

const FALLBACK_TEXT =
  'Bem-vindo(a)! Sou estudante de Direito apaixonada por textos jurídicos e reflexões sobre justiça. Compartilho minha jornada acadêmica e insights sobre o mundo do Direito.';

const HeroSection = () => {
  const [introText, setIntroText] = useState(FALLBACK_TEXT);

  useEffect(() => {
    sanityClient
      .fetch('*[_type == "home"][0]')
      .then((data) => {
        if (data?.introText) {
          setIntroText(data.introText);
        }
      })
      .catch((err) => console.error('Erro ao buscar texto de introdução:', err));
  }, []);

  return (
    <section className={styles.heroSection} aria-label="Apresentação de Maria Eduarda Bressan">
      <div className={styles.contentArea}>
        <div className={styles.introWrapper}>
          <div className={styles.titleGroup}>
            <Monogram />
            <h1 className={styles.title}>Maria Eduarda Bressan</h1>
          </div>
          <p className={styles.description} style={{ whiteSpace: 'pre-line' }}>
            {introText}
          </p>
          <NavigationButtons />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

