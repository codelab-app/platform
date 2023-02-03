import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Edge Runtime limitations prevent us from using many libraries such as `env-var`
 *
 * Say the user domain is `codelab.ai`, while the project domain is `codelab.app`
 *
 * Take `https://codelab.ai/abc`
 *
 * Vercel domain `my-site-7q03y4pi5.vercel.app`
 * Project domain `codelab.app`
 */
export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')
  /**
   * Check if `hostname` contains `builder-egs3r8s85-codelabai.vercel.app`, if so we don't redirect.
   */
  const isVercelDomain = hostname?.includes(process.env.NEXT_PUBLIC_VERCEL_URL!)
  const isHostDomain = hostname?.includes(process.env.NEXT_PUBLIC_BUILDER_HOST!)
  const { pathname } = req.nextUrl
  const isApi = pathname.startsWith('/api')
  const isSites = pathname.startsWith('/_sites')
  const isInternal = pathname.startsWith('/_next')
  const isFavicon = pathname.startsWith('favicon.ico')
  // exclude all files in the public folder
  const isPublic = pathname.includes('.')
  // const isFavicon = pathname.includes('favicon.ico')
  const isLocal = hostname?.startsWith('127.0.0.1')

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page

  if (isSites) {
    /**
     * Allow site access locally
     */
    if (isLocal) {
      return NextResponse.next()
    }

    return new NextResponse(null, { status: 404 })
  }

  if (
    isApi ||
    isVercelDomain ||
    isInternal ||
    isPublic ||
    isFavicon ||
    isHostDomain ||
    !hostname
  ) {
    return NextResponse.next()
  }

  const url = new URL(`/_sites/${hostname}${pathname}`, `https://${hostname}`)

  console.log('Redirecting...', url)

  return NextResponse.rewrite(url)
}
