import {
  TestElementFragment,
  TestElementGraphFragment,
} from '@codelab/backend/modules/element'
import { CreateComponentInput } from '@codelab/frontend/abstract/codegen'
import { GetElementGraphInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'
import { E2eCreateComponentGql } from '../graphql/component.api.graphql.gen'
import { E2eGetElementGraphGql } from '../graphql/element.api.graphql.gen'

export const createComponent = (input: CreateComponentInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateComponentGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createComponent as TestElementFragment)
}

export const getElementGraph = (input: GetElementGraphInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eGetElementGraphGql),
      variables: { input },
    })
    .then((r) => {
      return r.body.data?.getElementGraph as TestElementGraphFragment
    })
}

Cypress.Commands.add('getElementGraph', getElementGraph)
Cypress.Commands.add('createComponent', createComponent)
