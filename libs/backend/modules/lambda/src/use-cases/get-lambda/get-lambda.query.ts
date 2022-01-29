import { DgraphEntityType } from '@codelab/backend/abstract/core'

export const getLambdaQuery = (filter = '', queryName = 'query') => `{
  ${queryName}(func: type(${DgraphEntityType.Lambda})) ${filter} {
      id: uid
      expand(_all_)
  }
}`
