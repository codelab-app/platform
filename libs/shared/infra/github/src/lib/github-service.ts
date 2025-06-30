import type { GitHubClient } from './github-client'
import type { GitHubDiscussion, GitHubIssue, GitHubItemWithSync } from './types'

export class GitHubService {
  constructor(private client: GitHubClient) {}

  async fetchDiscussions(
    owner: string,
    repo: string,
    limit = 100,
  ): Promise<Array<GitHubItemWithSync>> {
    const query = `
      query($owner: String!, $repo: String!, $limit: Int!, $cursor: String) {
        repository(owner: $owner, name: $repo) {
          discussions(first: $limit, after: $cursor, orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes {
              id
              number
              title
              body
              url
              createdAt
              updatedAt
              author {
                login
              }
              labels(first: 10) {
                nodes {
                  name
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `

    const discussions: Array<GitHubDiscussion> = []
    let cursor: string | null = null
    let hasNextPage = true

    while (hasNextPage && discussions.length < limit) {
      const response = await this.client.graphql<{
        repository: {
          discussions: {
            nodes: Array<GitHubDiscussion>
            pageInfo: {
              hasNextPage: boolean
              endCursor: string
            }
          }
        }
      }>(query, {
        cursor,
        limit: Math.min(limit - discussions.length, 100),
        owner,
        repo,
      })

      const { nodes, pageInfo } = response.repository.discussions

      discussions.push(...nodes)
      hasNextPage = pageInfo.hasNextPage
      cursor = pageInfo.endCursor

      if (discussions.length >= limit) {
        break
      }
    }

    return discussions.slice(0, limit).map((discussion) => ({
      assignees: [],
      body: discussion.body,
      closedAt: null,
      createdAt: discussion.createdAt,
      htmlUrl: discussion.url,
      id: discussion.id,
      labels: discussion.labels.nodes || [],
      nodeType: 'discussion' as const,
      number: discussion.number,
      state: 'open',
      synced: false,
      title: discussion.title,
      updatedAt: discussion.updatedAt,
      user: discussion.author,
    }))
  }

  async fetchIssues(
    owner: string,
    repo: string,
    limit = 100,
  ): Promise<Array<GitHubItemWithSync>> {
    const issues: Array<GitHubIssue> = []
    let page = 1
    const perPage = Math.min(limit, 100)

    while (issues.length < limit) {
      const response = await this.client.rest.issues.listForRepo({
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
        .map((issue) => ({
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
        }))

      issues.push(...pageIssues)

      if (response.data.length < perPage || issues.length >= limit) {
        break
      }

      page++
    }

    return issues.map((issue) => ({
      assignees: issue.assignees,
      body: issue.body,
      closedAt: issue.closedAt,
      createdAt: issue.createdAt,
      htmlUrl: `https://github.com/${owner}/${repo}/issues/${issue.number}`,
      id: issue.id,
      labels: issue.labels,
      nodeType: 'issue' as const,
      number: issue.number,
      repositoryUrl: issue.repositoryUrl,
      state: issue.state,
      synced: false,
      title: issue.title,
      updatedAt: issue.updatedAt,
      user: issue.user,
    }))
  }

  async fetchSingleDiscussion(
    owner: string,
    repo: string,
    discussionNumber: number,
  ): Promise<GitHubDiscussion | null> {
    const query = `
      query($owner: String!, $repo: String!, $number: Int!) {
        repository(owner: $owner, name: $repo) {
          discussion(number: $number) {
            id
            number
            title
            body
            createdAt
            updatedAt
            url
            author {
              login
            }
            labels(first: 10) {
              nodes {
                name
              }
            }
          }
        }
      }
    `

    const response = await this.client.graphql<{
      repository: {
        discussion: GitHubDiscussion | null
      }
    }>(query, {
      number: discussionNumber,
      owner,
      repo,
    })

    const discussion = response.repository.discussion

    if (!discussion) {
      return null
    }

    return {
      author: discussion.author,
      body: discussion.body,
      createdAt: discussion.createdAt,
      id: discussion.id,
      labels: discussion.labels.nodes || [],
      number: discussion.number,
      title: discussion.title,
      updatedAt: discussion.updatedAt,
      url: discussion.url,
    }
  }

  async fetchSingleIssue(
    owner: string,
    repo: string,
    issueNumber: number,
  ): Promise<GitHubIssue> {
    const { data: issue } = await this.client.rest.issues.get({
      issue_number: issueNumber,
      owner,
      repo,
    })

    return {
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
  }
}
