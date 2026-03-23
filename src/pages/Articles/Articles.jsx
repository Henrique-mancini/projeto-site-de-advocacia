import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { sanityClient } from '../../services/sanity';
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
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await sanityClient.fetch(
          '*[_type == "article"] | order(publishedAt desc)'
        );
        setArticles(data);
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      }
    };

    fetchArticles();
  }, []);

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
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            id={article.slug?.current}
            title={article.title}
            summary={article.summary}
            date={new Date(article.publishedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          />
        ))}
      </section>
    </motion.main>
  );
};

export default Articles;

