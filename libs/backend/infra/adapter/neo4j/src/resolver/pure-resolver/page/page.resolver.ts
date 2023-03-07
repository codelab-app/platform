import type { IResolvers } from '@graphql-tools/utils'
import { name } from '../app/field/app-name'
import { slug } from '../app/field/app-slug'

export const pageResolver: IResolvers = {
  Mutation: {},
  Page: {
    // Can re-use from app
    name,
    slug,
  },
  Query: {},
}
