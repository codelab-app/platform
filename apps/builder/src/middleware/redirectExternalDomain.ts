import { NextResponse } from 'next/server'
import { appApi } from './graphql/app.api'

interface RedirectExternalDomainParams {
  hostname: string
  pathname: string
}

export const redirectExternalDomain = async ({
  hostname,
  pathname,
}: RedirectExternalDomainParams) => {
  console.log('Redirecting...', hostname, pathname)

  const { apps } = await appApi.GetRedirectedApps({
    where: { domains_SOME: { name_IN: [hostname] } },
  })

  const app = apps[0]

  if (!app) {
    throw new Error('Missing app')
  }

  const url = new URL(
    `/_sites/user/${app.owner.username}/${app.slug}${pathname}`,
    hostname,
  )

  console.log('redirectExternalDomain', {
    owner: app.owner.username,
    redirectedUrl: JSON.stringify(url),
    hostname,
  })

  return NextResponse.rewrite(url)

  // const notFoundURL = new URL('/404', redirectedDomainUrl)
  //
  // return NextResponse.rewrite(notFoundURL)
}
