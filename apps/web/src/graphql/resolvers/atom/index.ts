import { IResolvers } from '@graphql-tools/utils'
import { adminResolvers } from './admin.resolvers'
import { atomResolvers } from './atom.resolvers'
import { componentResolvers } from './component.resolvers'
import { elementResolvers } from './element.resolvers'
import { fieldResolvers } from './field/field.resolvers'
import { pageResolvers } from './page.resolvers'

export const mutationResolvers: IResolvers = {
  ...adminResolvers,
  ...atomResolvers,
  ...fieldResolvers,
  ...elementResolvers,
  ...pageResolvers,
  ...componentResolvers,
}
