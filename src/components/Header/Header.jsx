import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Menu principal">
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/sobre-mim">Contato</Link></li>
          <li><Link to="/artigos">Artigos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
