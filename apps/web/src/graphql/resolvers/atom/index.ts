import { IResolvers } from '@graphql-tools/utils'
import { atomResolvers } from './atom.resolvers'
import { componentResolvers } from './component.resolvers'
import { elementResolvers } from './element.resolvers'
import { pageResolvers } from './page.resolvers'

export const mutationResolvers: IResolvers = {
  ...atomResolvers,
  ...elementResolvers,
  ...pageResolvers,
  ...componentResolvers,
}
