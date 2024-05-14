import { App } from '@codelab/backend/abstract/codegen'
import { AppProperties } from '@codelab/shared/domain'
import type { IResolvers } from '@graphql-tools/utils'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { appName } from './field/app-name'
import { appSlug } from './field/app-slug'

export const appResolver: IResolvers = {
  App: {
    name: appName,
    slug: appSlug,
  },
}
