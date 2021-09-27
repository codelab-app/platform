import {
  CreateComponentGql,
  GetComponentElementsGql,
} from '@codelab/frontend/modules/component'
import {
  CreateComponentInput,
  ElementGraph,
  GetComponentInput,
} from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

export const createComponent = (input: CreateComponentInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateComponentGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createComponent)
}

export const getComponentElements = (input: GetComponentInput) => {
  return cy
    .graphqlRequest({
      query: print(GetComponentElementsGql),
      variables: { input },
    })
    .then((r) => {
      return r.body.data?.getComponentElements
    })
}

export const getComponentRootElementId = ({ id }: { id: string }) => {
  return cy
    .getComponentElements({
      componentId: id,
    })
    .then((listComponentGraph: ElementGraph) => {
      const rootElId = listComponentGraph.vertices[0].id

      return rootElId
    })
}

Cypress.Commands.add('getComponentElements', getComponentElements)
Cypress.Commands.add('createComponent', createComponent)
Cypress.Commands.add('getComponentRootElementId', getComponentRootElementId)
