import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Permitir forçar draft mode via env var para testes locais
  const forceDraftMode = process.env.NEXT_PUBLIC_FORCE_DRAFT_MODE === 'true'
  const isDraftMode = forceDraftMode || hostname.startsWith('draft.')

  const response = NextResponse.next()
  response.headers.set('x-site-mode', isDraftMode ? 'draft' : 'final')

  // SEO: não indexar draft subdomain
  if (isDraftMode) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|images).*)',
}
