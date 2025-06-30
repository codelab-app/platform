export interface GitHubIssue {
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

export interface GitHubDiscussion {
  author: {
    login: string
  }
  body: string | null
  createdAt: string
  id: string
  labels: Array<{
    name: string
  }>
  number: number
  title: string
  updatedAt: string
  url: string
}

export interface GitHubItemWithSync {
  assignees: Array<{
    login: string
  }>
  body: string | null
  closedAt: string | null
  createdAt: string
  htmlUrl: string
  id: number | string
  labels: Array<{
    name: string
  }>
  nodeType: 'discussion' | 'issue'
  number: number
  owner?: string
  repo?: string
  repositoryUrl?: string
  state: string
  synced: boolean
  title: string
  updatedAt: string
  user: {
    login: string
  } | null
}
