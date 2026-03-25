import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sanityClient } from '../../services/sanity';
import { PortableText } from '@portabletext/react';
import styles from './AcademicEventDetail.module.css';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const AcademicEventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const query = '*[_type == "academicEvent" && slug.current == $slug][0]{..., "pdfUrl": pdfFile.asset->url}';
        const data = await sanityClient.fetch(query, { slug });
        setEvent(data);
      } catch (error) {
        console.error('Erro ao buscar evento acadêmico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
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
        {event.fullDescription && <PortableText value={event.fullDescription} />}
      </article>

      {event.pdfUrl && (
        <a
          href={event.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pdfButton}
        >
          Visualizar Documento (PDF)
        </a>
      )}
    </motion.div>
  );
};

export default AcademicEventDetail;
