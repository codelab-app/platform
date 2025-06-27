import type { ApolloServerPlugin, BaseContext } from '@apollo/server'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { TRACING_HEADERS } from '@codelab/shared-infra-tracing'
import { Injectable } from '@nestjs/common'

interface ServiceTrackingContext extends BaseContext {
  startTime?: number
}

/**
 * Creates an Apollo Server plugin for GraphQL operation tracking
 */
export const createGraphQLTrackingPlugin = (
  logger: PinoLoggerService,
): ApolloServerPlugin<ServiceTrackingContext> => {
  return {
    requestDidStart: async () => {
      return {
        executionDidStart: async () => {
          return {
            willResolveField: ({ contextValue }) => {
              // Store start time on first field resolution
              if (!contextValue.startTime) {
                contextValue.startTime = Date.now()
              }
            },
          }
        },

        willSendResponse: async (ctx) => {
          const operationId = ctx.request.http?.headers.get(
            TRACING_HEADERS.OPERATION_ID,
          )

          const requestId = ctx.request.http?.headers.get(
            TRACING_HEADERS.REQUEST_ID,
          )

          const serviceComponent = ctx.request.http?.headers.get(
            TRACING_HEADERS.SERVICE_COMPONENT,
          )

          // Try to get operation name from various sources
          const operationName =
            ctx.operation?.name?.value || ctx.request.operationName || 'unknown'

          const duration = Date.now() - (ctx.contextValue.startTime || 0)

          // Create namespace based on operation name
          const namespace = `graphql:${operationName
            .toLowerCase()
            .replace(/\s+/g, '-')}`

          // Log with appropriate level and data
          const logData = {
            duration,
            operationId: operationId || undefined,
            requestId: requestId || undefined,
            serviceComponent: serviceComponent || undefined,
          }

          logger.debug(`GraphQL operation executed in ${duration}ms`, {
            context: namespace,
            data: logData,
          })
        },
      }
    },
  }
}

/**
 * NestJS service that provides Apollo Server plugin for GraphQL operation tracking
 */
@Injectable()
export class GraphQLTrackingService {
  constructor(private readonly logger: PinoLoggerService) {}

  createPlugin(): ApolloServerPlugin<ServiceTrackingContext> {
    return createGraphQLTrackingPlugin(this.logger)
  }
}
