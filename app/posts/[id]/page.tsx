import Layout from '@/components/Layout'
import { getAllPostIds, getPostData } from '@/lib/posts'
import Date from '@/components/Date'
import MDXContent from '@/components/MDXContent'
import utilStyles from '@/styles/utils.module.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = getAllPostIds()
  return ids.map((id) => ({
    id: id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const postData = getPostData(id)

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
  const postData = getPostData(id)

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
        <MDXContent content={postData.content} />
      </article>
    </Layout>
  )
}
