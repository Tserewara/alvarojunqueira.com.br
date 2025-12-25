import Layout from '@/components/Layout'
import Link from 'next/link'
import utilStyles from '@/styles/utils.module.css'

export default function NotFound() {
  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>Post não encontrado</h1>
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Desculpe, o post que você está procurando não existe ou foi removido.
        </p>
        <Link
          href="/"
          style={{
            color: '#0070f3',
            textDecoration: 'none',
            fontWeight: 500
          }}
        >
          ← Voltar para a página inicial
        </Link>
      </article>
    </Layout>
  )
}
