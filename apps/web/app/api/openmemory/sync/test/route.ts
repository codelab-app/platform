import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const baseUrl = request.nextUrl.origin

  return NextResponse.json({
    message: 'OpenMemory Sync Test Endpoint',
    usage: {
      description: 'Use this to test the OpenMemory sync API',
      example: {
        body: {
          issueNumber: 123,
          limit: 10,
          owner: 'your-github-username',
          repo: 'your-repo-name',
        },
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `${baseUrl}/api/openmemory/sync`,
      },
      note: 'Make sure you are authenticated with Auth0 and have OPENMEMORY_API_KEY set in environment variables',
    },
  })
}
