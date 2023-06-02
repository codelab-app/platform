import type {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server'
import { logger } from '@codelab/shared/infra/logging'

export const BASIC_LOGGING: ApolloServerPlugin = {
  requestDidStart: (requestContext: GraphQLRequestContext<BaseContext>) => {
    return Promise.resolve()

    logger.info(
      `Processing request ${JSON.stringify(requestContext.request, null, 2)}`,
    )

    // logger.info(JSON.stringify(requestContext.req.query || {}, null, 2))
    // logger.info(JSON.stringify(requestContext.req.variables || {}, null, 2))

    const res: GraphQLRequestListener<BaseContext> = {
      willSendResponse: (
        context: GraphQLRequestContextWillSendResponse<BaseContext>,
      ) => {
        logger.info(
          `Responding request ${JSON.stringify(context.response, null, 2)}`,
        )

        return Promise.resolve()
      },
    }

    return Promise.resolve(res)
  },
}
