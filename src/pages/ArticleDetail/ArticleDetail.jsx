import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { sanityClient } from '../../services/sanity';
import styles from './ArticleDetail.module.css';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const innerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticle = async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await sanityClient.fetch(
        `*[_type == "article" && slug.current == $slug][0]{
          ...,
          "pdfUrl": pdfFile.asset->url,
          "featuredImageUrl": featuredImage.asset->url,
          "featuredImageAlt": featuredImage.altText
        }`,
        { slug }
      );
      setArticle(data);
    } catch (error) {
      console.error('Erro ao buscar artigo:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const resolveInnerKey = () => {
    if (loading) return 'article-loader';
    if (!article) return 'article-not-found';
    return 'article-content';
  };

  return (
    <motion.div
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="article-loader"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className={styles.loading}>Carregando...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="article-error"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ErrorMessage
              message="Não foi possível carregar o artigo."
              retryText="Tentar novamente"
              onRetry={fetchArticle}
              backLink="/artigos"
              backText="← Voltar para Artigos"
            />
          </motion.div>
        ) : !article ? (
          <motion.div
            key="article-not-found"
            variants={innerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className={styles.loading}>Artigo não encontrado.</p>
            <Link to="/artigos" className={styles.backLink}>
              ← Voltar para Artigos
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="article-content"
            variants={innerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link to="/artigos" className={styles.backLink}>
              ← Voltar para Artigos
            </Link>

            <div className={styles.contentWrapper}>
              <div className={styles.textContent}>
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
              </div>

              {article.featuredImageUrl && (
                <div className={styles.imageWrapper}>
                  <img
                    src={article.featuredImageUrl}
                    alt={article.featuredImageAlt || 'Imagem do artigo'}
                    className={styles.featuredImage}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArticleDetail;
