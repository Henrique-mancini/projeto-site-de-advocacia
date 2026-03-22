import React from 'react';
import { motion } from 'framer-motion';
import styles from './AcademicEvolution.module.css';

const timelineData = [
  {
    id: 1,
    year: '2023',
    title: 'Aprovação no Vestibular',
    description: 'Início da jornada acadêmica na Faculdade de Direito, com grande foco nas disciplinas de Introdução ao Estudo do Direito.'
  },
  {
    id: 2,
    year: '2024',
    title: 'Monitoria em Direito Civil',
    description: 'Atuação como monitora auxiliando alunos dos primeiros períodos e elaborando materiais complementares de estudo.'
  },
  {
    id: 3,
    year: '2025',
    title: 'Publicação Científica',
    description: 'Co-autoria em um artigo científico sobre as transformações dos contratos civis, publicado em periódico local de grande renome.'
  },
  {
    id: 4,
    year: '2026',
    title: 'Estágio no Tribunal',
    description: 'Ingresso no programa de estágio do Tribunal Estadual, acompanhando de perto o andamento processual e a redação de minutas judiciais.'
  }
];

const AcademicEvolution = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={styles.pageTitle}>Evolução Acadêmica</h1>
      
      <div className={styles.timeline}>
        {timelineData.map((item) => (
          <div key={item.id} className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <span className={styles.year}>{item.year}</span>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AcademicEvolution;
