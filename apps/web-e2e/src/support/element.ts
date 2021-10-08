import {
  CreateElementInput,
  CreatePropMapBindingInput,
  UpdateElementPropsInput,
} from '@codelab/frontend/abstract/codegen'
import {
  CreateElementGql,
  CreatePropMapBindingGql,
  UpdateElementPropsGql,
} from '@codelab/frontend/modules/element'
import { print } from 'graphql'

export const createElement = (input: CreateElementInput) =>
  cy
    .graphqlRequest({
      query: print(CreateElementGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createElement)

export const updateElementProps = (input: UpdateElementPropsInput) =>
  cy
    .graphqlRequest({
      query: print(UpdateElementPropsGql),
      variables: { input },
    })
    .then((r) => r.body.data?.updateElementProps)

export const createPropBinding = (input: CreatePropMapBindingInput) =>
  cy
    .graphqlRequest({
      query: print(CreatePropMapBindingGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createPropMapBinding)

Cypress.Commands.add('createElement', createElement)
Cypress.Commands.add('createPropBinding', createPropBinding)
Cypress.Commands.add('updateElementProps', updateElementProps)
