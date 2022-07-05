import { NextRequest, NextResponse } from 'next/server'
import { redirectExternalDomain } from '../src/middleware/redirectExternalDomain'

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host')
  const publicRootUrl = process.env.NEXT_PUBLIC_ROOT_URL
  const isRootHostName = hostname === publicRootUrl

  if (!hostname) return NextResponse.next()
  const isApi = pathname.includes('api')
  const isSites = pathname.includes('_sites')

  console.log({
    publicRootUrl,
    hostname,
    pathname,
    isApi,
    isRootHostName,
  })

  if (isApi || isSites) {
    return NextResponse.next()
  }

  if (!isRootHostName) {
    // return NextResponse.next()
    return await redirectExternalDomain({
      req,
      publicRootUrl,
      hostname,
      pathname,
    })
  }

  return NextResponse.next()
}
