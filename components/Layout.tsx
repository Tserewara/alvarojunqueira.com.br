import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '@/styles/utils.module.css'
import Link from 'next/link'
import Footer from './Footer'

const name = 'Álvaro'
export const siteTitle = "Álvaro's Place"

interface LayoutProps {
  children: React.ReactNode
  home?: boolean
  hideBackLink?: boolean
}

export default function Layout({ children, home, hideBackLink = false }: LayoutProps) {
  return (
    <div className={styles.container}>
      {!home && (
        <header className={styles.header}>
          <Link href="/">
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={108}
              width={108}
              alt={name}
            />
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/" className={utilStyles.colorInherit}>
              {name}
            </Link>
          </h2>
        </header>
      )}
      <main>{children}</main>
      {!home && !hideBackLink && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <Footer />
    </div>
  )
}
