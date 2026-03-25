import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { academicTimelineData } from '../../data/academicData';
import styles from './AcademicEvolution.module.css';

const AcademicEvolution = () => {
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
        {academicTimelineData.map((item) => (
          <div key={item.id} className={styles.timelineItem}>
            <Link to={`/evolucao-academica/${item.slug}`} className={styles.cardLink}>
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
