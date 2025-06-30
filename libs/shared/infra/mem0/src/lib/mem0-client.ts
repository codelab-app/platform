import type { UnknownObjectLike } from '@codelab/shared-abstract-types'

import { default as MemoryClient } from 'mem0ai'

export interface Mem0ClientConfig {
  apiKey: string
}

export class Mem0Client {
  get memory() {
    return this.client
  }

  async add(
    messages: Array<{ content: string; role: string }>,
    options: {
      metadata?: UnknownObjectLike
      userId: string
    },
  ) {
    return this.client.add(messages, {
      ...options,
      user_id: options.userId,
    })
  }

  async search(params: {
    filters?: UnknownObjectLike
    limit?: number
    userId: string
  }) {
    return this.client.search({
      ...params,
      user_id: params.userId,
    })
  }

  private client: MemoryClient

  constructor(config: Mem0ClientConfig) {
    this.client = new MemoryClient({
      apiKey: config.apiKey,
    })
  }
}

export const createMem0Client = (apiKey: string | undefined) => {
  if (!apiKey) {
    throw new Error('Mem0 API key not configured')
  }

  return new Mem0Client({ apiKey })
}
