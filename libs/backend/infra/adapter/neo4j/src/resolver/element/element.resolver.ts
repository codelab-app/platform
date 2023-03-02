import type { Element } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import type { Node, Transaction } from 'neo4j-driver'
import slugify from 'voca/slugify'
import { getDescendantsCypher } from '../../cypher'
import { getDriver, Repository, withReadTransaction } from '../../infra'
import { elementSelectionSet } from '../../selectionSet'
import { descendantElementsFieldResolver } from './field/descedant-elements'
import { renderType } from './field/render-type'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Element: {
    descendantElements: descendantElementsFieldResolver,
    renderType,
  },
}
