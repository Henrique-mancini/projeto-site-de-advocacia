import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ id, title, summary, date }) => {
  return (
    <article className={styles.card}>
      <Link to={`/artigos/${id}`} className={styles.link}>
        <header>
          <h2 className={styles.title}>{title}</h2>
          <time dateTime={date} className={styles.date}>{date}</time>
        </header>
        <p className={styles.summary}>{summary}</p>
      </Link>
    </article>
  );
};

export default ArticleCard;
