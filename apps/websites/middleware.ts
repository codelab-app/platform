import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const middleware = async (req: NextRequest) => {
  const hostname = req.headers.get('host')
  const isVercelDomain = hostname?.includes(process.env.NEXT_PUBLIC_VERCEL_URL!)
  const { pathname } = req.nextUrl
  const isApi = pathname.startsWith('/api')
  const isInternal = pathname.startsWith('/_next')
  const isFavicon = pathname.startsWith('favicon.ico')
  const isPublic = pathname.includes('.')

  if (
    isApi ||
    isVercelDomain ||
    isInternal ||
    isPublic ||
    isFavicon ||
    !hostname
  ) {
    return NextResponse.next()
  }

  const url = new URL(`/${hostname}${pathname}`, `https://${hostname}`)

  console.log('Redirecting...', url.toString())

  return NextResponse.rewrite(url)
}

export default middleware
