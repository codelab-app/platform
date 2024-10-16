import type { NextRequest } from 'next/server'

import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

const regenerate = async (request: NextRequest, response: NextResponse) => {
  try {
    const session = await auth0Instance.getSession(request, response)

    if (!session?.user) {
      return NextResponse.json({ error: 'Not Authenticated' }, { status: 403 })
    }

    const domain = request.headers.get('host')
    const { searchParams } = new URL(request.url)
    const pages = searchParams.get('pages')?.split(',') || []

    if (!pages.length) {
      return NextResponse.json(
        {
          error:
            'Invalid input: endpoint accepts "page" parameter as an array of page names',
        },
        { status: 400 },
      )
    }

    const revalidatedPages: Array<string> = []
    const failedPages: Array<string> = []

    const revalidationPromises = pages.map(async (pageSlug) => {
      const path = `/${domain}${pageSlug}`

      try {
        revalidatePath(path)
        revalidatedPages.push(path)
      } catch (error) {
        failedPages.push(path)
      }
    })

    await Promise.all(revalidationPromises)

    return NextResponse.json({ failedPages, revalidatedPages })
  } catch (err) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}

export const POST = regenerate
