/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server'
import { appApi } from './graphql/app.api'

interface RedirectExternalDomainParams {
  hostname: string
  pathname: string
  redirectedDomainUrl: string
}

export const redirectExternalDomain = async ({
  hostname,
  pathname,
  redirectedDomainUrl,
}: RedirectExternalDomainParams) => {
  console.log({ redirectedDomainUrl })

  const { apps } = await appApi.GetRedirectedApps({
    where: { domains_SOME: { name_IN: [hostname] } },
  })

  const app = apps[0]

  if (app?.owner.username) {
    const url = new URL(
      `/_sites/user/${app.owner.username}/${app.slug}${pathname}`,
      redirectedDomainUrl,
    )

    console.log('redirectExternalDomain', {
      owner: app?.owner.username,
      redirectedUrl: JSON.stringify(url),
      hostname,
    })

    return NextResponse.rewrite(url)
  }

  const notFoundURL = new URL('/404', redirectedDomainUrl)

  return NextResponse.rewrite(notFoundURL)
}
