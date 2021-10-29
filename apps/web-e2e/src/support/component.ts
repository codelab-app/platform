import { CreateComponentInput } from '@codelab/frontend/abstract/codegen'
import {
  CreateComponentGql,
  ElementFragment,
  GetElementGraphGql,
} from '@codelab/frontend/modules/element'
import { GetElementGraphInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

export const createComponent = (input: CreateComponentInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateComponentGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createComponent as ElementFragment)
}

export const getElementGraph = (input: GetElementGraphInput) => {
  return cy
    .graphqlRequest({
      query: print(GetElementGraphGql),
      variables: { input },
    })
    .then((r) => {
      return r.body.data?.getElementGraph
    })
}

Cypress.Commands.add('getElementGraph', getElementGraph)
Cypress.Commands.add('createComponent', createComponent)
