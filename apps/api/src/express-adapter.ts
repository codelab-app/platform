import type { NestApplicationOptions } from '@nestjs/common'
import type { Socket } from 'net'

import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import * as http from 'http'
import * as https from 'https'

// Create express app instance
const expressApp = express()

// Add middleware to maintain request context
expressApp.use((req, res, next) => {
  RequestContext.cls.run(new RequestContext(req, res), next)
})

class CustomExpressAdapter extends ExpressAdapter {
  /**
   * Missing `forceCloseConnections` option due to private methods
   */
  public initHttpServer(options: NestApplicationOptions) {
    const isHttpsEnabled = options.httpsOptions

    const httpOptions: http.ServerOptions = {
      /**
       * Default `30000` causing http controllers to timeout, newly added in
       */
      connectionsCheckingInterval: 30000,
      // Increase timeouts to prevent connection resets
      keepAlive: true,
      keepAliveTimeout: 120000,
      requestTimeout: 120000,
    }

    if (isHttpsEnabled) {
      this.httpServer = https.createServer(
        options.httpsOptions!,
        this.getInstance(),
      )
    } else {
      this.httpServer = http.createServer(httpOptions, this.getInstance())
    }

    // Add connection tracking and logging
    this.trackConnections()
  }

  private connections = new Set<Socket>()

  private trackConnections() {
    // Track new connections
    this.httpServer.on('connection', (socket: Socket) => {
      const connectionId = `${socket.remoteAddress}:${socket.remotePort}`

      console.log(`[Server] New connection: ${connectionId}`)

      this.connections.add(socket)

      console.log(socket)

      // Set socket options for stability
      socket.setKeepAlive(true, 0)
      socket.setTimeout(120000)

      // Log connection settings
      console.log(
        `[Server] Connection ${connectionId} timeout: ${socket.timeout}`,
      )

      // Track connection close
      socket.on('close', (hadError) => {
        console.log(
          `[Server] Connection closed: ${connectionId}, had error: ${hadError}`,
        )
        this.connections.delete(socket)
      })

      // Track connection errors
      socket.on('error', (err) => {
        console.error(`[Server] Connection error: ${connectionId}`, err)
      })

      // Track connection timeouts
      socket.on('timeout', () => {
        console.log(`[Server] Connection timeout: ${connectionId}`)
      })
    })

    // Log server events
    this.httpServer.on('listening', () => {
      console.log(
        `[Server] Server is listening, keepAliveTimeout: ${this.httpServer.keepAliveTimeout}ms, headersTimeout: ${this.httpServer.headersTimeout}ms`,
      )
    })

    // Log when server closes
    this.httpServer.on('close', () => {
      console.log('[Server] Server closed')
    })

    // Periodically log connection count
    setInterval(() => {
      console.log(`[Server] Active connections: ${this.connections.size}`)
    }, 30000)
  }
}

export const expressAdapter = new CustomExpressAdapter(expressApp)
