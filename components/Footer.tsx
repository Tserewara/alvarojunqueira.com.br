import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          href="https://github.com/tserewara"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <span className={styles.separator}>•</span>
        <a
          href="https://www.linkedin.com/in/alvaro-amaral-junqueira/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
