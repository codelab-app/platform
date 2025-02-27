import type { RequestInit as NodeRequestInit } from 'node-fetch'

import http from 'node:http'
import https from 'node:https'
import fetch from 'node-fetch'

/**
 * Use custom keep-alive agents to reduce 'socket hang up' errors
 */
const httpAgent = new http.Agent({
  keepAlive: true,
  timeout: 120000,
})

const httpsAgent = new https.Agent({
  keepAlive: true,
  timeout: 120000,
})

type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

/**
 * `fetch` from node doesn't support agent, but `node-fetch` does
 */
export const nodeFetch: Fetch = (input, init): Promise<Response> => {
  const actualUrl =
    typeof input === 'string'
      ? new URL(input)
      : input instanceof URL
      ? input
      : new URL(input.toString())

  const agent = actualUrl.protocol === 'http:' ? httpAgent : httpsAgent

  // The important part: cast to node-fetch's RequestInit
  // so that 'agent' is recognized, avoiding TS errors
  /**
   * Convert from native fetch to node-fetch
   */
  return fetch(actualUrl, {
    ...(init as NodeRequestInit),
    agent,
  }) as unknown as Promise<Response>
}
