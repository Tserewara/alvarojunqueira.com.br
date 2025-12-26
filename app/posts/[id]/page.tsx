import Layout from '@/components/Layout'
import { getAllPostIds, getPostData } from '@/lib/posts'
import Date from '@/components/Date'
import DraftBadge from '@/components/DraftBadge'
import MDXContent from '@/components/MDXContent'
import utilStyles from '@/styles/utils.module.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  // Gerar para todos (draft + final) na build
  const draftIds = getAllPostIds('draft')
  const finalIds = getAllPostIds('final')
  const allIds = Array.from(new Set([...draftIds, ...finalIds]))

  return allIds.map((id) => ({
    id: id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const headersList = await headers()
  const siteMode = headersList.get('x-site-mode') === 'draft' ? 'draft' : 'final'

  const postData = getPostData(id, siteMode)

  if (!postData) {
    return {
      title: 'Post não encontrado',
    }
  }

  return {
    title: postData.title,
    description: `Blog post: ${postData.title}`,
  }
}

export default async function Post({ params }: Props) {
  const { id } = await params
  const headersList = await headers()
  const siteMode = headersList.get('x-site-mode') === 'draft' ? 'draft' : 'final'

  const postData = getPostData(id, siteMode)

  if (!postData) {
    notFound()
  }

  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        {postData.status === 'draft' && (
          <DraftBadge
            draftStartDate={postData.draftStartDate}
            lastUpdated={postData.lastUpdated}
          />
        )}

        <MDXContent content={postData.content || ''} />
      </article>
    </Layout>
  )
}
