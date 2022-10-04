import { NextRequest, NextResponse } from 'next/server'
import { redirectExternalDomain } from './src/middleware/redirectExternalDomain'

/**
 * Edge Runtime limitations prevent us from using many libraries such as `env-var`
 */
export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')

  if (!hostname) {
    return NextResponse.next()
  }

  const publicRootDomains =
    process.env.NEXT_PUBLIC_ROOT_DOMAINS?.split(',') || []

  const matchedPublicDomains = publicRootDomains.find((domain) =>
    hostname?.includes(domain),
  )

  // vercel domain is for previewing, dev only
  const vercelURL = String(process.env.VERCEL_URL)
  const matchedVercelDomain = hostname?.includes(vercelURL)
  const isRootHostName = Boolean(matchedPublicDomains)
  const { pathname } = req.nextUrl
  const isApi = pathname.includes('api')
  const isSites = pathname.includes('_sites')
  const isInternal = pathname.includes('_next')
  const isFavicon = pathname.includes('favicon.ico')
  const isLocal = hostname.includes('127.0.0.1')
  const redirectedDomainUrl = `http://${hostname}`

  // console.log('Redirect middleware', {
  //   url: JSON.stringify(req.nextUrl),
  //   hostname,
  //   pathname,
  //   redirectedDomainUrl,
  //   publicRootDomains,
  //   isApi,
  //   isSites,
  //   matchedPublicDomains,
  //   matchedVercelDomain,
  //   vercelURL,
  //   isInternal,
  //   isLocal,
  // })

  if (
    isApi ||
    isSites ||
    isRootHostName ||
    matchedPublicDomains ||
    matchedVercelDomain ||
    isInternal ||
    isFavicon ||
    isLocal ||
    !redirectedDomainUrl
  ) {
    return NextResponse.next()
  }

  try {
    return await redirectExternalDomain({
      redirectedDomainUrl,
      hostname,
      pathname,
    })
  } catch (err: unknown) {
    console.error(err)

    return NextResponse.next()
  }
}
