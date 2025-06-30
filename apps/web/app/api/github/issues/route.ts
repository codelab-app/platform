import type { NextRequest } from 'next/server'

import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { createGitHubClient, GitHubService } from '@codelab/shared-infra-github'
import { createMem0Client, Mem0Service } from '@codelab/shared-infra-mem0'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth0Instance.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { owner, repo } = body
    const githubToken = process.env.GITHUB_TOKEN
    const mem0ApiKey = process.env.MEM0_API_KEY

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GitHub token not configured on server' },
        { status: 500 },
      )
    }

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Missing required parameters: owner, repo' },
        { status: 400 },
      )
    }

    // Initialize GitHub client and service
    const githubClient = createGitHubClient(githubToken)
    const githubService = new GitHubService(githubClient)
    // Fetch GitHub issues
    const issues = await githubService.fetchIssues(owner, repo)
    // Check sync status if mem0ApiKey is provided
    let issuesWithSync = issues

    if (mem0ApiKey) {
      const mem0Client = createMem0Client(mem0ApiKey)
      const mem0Service = new Mem0Service(mem0Client)

      issuesWithSync = await mem0Service.checkSyncStatus(
        issues,
        owner,
        repo,
        session.user.email,
      )
    }

    return NextResponse.json({
      issues: issuesWithSync,
      total: issuesWithSync.length,
    })
  } catch (error) {
    console.error('Error fetching GitHub issues:', error)

    return NextResponse.json(
      {
        details: error instanceof Error ? error.message : 'Unknown error',
        error: 'Failed to fetch GitHub issues',
      },
      { status: 500 },
    )
  }
}
