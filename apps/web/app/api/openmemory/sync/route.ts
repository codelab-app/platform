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

    const userEmail = session.user.email || 'unknown@user.com'
    const body = await request.json()
    const { issueNumber, limit = 100, nodeType = 'issue', owner, repo } = body
    const githubToken = process.env.GITHUB_TOKEN
    const mem0ApiKey = process.env.MEM0_API_KEY

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GitHub token not configured on server' },
        { status: 500 },
      )
    }

    if (!mem0ApiKey) {
      return NextResponse.json(
        { error: 'Mem0 API key not configured on server' },
        { status: 500 },
      )
    }

    if (!owner || !repo) {
      return NextResponse.json(
        {
          error: 'Missing required parameters: owner, repo',
        },
        { status: 400 },
      )
    }

    // Initialize clients and services
    const githubClient = createGitHubClient(githubToken)
    const githubService = new GitHubService(githubClient)
    const mem0Client = createMem0Client(mem0ApiKey)
    const mem0Service = new Mem0Service(mem0Client)

    // Handle single issue/discussion sync
    if (issueNumber !== undefined) {
      // Handle discussion sync
      if (nodeType === 'discussion') {
        try {
          const discussion = await githubService.fetchSingleDiscussion(
            owner,
            repo,
            issueNumber,
          )

          if (!discussion) {
            return NextResponse.json(
              { error: `Discussion #${issueNumber} not found` },
              { status: 404 },
            )
          }

          const githubDiscussion = {
            assignees: [],
            body: discussion.body,
            closedAt: null,
            createdAt: discussion.createdAt,
            id: discussion.id,
            labels: discussion.labels.nodes,
            nodeType: 'discussion' as const,
            number: discussion.number,
            repositoryUrl: discussion.url,
            state: 'open',
            title: discussion.title,
            updatedAt: discussion.updatedAt,
            user: discussion.author,
          }

          const result = await mem0Service.syncGitHubItems(
            [githubDiscussion],
            owner,
            repo,
            userEmail,
          )

          return NextResponse.json({
            message: `Discussion #${issueNumber} synced successfully`,
            result,
          })
        } catch (error) {
          console.error(`Error syncing discussion #${issueNumber}:`, error)

          return NextResponse.json(
            {
              details: error instanceof Error ? error.message : 'Unknown error',
              error: `Failed to sync discussion #${issueNumber}`,
            },
            { status: 500 },
          )
        }
      }

      // Handle issue sync
      // Handle issue sync
      if (issueNumber !== undefined && nodeType === 'issue') {
        try {
          const githubIssue = await githubService.fetchSingleIssue(
            owner,
            repo,
            issueNumber,
          )

          const issueWithType = { ...githubIssue, nodeType: 'issue' as const }

          const result = await mem0Service.syncGitHubItems(
            [issueWithType],
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
    }

    // Handle bulk sync
    const issues = await githubService.fetchIssues(owner, repo, limit)

    // Extract the underlying issue data for syncing
    const issuesForSync = issues.map((issue) => ({
      assignees: issue.assignees,
      body: issue.body,
      closedAt: issue.closedAt,
      createdAt: issue.createdAt,
      id: issue.id,
      labels: issue.labels,
      nodeType: issue.nodeType,
      number: issue.number,
      repositoryUrl: issue.repositoryUrl,
      state: issue.state,
      title: issue.title,
      updatedAt: issue.updatedAt,
      user: issue.user,
    }))

    const result = await mem0Service.syncGitHubItems(
      issuesForSync,
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

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({
    endpoints: {
      POST: {
        description:
          'Sync GitHub issues/discussions to Mem0 memory (bulk or individual)',
        parameters: {
          issueNumber:
            'Specific issue/discussion number to sync (optional, for single item sync)',
          limit:
            'Maximum number of issues to sync (optional, default: 100, for bulk sync)',
          mem0ApiKey:
            'Mem0 API key (optional, falls back to MEM0_API_KEY env var)',
          nodeType:
            'Type of GitHub item: "issue" or "discussion" (optional, default: "issue")',
          owner: 'GitHub repository owner (required)',
          repo: 'GitHub repository name (required)',
        },
      },
    },
    message: 'GitHub Issues to Memory Sync API',
  })
}
