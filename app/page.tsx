import Image from 'next/image'
import Layout from '@/components/Layout'
import { getSortedPostData } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Álvaro's Place",
}

export default async function Home() {
  const allPostsData = getSortedPostData()

  return (
    <Layout home>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
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
      </div>
    </Layout>
  )
}
