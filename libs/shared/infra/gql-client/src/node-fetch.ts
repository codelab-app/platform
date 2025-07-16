import type { RequestInit as NodeRequestInit } from 'node-fetch'

import http from 'node:http'
import https from 'node:https'
import fetch from 'node-fetch'

/**
 * Use custom keep-alive agents to reduce 'socket hang up' errors
 */
const httpAgent = new http.Agent({
  keepAlive: true,
  // Limit concurrent sockets per host
  maxFreeSockets: 10,

  maxSockets: 50,
  // Keep 10 sockets open for reuse
  timeout: 120000,
})

const httpsAgent = new https.Agent({
  keepAlive: true,
  // Limit concurrent sockets per host
  maxFreeSockets: 10,

  maxSockets: 50,
  // Keep 10 sockets open for reuse
  timeout: 120000,
})

// Log agent statistics periodically for debugging
if (process.env.NODE_ENV !== 'production') {
  setInterval(() => {
    const httpStats = {
      freeSockets: Object.keys(httpAgent.freeSockets).reduce((acc, key) => {
        acc[key] = httpAgent.freeSockets[key]?.length || 0

        return acc
      }, {} as Record<string, number>),
      sockets: Object.keys(httpAgent.sockets).reduce((acc, key) => {
        acc[key] = httpAgent.sockets[key]?.length || 0

        return acc
      }, {} as Record<string, number>),
    }

    const httpsStats = {
      freeSockets: Object.keys(httpsAgent.freeSockets).reduce((acc, key) => {
        acc[key] = httpsAgent.freeSockets[key]?.length || 0

        return acc
      }, {} as Record<string, number>),
      sockets: Object.keys(httpsAgent.sockets).reduce((acc, key) => {
        acc[key] = httpsAgent.sockets[key]?.length || 0

        return acc
      }, {} as Record<string, number>),
    }

    if (
      Object.keys(httpStats.sockets).length > 0 ||
      Object.keys(httpsStats.sockets).length > 0
    ) {
      console.log('[HTTP Agent Stats]', {
        http: httpStats,
        https: httpsStats,
      })
    }
    // Log every 30 seconds
  }, 30000)
}

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
