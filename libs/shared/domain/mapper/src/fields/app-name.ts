import type { App } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'

export const appName = (app: Pick<App, '_compositeKey' | 'owner'>) => {
  return app._compositeKey.replace(`${app.owner.auth0Id}-`, '')
}
