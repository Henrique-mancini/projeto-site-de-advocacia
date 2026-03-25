import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { academicTimelineData } from '../../data/academicData';
import styles from './AcademicEventDetail.module.css';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const AcademicEventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Simulando busca pelo slug no array mockado
    const foundEvent = academicTimelineData.find((item) => item.slug === slug);
    setEvent(foundEvent);
  }, [slug]);

  if (!event) {
    return (
      <motion.div
        className={styles.container}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p className={styles.loading}>Evento não encontrado.</p>
        <Link to="/evolucao-academica" className={styles.backLink}>
          ← Voltar para Evolução Acadêmica
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
      <Link to="/evolucao-academica" className={styles.backLink}>
        ← Voltar para Evolução Acadêmica
      </Link>

      <header className={styles.header}>
        <span className={styles.yearBadge}>{event.year}</span>
        <h1 className={styles.title}>{event.title}</h1>
      </header>

      <article className={styles.body}>
        <p>{event.fullDescription}</p>
      </article>
    </motion.div>
  );
};

export default AcademicEventDetail;
