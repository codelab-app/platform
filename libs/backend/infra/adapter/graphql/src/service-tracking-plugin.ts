import type { ApolloServerPlugin } from '@apollo/server'

/**
 * Apollo Server plugin to log service tracking headers
 */
export const serviceTrackingPlugin: ApolloServerPlugin<any> = {
  async requestDidStart() {
    return {
      async willSendResponse(ctx) {
        const serviceId = ctx.request.http?.headers?.get('x-service-id')
        const requestId = ctx.request.http?.headers?.get('x-request-id')
        
        // Try to get operation name from various sources
        const operationName = ctx.operation?.name?.value || ctx.request.operationName || 'Anonymous'
        const duration = Date.now() - (ctx.contextValue?.startTime || 0)
        
        // Log all GraphQL calls
        if (serviceId || requestId) {
          console.log(
            `[GraphQL] ${operationName} | Service: ${serviceId || 'unknown'} | Request: ${requestId || 'unknown'} | Duration: ${duration}ms`
          )
        } else {
          console.log(
            `[GraphQL] ${operationName} | Duration: ${duration}ms`
          )
        }
      },

      async executionDidStart() {
        return {
          willResolveField({ info, contextValue }) {
            // Store start time on first field resolution
            if (!contextValue.startTime) {
              contextValue.startTime = Date.now()
            }
          }
        }
      }
    }
  },
}