import { proxyMiddleware } from '@codelab/backend/infra/adapter/graphql'

export default proxyMiddleware

export const config = {
  maxDuration: 60,
}
