import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sanityClient } from '../../services/sanity';
import { PortableText } from '@portabletext/react';
import styles from './AcademicEventDetail.module.css';

const MONTH_NAMES = [
  '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const formatEventDate = (month, year) => {
  if (month && MONTH_NAMES[month]) {
    return `${MONTH_NAMES[month]} de ${year}`;
  }
  return year;
};

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

const AcademicEventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const query = `*[_type == "academicEvent" && slug.current == $slug][0]{
          ...,
          "pdfUrl": pdfFile.asset->url,
          "eventImageUrl": eventImage.asset->url,
          "eventImageAlt": eventImage.altText
        }`;
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
            key="event-loader"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className={styles.loading}>Carregando...</p>
          </motion.div>
        ) : !event ? (
          <motion.div
            key="event-not-found"
            variants={innerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className={styles.loading}>Evento não encontrado.</p>
            <Link to="/evolucao-academica" className={styles.backLink}>
              ← Voltar para Evolução Acadêmica
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="event-content"
            variants={innerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link to="/evolucao-academica" className={styles.backLink}>
              ← Voltar para Evolução Acadêmica
            </Link>

            <div className={styles.contentWrapper}>
              <div className={styles.textContent}>
                <header className={styles.header}>
                  <span className={styles.yearBadge}>{formatEventDate(event.month, event.year)}</span>
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
              </div>

              {event.eventImageUrl && (
                <div className={styles.imageWrapper}>
                  <img
                    src={event.eventImageUrl}
                    alt={event.eventImageAlt || 'Imagem do evento'}
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

export default AcademicEventDetail;
