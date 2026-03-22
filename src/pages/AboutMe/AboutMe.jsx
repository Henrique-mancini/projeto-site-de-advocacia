import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutMe.module.css';
import mbPicture from '../../assets/MB_Picture.jpeg';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const AboutMe = () => {
  return (
    <motion.main
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.contentWrapper}>
        <section className={styles.textContent}>
          <h1 className={styles.title}>Minha Trajetória</h1>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <p className={styles.text}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <section className={styles.imageContent}>
          <div className={styles.imagePlaceholder}>
            <img 
              src={mbPicture} 
              alt="Fotografia do Advogado" 
              className={styles.image}
            />
          </div>
        </section>
      </div>
    </motion.main>
  );
};

export default AboutMe;
