import {
  CreateElementGql,
  CreatePropMapBindingGql,
} from '@codelab/frontend/modules/element'
import {
  CreateElementInput,
  CreatePropMapBindingInput,
} from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

export const createElement = (input: CreateElementInput) =>
  cy
    .graphqlRequest({
      query: print(CreateElementGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createElement)

export const createPropBinding = (input: CreatePropMapBindingInput) =>
  cy
    .graphqlRequest({
      query: print(CreatePropMapBindingGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createPropMapBinding)

Cypress.Commands.add('createElement', createElement)
Cypress.Commands.add('createPropBinding', createPropBinding)
