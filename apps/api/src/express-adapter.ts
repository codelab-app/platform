import type { NestApplicationOptions } from '@nestjs/common'

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
      connectionsCheckingInterval: 60000,
    }

    if (isHttpsEnabled) {
      this.httpServer = https.createServer(
        options.httpsOptions!,
        this.getInstance(),
      )
    } else {
      this.httpServer = http.createServer(httpOptions, this.getInstance())
    }

    // if (options.forceCloseConnections) {
    //   this.trackOpenConnections()
    // }
  }
}

export const expressAdapter = new CustomExpressAdapter(expressApp)
