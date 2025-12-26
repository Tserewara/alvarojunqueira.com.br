import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import utilStyles from '@/styles/utils.module.css'

export default function NotFound() {
  return (
    <Layout hideBackLink>
      <article style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem'
      }}>
        <Image
          src="/images/Designer.jpeg"
          alt="Not found illustration"
          width={400}
          height={400}
          style={{
            borderRadius: '12px',
            marginBottom: '2rem'
          }}
        />
        <h1 className={utilStyles.headingXl} style={{ marginBottom: '1rem' }}>
          Nothing found in the village
        </h1>
        <p style={{
          marginBottom: '2rem',
          color: '#6b7280',
          fontSize: '1.125rem'
        }}>
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          style={{
            color: '#0070f3',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem'
          }}
        >
          ← Back to home
        </Link>
      </article>
    </Layout>
  )
}
