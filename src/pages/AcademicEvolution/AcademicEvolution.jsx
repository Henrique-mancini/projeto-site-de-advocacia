import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import { useSanityFetch } from '../../hooks/useSanityFetch';
import styles from './AcademicEvolution.module.css';

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

const EVENTS_QUERY = '*[_type == "academicEvent"] | order(year asc, month asc)';

const AcademicEvolution = () => {
  const { data: events, loading, error, retry } = useSanityFetch(EVENTS_QUERY);

  useEffect(() => {
    document.title = 'Evolução Acadêmica — Maria Eduarda Bressan';
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
          <Loading key="evolution-loader" text="Carregando timeline..." />
        ) : error ? (
          <ErrorMessage
            key="evolution-error"
            message="Não foi possível carregar a evolução acadêmica."
            retryText="Tentar novamente"
            onRetry={retry}
            backLink="/"
            backText="← Voltar para Início"
          />
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
                >
                  <Link to={`/evolucao-academica/${item.slug.current}`} className={styles.cardLink}>
                    <div className={styles.timelineContent}>
                      <span className={styles.year}>{formatEventDate(item.month, item.year)}</span>
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
