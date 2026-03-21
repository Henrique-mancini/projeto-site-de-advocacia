import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ArticleCard.module.css';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ArticleCard = ({ id, title, summary, date }) => {
  return (
    <motion.article variants={itemVariants} className={styles.card}>
      <Link to={`/artigos/${id}`} className={styles.link}>
        <header>
          <h2 className={styles.title}>{title}</h2>
          <time dateTime={date} className={styles.date}>{date}</time>
        </header>
        <p className={styles.summary}>{summary}</p>
      </Link>
    </motion.article>
  );
};

export default ArticleCard;
