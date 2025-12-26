'use client'

import Link from 'next/link'
import Date from './Date'
import { useState } from 'react'
import type { PostData } from '@/types/post'

export default function PostCard({ post }: { post: PostData }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      style={{
        padding: '1.5rem',
        background: '#ffffff',
        border: `1px solid ${isHovered ? '#9ca3af' : '#e5e7eb'}`,
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/posts/${post.id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            margin: 0,
            color: '#111827'
          }}>
            {post.title}
          </h3>
          {post.status === 'draft' && (
            <span style={{
              background: '#fbbf24',
              color: '#78350f',
              padding: '0.25rem 0.625rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.025em'
            }}>
              DRAFT
            </span>
          )}
        </div>
        <time style={{
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <Date dateString={post.date} />
        </time>
      </Link>
    </article>
  )
}
