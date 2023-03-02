import type { Page } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import slugify from 'voca/slugify'
import { name } from '../app/field/app-name'
import { slug } from '../app/field/app-slug'

export const pageResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Page: {
    // Can re-use from app
    slug,
    name,
  },
}
