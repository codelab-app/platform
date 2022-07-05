import { NextRequest, NextResponse } from 'next/server'
import { appApi } from './graphql/app.api'

interface RedirectExternalDomainParams {
  req: NextRequest
  hostname: string
  pathname: string
  publicRootUrl: string
}

const stripTrailingSlash = (str: string) => {
  if (str.charAt(str.length - 1) == '/') {
    str = str.substring(0, str.length - 1)
  }
  return str
}

export const redirectExternalDomain = async ({
  req,
  hostname,
  pathname,
  publicRootUrl,
}: RedirectExternalDomainParams) => {
  const { apps } = await appApi.GetRedirectedApps({
    where: { domains_INCLUDES: hostname },
  })

  const app = apps[0]
  console.log({ app })

  if (app?.owner.username) {
    // const redirectedUrl = stripTrailingSlash(`${publicRootUrl}`)
    // console.log({ redirectedUrl })
    // const nextUrl = req.nextUrl.clone()
    // nextUrl.pathname =

    console.log(`/_sites/${app.owner.username}/${app.name}/`, publicRootUrl)

    const url = new URL(
      stripTrailingSlash(
        `/_sites/user/${app.owner.username}/${app.name}/page1`,
      ),
      publicRootUrl,
    )

    console.log(url.toString())

    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}
