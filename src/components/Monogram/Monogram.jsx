import styles from './Monogram.module.css';

const Monogram = () => {
  return (
    <div className={styles.monogramContainer} aria-hidden="true">
      {/* Exibição visual do monograma clássico */}
      <div className={styles.monogramVisual}>
        MB
      </div>
    </div>
  );
};

export default Monogram;
