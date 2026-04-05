import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import { useSanityFetch } from '../../hooks/useSanityFetch';
import styles from './AboutMe.module.css';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const innerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

const ABOUT_QUERY = '*[_type == "about"][0]{..., "imageUrl": profileImage.asset->url}';

const AboutMe = () => {
  const { data, loading, error, retry } = useSanityFetch(ABOUT_QUERY);

  useEffect(() => {
    document.title = 'Sobre Mim — Maria Eduarda Bressan';
  }, []);

  return (
    <motion.main
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <Loading key="about-loader" />
        ) : error ? (
          <ErrorMessage
            key="about-error"
            message="Não foi possível carregar as informações."
            retryText="Tentar novamente"
            onRetry={retry}
            backLink="/"
            backText="← Voltar para Início"
          />
        ) : (
          <motion.div
            key="about-content"
            variants={innerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link to="/" className={styles.backLink}>
              ← Voltar para Início
            </Link>

            <div className={styles.contentWrapper}>
              <section className={styles.textContent}>
                <h1 className={styles.title}>{data?.title || 'Minha Trajetória'}</h1>
                {data?.bio ? (
                  <div className={styles.bio}>
                    <PortableText value={data.bio} />
                  </div>
                ) : (
                  <p className={styles.text}>Conteúdo em breve.</p>
                )}
              </section>

              <section className={styles.imageContent}>
                <div className={styles.imagePlaceholder}>
                  {data?.imageUrl && (
                    <img
                      src={data.imageUrl}
                      alt="Fotografia do Advogado"
                      className={styles.image}
                    />
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default AboutMe;
