import { NextRequest, NextResponse } from 'next/server'
import { redirectExternalDomain } from './src/middleware/redirectExternalDomain'

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

  if (!hostname) {
    return NextResponse.next()
  }

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  // This is only required for subdomain
  // const currentHost =
  //   process.env.NODE_ENV == 'production'
  //     ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_URL}`, '')
  //     : process.env.CURR_HOST

  /**
   * Check if `hostname` contains `builder-egs3r8s85-codelabai.vercel.app`, if so we don't redirect.
   */
  const isVercelDomain = hostname.includes(process.env.NEXT_PUBLIC_VERCEL_URL!)
  const isHostDomain = hostname.includes(process.env.NEXT_PUBLIC_BUILDER_HOST!)
  const { pathname } = req.nextUrl
  const isApi = pathname.startsWith('/api')
  const isSites = pathname.startsWith('/_sites')
  const isInternal = pathname.startsWith('/_next')
  // exclude all files in the public folder
  const isPublic = pathname.includes('.')
  // const isFavicon = pathname.includes('favicon.ico')
  const isLocal = hostname.startsWith('127.0.0.1')

  console.log('Middleware config', {
    url: JSON.stringify(req.nextUrl),
    'env.NEXT_PUBLIC_VERCEL_URL': process.env.NEXT_PUBLIC_VERCEL_URL,
    hostname,
    pathname,
    isApi,
    isSites,
    isHostDomain,
    isVercelDomain,
    isInternal,
    isLocal,
  })

  /**
   * Allow site access locally
   */
  if (isLocal) {
    return NextResponse.next()
  }

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (isSites) {
    return new NextResponse(null, { status: 404 })
  }

  if (isApi || isVercelDomain || isInternal || isPublic || isHostDomain) {
    return NextResponse.next()
  }

  return await redirectExternalDomain({
    /**
     * `codelab.ai`
     */
    hostname,
    /**
     * `/user/app/page`
     */
    pathname,
  })
}
