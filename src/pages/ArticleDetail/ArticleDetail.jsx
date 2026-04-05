import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
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

const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0]{
  ...,
  "pdfUrl": pdfFile.asset->url,
  "featuredImageUrl": featuredImage.asset->url,
  "featuredImageAlt": featuredImage.altText
}`;

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticle = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await sanityClient.fetch(ARTICLE_QUERY, { slug });
      setArticle(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  useEffect(() => {
    document.title = loading || error || !article
      ? 'Artigo — Maria Eduarda Bressan'
      : `${article.title} — Maria Eduarda Bressan`;
  }, [article, loading, error]);

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
          <Loading key="article-loader" />
        ) : error ? (
          <ErrorMessage
            key="article-error"
            message="Não foi possível carregar o artigo."
            retryText="Tentar novamente"
            onRetry={fetchArticle}
            backLink="/artigos"
            backText="← Voltar para Artigos"
          />
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
