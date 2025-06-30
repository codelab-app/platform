import type { GitHubItemWithSync } from '@codelab/shared-infra-github'

import type { Mem0Client } from './mem0-client'
import type { MemoryMetadata, SyncResult } from './types'

export class Mem0Service {
  constructor(private client: Mem0Client) {}

  async checkSyncStatus(
    items: Array<Omit<GitHubItemWithSync, 'synced'>>,
    owner: string,
    repo: string,
    userId: string,
  ): Promise<Array<GitHubItemWithSync>> {
    return Promise.all(
      items.map(async (item) => {
        try {
          const isDiscussion = item.nodeType === 'discussion'

          const memories = await this.client.search({
            filters: {
              AND: [
                isDiscussion
                  ? { github_discussion_id: { eq: item.id.toString() } }
                  : { github_issue_id: { eq: item.id.toString() } },
                { github_repo: { eq: `${owner}/${repo}` } },
              ],
            },
            limit: 1,
            userId,
          })

          const synced = memories.length > 0

          return {
            ...item,
            synced,
          }
        } catch (error) {
          console.error(
            `Error checking sync status for ${item.nodeType} #${item.number}:`,
            error,
          )

          return {
            ...item,
            synced: false,
          }
        }
      }),
    )
  }

  async syncGitHubItems(
    items: Array<{
      assignees: Array<{ login: string }>
      body: string | null
      closedAt: string | null
      createdAt: string
      id: number | string
      labels: Array<{ name: string }>
      nodeType?: 'discussion' | 'issue'
      number: number
      repositoryUrl?: string
      state: string
      title: string
      updatedAt: string
      url?: string
      user: { login: string } | null
    }>,
    owner: string,
    repo: string,
    userId: string,
  ): Promise<SyncResult> {
    const result: SyncResult = {
      errors: [],
      synced: 0,
      total: items.length,
    }

    for (const item of items) {
      try {
        const isDiscussion = item.nodeType === 'discussion'

        const metadata: MemoryMetadata = {
          assignees: item.assignees.map((assignee) => assignee.login),
          author: item.user?.login || 'unknown',
          closedAt: item.closedAt,
          createdAt: item.createdAt,
          ...(isDiscussion
            ? { githubDiscussionId: item.id.toString() }
            : { githubIssueId: item.id.toString() }),
          githubRepo: `${owner}/${repo}`,
          issueNumber: item.number,
          labels: item.labels.map((label) => label.name),
          repository: `${owner}/${repo}`,
          source: 'github',
          state: item.state,
          type: isDiscussion ? 'discussion' : 'issue',
          updatedAt: item.updatedAt,
        }

        const content = this.formatItemContent(item, owner, repo)

        console.log(
          `\n=== Syncing ${item.nodeType || 'Issue'} #${
            item.number
          } to Mem0 ===`,
        )
        console.log('Content:', content)
        console.log('Metadata:', JSON.stringify(metadata, null, 2))
        console.log('User ID:', userId)
        console.log('=======================================\n')

        // Convert metadata to snake_case for mem0ai API
        const mem0Metadata = {
          assignees: metadata.assignees,
          author: metadata.author,
          closedAt: metadata.closedAt,
          createdAt: metadata.createdAt,
          ...(metadata.githubDiscussionId
            ? { github_discussion_id: metadata.githubDiscussionId }
            : {}),
          ...(metadata.githubIssueId
            ? { github_issue_id: metadata.githubIssueId }
            : {}),
          github_repo: metadata.githubRepo,
          issueNumber: metadata.issueNumber,
          labels: metadata.labels,
          repository: metadata.repository,
          source: metadata.source,
          state: metadata.state,
          type: metadata.type,
          updatedAt: metadata.updatedAt,
        }

        await this.client.add([{ content, role: 'user' }], {
          metadata: mem0Metadata,
          userId,
        })

        result.synced++
      } catch (error) {
        const errorMessage = `Failed to sync ${item.nodeType || 'issue'} #${
          item.number
        }: ${error instanceof Error ? error.message : 'Unknown error'}`

        result.errors.push(errorMessage)
        console.error(errorMessage)
      }
    }

    return result
  }

  private formatItemContent(
    item: {
      assignees: Array<{ login: string }>
      body: string | null
      closedAt: string | null
      createdAt: string
      labels: Array<{ name: string }>
      nodeType?: 'discussion' | 'issue'
      number: number
      state: string
      title: string
      user: { login: string } | null
    },
    owner: string,
    repo: string,
  ): string {
    const itemType = item.nodeType === 'discussion' ? 'Discussion' : 'Issue'

    const parts = [
      `GitHub ${itemType} #${item.number} in ${owner}/${repo}`,
      `Title: ${item.title}`,
      `State: ${item.state}`,
      `Author: ${item.user?.login || 'unknown'}`,
      `Created: ${new Date(item.createdAt).toLocaleDateString()}`,
    ]

    if (item.labels.length > 0) {
      parts.push(`Labels: ${item.labels.map((label) => label.name).join(', ')}`)
    }

    if (item.assignees.length > 0) {
      parts.push(`Assignees: ${item.assignees.map((a) => a.login).join(', ')}`)
    }

    if (item.body) {
      parts.push(`\nDescription:\n${item.body}`)
    }

    if (item.closedAt) {
      parts.push(`\nClosed: ${new Date(item.closedAt).toLocaleDateString()}`)
    }

    return parts.join('\n')
  }
}
