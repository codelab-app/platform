import { graphql } from '@octokit/graphql'
import { Octokit } from '@octokit/rest'

export interface GitHubClientConfig {
  token: string
}

export class GitHubClient {
  get graphql() {
    return this.graphqlClient
  }

  get rest() {
    return this.octokit
  }

  private graphqlClient: ReturnType<typeof graphql.defaults>

  private octokit: Octokit

  constructor(config: GitHubClientConfig) {
    this.octokit = new Octokit({
      auth: config.token,
    })

    this.graphqlClient = graphql.defaults({
      headers: {
        authorization: `token ${config.token}`,
      },
    })
  }
}

export const createGitHubClient = (token: string | undefined) => {
  if (!token) {
    throw new Error('GitHub token not configured')
  }

  return new GitHubClient({ token })
}
