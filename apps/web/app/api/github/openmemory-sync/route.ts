import type { NextRequest } from 'next/server'

import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { Octokit } from '@octokit/rest'
import MemoryClient from 'mem0ai'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface GitHubIssue {
  assignees: Array<{
    login: string
  }>
  body: string | null
  closedAt: string | null
  createdAt: string
  id: number
  labels: Array<{
    name: string
  }>
  number: number
  repositoryUrl: string
  state: string
  title: string
  updatedAt: string
  user: {
    login: string
  } | null
}

interface SyncResult {
  errors: Array<string>
  synced: number
  total: number
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth0Instance.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user.email || 'unknown@user.com'
    const body = await request.json()
    const { issueNumber, limit = 100, mem0ApiKey, owner, repo } = body
    const githubToken = process.env.GITHUB_TOKEN

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GitHub token not configured on server' },
        { status: 500 },
      )
    }

    // Use environment variable for mem0ApiKey if not provided
    const apiKey = mem0ApiKey || process.env.MEM0_API_KEY

    if (!owner || !repo || !apiKey) {
      return NextResponse.json(
        {
          error: 'Missing required parameters: owner, repo',
        },
        { status: 400 },
      )
    }

    // Initialize GitHub client
    const octokit = new Octokit({
      auth: githubToken,
    })

    // Initialize Mem0 client
    const memoryClient = new MemoryClient({
      apiKey,
    })

    // Handle single issue sync
    if (issueNumber !== undefined) {
      try {
        const { data: issue } = await octokit.issues.get({
          issue_number: issueNumber,
          owner,
          repo,
        })

        const githubIssue: GitHubIssue = {
          assignees: issue.assignees || [],
          body: issue.body,
          closedAt: issue.closed_at,
          createdAt: issue.created_at,
          id: issue.id,
          labels: issue.labels.filter(
            (label): label is { name: string } =>
              typeof label === 'object' && 'name' in label,
          ),
          number: issue.number,
          repositoryUrl: issue.repository_url,
          state: issue.state,
          title: issue.title,
          updatedAt: issue.updated_at,
          user: issue.user,
        }

        const result = await syncIssuesToMemory(
          memoryClient,
          [githubIssue],
          owner,
          repo,
          userEmail,
        )

        return NextResponse.json({
          message: `Issue #${issueNumber} synced successfully`,
          result,
        })
      } catch (error) {
        console.error(`Error syncing issue #${issueNumber}:`, error)

        return NextResponse.json(
          {
            details: error instanceof Error ? error.message : 'Unknown error',
            error: `Failed to sync issue #${issueNumber}`,
          },
          { status: 500 },
        )
      }
    }

    // Handle bulk sync
    const issues = await fetchGitHubIssues(octokit, owner, repo, limit)

    // Sync issues to memory
    const result = await syncIssuesToMemory(
      memoryClient,
      issues,
      owner,
      repo,
      userEmail,
    )

    return NextResponse.json({
      message: 'GitHub issues synced successfully',
      result,
    })
  } catch (error) {
    console.error('Error syncing GitHub issues:', error)

    return NextResponse.json(
      {
        details: error instanceof Error ? error.message : 'Unknown error',
        error: 'Failed to sync GitHub issues',
      },
      { status: 500 },
    )
  }
}

const fetchGitHubIssues = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  limit: number,
): Promise<Array<GitHubIssue>> => {
  const issues: Array<GitHubIssue> = []
  let page = 1
  const perPage = Math.min(limit, 100)

  while (issues.length < limit) {
    const response = await octokit.issues.listForRepo({
      owner,
      page,
      per_page: perPage,
      repo,
      state: 'all',
    })

    if (response.data.length === 0) {
      break
    }

    const pageIssues = response.data
      .filter((issue) => !issue.pull_request)
      .slice(0, limit - issues.length)
      .map((issue) => ({
        ...issue,
        closedAt: issue.closed_at,
        createdAt: issue.created_at,
        repositoryUrl: issue.repository_url,
        updatedAt: issue.updated_at,
      })) as Array<GitHubIssue>

    issues.push(...pageIssues)

    if (response.data.length < perPage || issues.length >= limit) {
      break
    }

    page++
  }

  return issues
}

const syncIssuesToMemory = async (
  memoryClient: MemoryClient,
  issues: Array<GitHubIssue>,
  owner: string,
  repo: string,
  userId: string,
): Promise<SyncResult> => {
  const result: SyncResult = {
    errors: [],
    synced: 0,
    total: issues.length,
  }

  for (const issue of issues) {
    try {
      const metadata = {
        assignees: issue.assignees.map((assignee) => assignee.login),
        author: issue.user?.login || 'unknown',
        closedAt: issue.closedAt,
        createdAt: issue.createdAt,
        issueId: issue.id,
        issueNumber: issue.number,
        labels: issue.labels.map((label) => label.name),
        repository: `${owner}/${repo}`,
        source: 'github',
        state: issue.state,
        type: 'issue',
        updatedAt: issue.updatedAt,
      }

      const content = formatIssueContent(issue, owner, repo)

      await memoryClient.add([{ content, role: 'user' }], {
        metadata,
        user_id: userId,
      })

      result.synced++
    } catch (error) {
      const errorMessage = `Failed to sync issue #${issue.number}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`

      result.errors.push(errorMessage)
      console.error(errorMessage)
    }
  }

  return result
}

const formatIssueContent = (
  issue: GitHubIssue,
  owner: string,
  repo: string,
): string => {
  const parts = [
    `GitHub Issue #${issue.number} in ${owner}/${repo}`,
    `Title: ${issue.title}`,
    `State: ${issue.state}`,
    `Author: ${issue.user?.login || 'unknown'}`,
    `Created: ${new Date(issue.createdAt).toLocaleDateString()}`,
  ]

  if (issue.labels.length > 0) {
    parts.push(`Labels: ${issue.labels.map((label) => label.name).join(', ')}`)
  }

  if (issue.assignees.length > 0) {
    parts.push(`Assignees: ${issue.assignees.map((a) => a.login).join(', ')}`)
  }

  if (issue.body) {
    parts.push(`\nDescription:\n${issue.body}`)
  }

  if (issue.closedAt) {
    parts.push(`\nClosed: ${new Date(issue.closedAt).toLocaleDateString()}`)
  }

  return parts.join('\n')
}

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({
    endpoints: {
      POST: {
        description: 'Sync GitHub issues to Mem0 memory (bulk or individual)',
        parameters: {
          issueNumber:
            'Specific issue number to sync (optional, for single issue sync)',
          limit:
            'Maximum number of issues to sync (optional, default: 100, for bulk sync)',
          mem0ApiKey:
            'Mem0 API key (optional, falls back to MEM0_API_KEY env var)',
          owner: 'GitHub repository owner (required)',
          repo: 'GitHub repository name (required)',
        },
      },
    },
    message: 'GitHub Issues to Memory Sync API',
  })
}
