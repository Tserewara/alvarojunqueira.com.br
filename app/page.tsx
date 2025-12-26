import Image from 'next/image'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import { getSortedPostData } from '@/lib/posts'
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
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {siteMode === 'draft' && (
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '2px solid #f59e0b',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            margin: '0 0 2rem 0',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#78350f' }}>Draft Mode</strong>
            <span style={{ color: '#92400e', marginLeft: '0.5rem' }}>
              — Documenting my learning journey in real-time
            </span>
          </div>
        )}

        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
            <Image
              src="/images/profile.jpg"
              alt="Álvaro Junqueira"
              width={120}
              height={120}
              style={{
                borderRadius: '50%',
                border: '3px solid #e5e7eb',
                flexShrink: 0
              }}
            />
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '0 0 0.5rem 0',
                color: '#111827'
              }}>
                Álvaro Junqueira
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                margin: 0
              }}>
                Self-taught developer mastering the fundamentals
              </p>
            </div>
          </div>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.75',
            color: '#374151',
            margin: 0
          }}>
            Welcome to my digital garden. I'm exploring programming and mathematics from the ground up,
            documenting everything I learn along the way. No guru pretenses — just honest exploration.
          </p>
        </header>

        {allPostsData.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#111827'
            }}>
              Recent Posts
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {allPostsData.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}
