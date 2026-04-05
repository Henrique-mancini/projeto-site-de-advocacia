import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
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

const EVENT_QUERY = `*[_type == "academicEvent" && slug.current == $slug][0]{
  ...,
  "pdfUrl": pdfFile.asset->url,
  "eventImageUrl": eventImage.asset->url,
  "eventImageAlt": eventImage.altText
}`;

const AcademicEventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEvent = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await sanityClient.fetch(EVENT_QUERY, { slug });
      setEvent(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    document.title = loading || error || !event
      ? 'Evento acadêmico — Maria Eduarda Bressan'
      : `${event.title} — Maria Eduarda Bressan`;
  }, [event, loading, error]);

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
          <Loading key="event-loader" />
        ) : error ? (
          <ErrorMessage
            key="event-error"
            message="Não foi possível carregar o evento acadêmico."
            retryText="Tentar novamente"
            onRetry={fetchEvent}
            backLink="/evolucao-academica"
            backText="← Voltar para Evolução Acadêmica"
          />
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
