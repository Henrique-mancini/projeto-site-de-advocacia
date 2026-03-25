import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sanityClient } from '../../services/sanity';
import styles from './AcademicEvolution.module.css';

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

  if (loading) {
    return (
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <p className={styles.loading} style={{ textAlign: 'center', marginTop: '4rem' }}>Carregando timeline...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className={styles.backLink}>
        ← Voltar para Início
      </Link>

      <h1 className={styles.pageTitle}>Evolução Acadêmica</h1>
      
      <div className={styles.timeline}>
        {events.map((item) => (
          <div key={item._id} className={styles.timelineItem}>
            <Link to={`/evolucao-academica/${item.slug.current}`} className={styles.cardLink}>
              <div className={styles.timelineContent}>
                <span className={styles.year}>{item.year}</span>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.description}>{item.shortDescription}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AcademicEvolution;
