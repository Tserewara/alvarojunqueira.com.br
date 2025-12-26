import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { getSortedPostData } from '@/lib/posts'
import Date from '@/components/Date'
import utilStyles from '@/styles/utils.module.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: "Álvaro's Place",
}

export default async function Home() {
  const headersList = await headers()
  const siteMode = headersList.get('x-site-mode') === 'draft' ? 'draft' : 'final'

  const allPostsData = getSortedPostData(siteMode)

  return (
    <Layout home>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {siteMode === 'draft' && (
          <div style={{
            background: '#fef3c7',
            border: '2px solid #f59e0b',
            borderRadius: '8px',
            padding: '1rem',
            margin: '1rem 0',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <strong>Modo Draft</strong>: Aqui documento minha jornada em tempo real.
          </div>
        )}

        <p
          title="Algo incrível vai acontecer aqui! Espere um pouco!"
          style={{
            textAlign: "center",
            fontSize: "24px",
            cursor: "pointer"
          }}
        >
          Marĩ ĩwẽ uptabi te dza watobro ãmemhã! Tsapari a'ö!
        </p>
        <Image
          src="/images/Designer.jpeg"
          className="img-profile"
          alt="Álvaro"
          width={300}
          height={300}
          style={{height: "300px", width: "auto"}}
        />

        {allPostsData.length > 0 && (
          <section style={{ width: '100%', maxWidth: '600px', margin: '2rem 0' }}>
            <h2 className={utilStyles.headingLg}>Posts</h2>
            <ul className={utilStyles.list}>
              {allPostsData.map((post) => (
                <li key={post.id} className={utilStyles.listItem}>
                  <Link href={`/posts/${post.id}`}>
                    {post.title}
                    {post.status === 'draft' && (
                      <span style={{
                        marginLeft: '0.5rem',
                        background: '#fbbf24',
                        color: '#78350f',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: 'bold'
                      }}>DRAFT</span>
                    )}
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={post.date} />
                  </small>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Layout>
  )
}
