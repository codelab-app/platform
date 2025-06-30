export interface SyncResult {
  errors: Array<string>
  synced: number
  total: number
}

export interface MemoryMetadata {
  assignees: Array<string>
  author: string
  closedAt: string | null
  createdAt: string
  githubDiscussionId?: string
  githubIssueId?: string
  githubRepo: string
  issueNumber: number
  labels: Array<string>
  repository: string
  source: 'github'
  state: string
  type: 'discussion' | 'issue'
  updatedAt: string
}
