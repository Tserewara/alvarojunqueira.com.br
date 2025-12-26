'use client'

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import Mermaid from './Mermaid'

interface MDXContentProps {
  content: string
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        pre({ node, children, ...props }) {
          // Check if this is a mermaid code block
          const child = children as any
          if (child?.props?.className?.includes('language-mermaid')) {
            return <Mermaid chart={String(child.props.children).replace(/\n$/, '')} />
          }

          return <pre {...props}>{children}</pre>
        },
        code({ className, children, ...props }) {
          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
