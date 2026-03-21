import React from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import styles from './Articles.module.css';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const Articles = () => {
  // Array interno com três objetos de mockups jurídicos
  const articlesMock = [
    {
      id: 1,
      title: 'A Nova Lei de Proteção de Dados',
      summary: 'Entenda os principais impactos da LGPD nas pequenas e médias empresas do Brasil e como adequar o seu negócio.',
      date: '10 de Outubro de 2026',
    },
    {
      id: 2,
      title: 'Direitos Trabalhistas em Tempos de Home Office',
      summary: 'Uma análise detalhada sobre as responsabilidades do empregador e os direitos essenciais do teletrabalhador moderno.',
      date: '15 de Setembro de 2026',
    },
    {
      id: 3,
      title: 'Contratos Civis: Evitando Armadilhas Comuns',
      summary: 'Saiba quais cláusulas são fundamentais para garantir a segurança jurídica em negociações e parcerias empresariais.',
      date: '02 de Agosto de 2026',
    },
  ];

  return (
    <motion.main 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Artigos e Publicações</h1>
        <p className={styles.subtitle}>Acompanhe nossos textos sobre as principais atualizações e análises jurídicas.</p>
      </header>
      
      <section className={styles.grid}>
        {/* Renderização da lista de artigos varrendo o array */}
        {articlesMock.map((article) => (
          <ArticleCard
            key={article.id} // Propriedade React obrigatória em mapeamentos
            id={article.id}
            title={article.title}
            summary={article.summary}
            date={article.date}
          />
        ))}
      </section>
    </motion.main>
  );
};

export default Articles;
