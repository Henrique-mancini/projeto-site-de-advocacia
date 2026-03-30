import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sanityClient } from '../../services/sanity';
import styles from './AcademicEvolution.module.css';

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
      staggerChildren: 0.1 
    } 
  },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const AcademicEvolution = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = '*[_type == "academicEvent"] | order(year asc)';
        const data = await sanityClient.fetch(query);
        setEvents(data);
      } catch (error) {
        console.error('Erro ao buscar eventos acadêmicos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
            key="evolution-loader"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className={styles.loading} style={{ textAlign: 'center', marginTop: '4rem' }}>
              Carregando timeline...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="evolution-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link to="/" className={styles.backLink}>
              ← Voltar para Início
            </Link>

            <h1 className={styles.pageTitle}>Evolução Acadêmica</h1>
            
            <div className={styles.timeline}>
              {events.map((item) => (
                <motion.div 
                  key={item._id} 
                  className={styles.timelineItem}
                  variants={itemVariants}
                >
                  <Link to={`/evolucao-academica/${item.slug.current}`} className={styles.cardLink}>
                    <div className={styles.timelineContent}>
                      <span className={styles.year}>{item.year}</span>
                      <h2 className={styles.itemTitle}>{item.title}</h2>
                      <p className={styles.description}>{item.shortDescription}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AcademicEvolution;
