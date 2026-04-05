import { Link } from 'react-router-dom';
import styles from './NavigationButtons.module.css';

const NavigationButtons = () => {
  return (
    <nav className={styles.navButtons} aria-label="Links rápidos">
      <ul className={styles.buttonList}>
        <li>
          <Link to="/sobre-mim" className={styles.button}>
            <span className={styles.buttonText}>SOBRE MIM</span>
            <span className={styles.iconRight} aria-hidden="true">&rsaquo;</span>
          </Link>
        </li>
        <li>
          <Link to="/artigos" className={styles.button}>
            <span className={styles.buttonText}>ARTIGOS E TEXTOS</span>
            <span className={styles.iconRight} aria-hidden="true">&rsaquo;</span>
          </Link>
        </li>
        <li>
          <Link to="/evolucao-academica" className={styles.button}>
            <span className={styles.buttonText}>EVOLUÇÃO ACADÊMICA</span>
            <span className={styles.iconRight} aria-hidden="true">&rsaquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationButtons;
