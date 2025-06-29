import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const baseUrl = request.nextUrl.origin

  return NextResponse.json({
    message: 'GitHub Sync Test Endpoint',
    usage: {
      description: 'Use this to test the GitHub sync API',
      example: {
        body: {
          limit: 10,
          mem0ApiKey: 'your_mem0_api_key',
          owner: 'your-github-username',
          repo: 'your-repo-name',
        },
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `${baseUrl}/api/github/openmemory-sync`,
      },
      note: 'Make sure you are authenticated with Auth0 before making the request',
    },
  })
}
