import styles from './Monogram.module.css';
import monogramImg from '../../assets/MB.png';

const Monogram = () => {
  return (
    <div className={styles.monogramContainer}>
      <img src={monogramImg} alt="Monograma Ornamental MB" className={styles.monogramImage} width="500" height="500"/>
    </div>
  );
};

export default Monogram;
