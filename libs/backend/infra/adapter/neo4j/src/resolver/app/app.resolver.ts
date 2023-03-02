import type { App } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import slugify from 'voca/slugify'
import { name } from './field/app-name'
import { slug } from './field/app-slug'

export const appResolver: IResolvers = {
  App: {
    name,
    slug,
  },
}
