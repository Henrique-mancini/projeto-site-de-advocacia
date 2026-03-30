import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../../services/sanity';
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

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

const AboutMe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const result = await sanityClient.fetch(
          '*[_type == "about"][0]{..., "imageUrl": profileImage.asset->url}'
        );
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados do Sobre Mim:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
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
          <motion.div
            key="about-loader"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className={styles.loading}>Carregando...</p>
          </motion.div>
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
