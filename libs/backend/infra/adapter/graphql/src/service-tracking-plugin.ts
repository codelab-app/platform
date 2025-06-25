import type { ApolloServerPlugin } from '@apollo/server'

import { TRACING_HEADERS } from '@codelab/shared-infra-tracing'

/**
 * Apollo Server plugin to log service tracking headers
 */
export const serviceTrackingPlugin: ApolloServerPlugin<any> = {
  async requestDidStart() {
    return {
      async willSendResponse(ctx) {
        const operationId = ctx.request.http?.headers?.get(
          TRACING_HEADERS.OPERATION_ID,
        )
        const requestId = ctx.request.http?.headers?.get(
          TRACING_HEADERS.REQUEST_ID,
        )
        const serviceComponent = ctx.request.http?.headers?.get(
          TRACING_HEADERS.SERVICE_COMPONENT,
        )

        // Try to get operation name from various sources
        const operationName =
          ctx.operation?.name?.value || ctx.request.operationName || 'Unknown'
        const duration = Date.now() - (ctx.contextValue?.startTime || 0)

        // Log all GraphQL calls
        if (operationId || requestId || serviceComponent) {
          const parts = [
            `[GraphQL] ${operationName}`,
            `Operation: ${operationId || 'unknown'}`,
            `Request: ${requestId || 'unknown'}`,
          ]

          if (serviceComponent) {
            parts.push(`Component: ${serviceComponent}`)
          }

          parts.push(`Duration: ${duration}ms`)

          console.log(parts.join(' | '))
        } else {
          console.log(`[GraphQL] ${operationName} | Duration: ${duration}ms`)
        }
      },

      async executionDidStart() {
        return {
          willResolveField({ info, contextValue }) {
            // Store start time on first field resolution
            if (!contextValue.startTime) {
              contextValue.startTime = Date.now()
            }
          },
        }
      },
    }
  },
}
