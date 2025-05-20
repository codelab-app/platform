import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { NextRequest } from 'next/server'

import { authMiddleware } from '@codelab/backend-infra-adapter-middleware'
import { NextResponse } from 'next/server'

// endpoint to securely redirect request to a user domain
const regenerate = async (request: NextRequest, response: NextResponse) => {
  try {
    await authMiddleware(request, response)

    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')
    const pages = searchParams.get('pages')

    console.log(domain, pages)

    if (!domain || !pages) {
      return Response.json(
        { error: 'Missing domain or pages' },
        { status: 400 },
      )
    }

    const regenerationResult = await fetch(
      // We could attach `domain` as a query param, but we explicity force a hostname so we can verify that the user owns the domain & has properly setup their DNS
      `http://${domain}/api/regenerate?pages=${pages}`,
      {
        headers: {
          Cookie: request.headers.get('cookie') ?? '',
        },
      },
    )

    const json = regenerationResult.json() as Promise<ObjectLike>

    return Response.json(await json)
  } catch (err) {
    return Response.json({ error: 'An error occurred' }, { status: 500 })
  }
}

export const POST = async (request: NextRequest) => {
  const response = new NextResponse()

  return regenerate(request, response)
}
