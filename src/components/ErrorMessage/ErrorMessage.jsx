import { Link } from 'react-router-dom';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message = 'Ocorreu um erro ao carregar o conteÃºdo.', retryText = 'Tentar novamente', onRetry, backLink, backText = 'Voltar' }) => {
  return (
    <div className={styles.errorWrapper}>
      <p className={styles.errorIcon} aria-hidden="true">!</p>
      <p className={styles.errorMessage}>{message}</p>
      <div className={styles.actions}>
        {onRetry && (
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            {retryText}
          </button>
        )}
        {backLink && (
          <Link to={backLink} className={styles.backLink}>
            {backText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
