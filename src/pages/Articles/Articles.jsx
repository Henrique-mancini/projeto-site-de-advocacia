import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { sanityClient } from '../../services/sanity';
import styles from './Articles.module.css';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const contentVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.2
    }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticles = async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await sanityClient.fetch(
        '*[_type == "article"] | order(publishedAt desc)'
      );
      setArticles(data);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <motion.main 
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link to="/" className={styles.backLink}>
        ← Voltar para Início
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>Artigos e Publicações</h1>
        <p className={styles.subtitle}>Acompanhe nossos textos sobre as principais atualizações e análises jurídicas.</p>
      </header>
      
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="articles-loader"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.loaderWrapper}
          >
            <p className={styles.loading}>Carregando artigos...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="articles-error"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ErrorMessage
              message="Não foi possível carregar os artigos."
              retryText="Tentar novamente"
              onRetry={fetchArticles}
              backLink="/"
              backText="← Voltar para Início"
            />
          </motion.div>
        ) : (
          <motion.section
            key="articles-content"
            className={styles.grid}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
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
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default Articles;
