import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { elementPureResolver } from './element'

export const pureResolvers: IResolvers = mergeResolvers([elementPureResolver])
