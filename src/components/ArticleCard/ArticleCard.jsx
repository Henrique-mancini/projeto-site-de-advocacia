import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ id, title, summary, date }) => {
  return (
    <article>
      <Link to={`/artigos/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <header>
          <h2>{title}</h2>
          <time dateTime={date}>{date}</time>
        </header>
        <p>{summary}</p>
      </Link>
    </article>
  );
};

export default ArticleCard;
