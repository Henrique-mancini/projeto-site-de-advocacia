import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../../services/sanity';
import styles from './ArticleDetail.module.css';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await sanityClient.fetch(
          '*[_type == "article" && slug.current == $slug][0]{..., "pdfUrl": pdfFile.asset->url}',
          { slug }
        );
        setArticle(data);
      } catch (error) {
        console.error('Erro ao buscar artigo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <motion.div
        className={styles.container}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p className={styles.loading}>Carregando...</p>
      </motion.div>
    );
  }

  if (!article) {
    return (
      <motion.div
        className={styles.container}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p className={styles.loading}>Artigo não encontrado.</p>
        <Link to="/artigos" className={styles.backLink}>
          ← Voltar para Artigos
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link to="/artigos" className={styles.backLink}>
        ← Voltar para Artigos
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        {article.publishedAt && (
          <time dateTime={article.publishedAt} className={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        )}
      </header>

      <article className={styles.body}>
        {article.body && <PortableText value={article.body} />}
      </article>

      {article.pdfUrl && (
        <a
          href={article.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pdfButton}
        >
          Visualizar Artigo Oficial (PDF)
        </a>
      )}
    </motion.div>
  );
};

export default ArticleDetail;
