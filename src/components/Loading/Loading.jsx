import { motion } from 'framer-motion';
import styles from './Loading.module.css';

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const Loading = ({ text = 'Carregando...' }) => (
  <motion.div
    variants={loaderVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={styles.loading}
  >
    <div className={styles.spinner} />
    <p>{text}</p>
  </motion.div>
);

export default Loading;
