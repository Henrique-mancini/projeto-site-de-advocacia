import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Menu principal">
        <ul>
          <li><a href="#inicio">Início</a></li>
          <li><a href="#contato">Contato</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
