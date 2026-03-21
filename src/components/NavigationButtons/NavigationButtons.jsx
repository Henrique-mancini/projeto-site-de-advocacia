import { useNavigate } from 'react-router-dom';
import styles from './NavigationButtons.module.css';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navButtons} aria-label="Links rápidos">
      <ul className={styles.buttonList}>
        <li>
          <button className={styles.button} type="button">
            <span className={styles.buttonText}>SOBRE MIM</span>
            <span className={styles.iconRight} aria-hidden="true">&rsaquo;</span>
          </button>
        </li>
        <li>
          <button className={styles.button} type="button" onClick={() => navigate('/artigos')}>
            <span className={styles.buttonText}>ARTIGOS E TEXTOS</span>
            <span className={styles.iconRight} aria-hidden="true">&rsaquo;</span>
          </button>
        </li>
        <li>
          <button className={styles.button} type="button">
            <span className={styles.buttonText}>EVOLUÇÃO ACADÊMICA</span>
            <span className={styles.iconRight} aria-hidden="true">&rsaquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationButtons;
