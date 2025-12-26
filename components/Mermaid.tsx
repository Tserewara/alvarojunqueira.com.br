'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
    })
  }, [])

  useEffect(() => {
    if (ref.current) {
      mermaid.run({
        nodes: [ref.current],
      })
    }
  }, [chart])

  return (
    <div
      className="mermaid"
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0',
        background: 'transparent',
      }}
    >
      {chart}
    </div>
  )
}
