import {
  CreateComponentInput,
  ElementGraph,
} from '@codelab/frontend/abstract/codegen'
import {
  CreateComponentGql,
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
    .then((r) => r.body.data?.createComponent)
}

export const getComponentElements = (input: GetElementGraphInput) => {
  return cy
    .graphqlRequest({
      query: print(GetElementGraphGql),
      variables: { input },
    })
    .then((r) => {
      return r.body.data?.getComponentElements
    })
}

export const getComponentRootElementId = ({ id }: { id: string }) => {
  return cy
    .getComponentElements({
      where: {
        id,
      },
    })
    .then((listComponentGraph: ElementGraph) => {
      const rootElId = listComponentGraph.vertices[0].id

      return rootElId
    })
}

Cypress.Commands.add('getComponentElements', getComponentElements)
Cypress.Commands.add('createComponent', createComponent)
Cypress.Commands.add('getComponentRootElementId', getComponentRootElementId)
