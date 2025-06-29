import type { NextRequest } from 'next/server'

import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { Octokit } from '@octokit/rest'
import MemoryClient from 'mem0ai'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface GitHubIssueWithSync {
  createdAt: string
  htmlUrl: string
  id: number
  number: number
  state: string
  synced: boolean
  title: string
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth0Instance.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { mem0ApiKey, owner, repo } = body
    const githubToken = process.env.GITHUB_TOKEN

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

    // Initialize GitHub client
    const octokit = new Octokit({
      auth: githubToken,
    })

    // Fetch GitHub issues
    const issues = await fetchGitHubIssues(octokit, owner, repo)
    // Check sync status if mem0ApiKey is provided
    let issuesWithSync: Array<GitHubIssueWithSync>

    if (mem0ApiKey) {
      const memoryClient = new MemoryClient({
        apiKey: mem0ApiKey,
      })

      issuesWithSync = await checkSyncStatus(
        issues,
        memoryClient,
        owner,
        repo,
        session.user.email,
      )
    } else {
      // If no mem0ApiKey, assume all issues are not synced
      issuesWithSync = issues.map((issue) => ({
        ...issue,
        synced: false,
      }))
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

const fetchGitHubIssues = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  limit = 100,
) => {
  interface GitHubApiIssue {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    created_at: string
    // eslint-disable-next-line @typescript-eslint/naming-convention
    html_url: string
    id: number
    number: number
    // eslint-disable-next-line @typescript-eslint/naming-convention
    pull_request?: unknown
    state: string
    title: string
  }

  const issues: Array<GitHubApiIssue> = []
  let page = 1
  const perPage = Math.min(limit, 100)

  while (issues.length < limit) {
    const response = await octokit.issues.listForRepo({
      direction: 'desc',
      owner,
      page,
      per_page: perPage,
      repo,
      sort: 'created',
      state: 'all',
    })

    if (response.data.length === 0) {
      break
    }

    const pageIssues = response.data
      .filter((issue) => !issue.pull_request)
      .slice(0, limit - issues.length)

    issues.push(...pageIssues)

    if (response.data.length < perPage || issues.length >= limit) {
      break
    }

    page++
  }

  return issues.map((issue) => ({
    createdAt: issue.created_at,
    htmlUrl: issue.html_url,
    id: issue.id,
    number: issue.number,
    state: issue.state,
    title: issue.title,
  }))
}

const checkSyncStatus = async (
  issues: Array<{
    id: number
    number: number
    title: string
    state: string
    createdAt: string
    htmlUrl: string
  }>,
  memoryClient: MemoryClient,
  owner: string,
  repo: string,
  userId: string,
): Promise<Array<GitHubIssueWithSync>> => {
  // Check sync status for each issue
  const issuesWithSync = await Promise.all(
    issues.map(async (issue) => {
      try {
        // Search for the issue in memory
        const searchQuery = `GitHub Issue #${issue.number} in ${owner}/${repo}`

        const memories = await memoryClient.search({
          limit: 1,
          query: searchQuery,
          user_id: userId,
        })

        // Check if we found a memory for this issue
        const synced = memories.length > 0

        return {
          ...issue,
          synced,
        }
      } catch (error) {
        console.error(
          `Error checking sync status for issue #${issue.number}:`,
          error,
        )

        return {
          ...issue,
          synced: false,
        }
      }
    }),
  )

  return issuesWithSync
}
