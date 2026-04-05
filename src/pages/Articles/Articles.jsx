import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import { useSanityFetch } from '../../hooks/useSanityFetch';
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

const ARTICLES_QUERY = '*[_type == "article"] | order(publishedAt desc)';

const Articles = () => {
  const { data: articles, loading, error, retry } = useSanityFetch(ARTICLES_QUERY);

  useEffect(() => {
    document.title = 'Artigos e Publicações — Maria Eduarda Bressan';
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
          <Loading key="articles-loader" text="Carregando artigos..." />
        ) : error ? (
          <ErrorMessage
            key="articles-error"
            message="Não foi possível carregar os artigos."
            retryText="Tentar novamente"
            onRetry={retry}
            backLink="/"
            backText="← Voltar para Início"
          />
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
