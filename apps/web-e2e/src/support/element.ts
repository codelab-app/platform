import type { TestElementFragment } from '@codelab/backend/modules/element'
import {
  CreateElementInput,
  CreatePropMapBindingInput,
  UpdateElementPropsInput,
} from '@codelab/frontend/abstract/codegen'
import { UpdateElementInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'
import {
  E2eCreateElementGql,
  E2eCreatePropMapBindingGql,
  E2eUpdateElementGql,
  E2eUpdateElementPropsGql,
} from '../graphql/element.api.graphql.gen'

export const createElement = (input: CreateElementInput) =>
  cy
    .graphqlRequest({
      query: print(E2eCreateElementGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createElement)

export const updateElementProps = (input: UpdateElementPropsInput) =>
  cy
    .graphqlRequest({
      query: print(E2eUpdateElementPropsGql),
      variables: { input },
    })
    .then((r) => r.body.data?.updateElementProps)

export const updateElement = (input: UpdateElementInput) =>
  cy
    .graphqlRequest({
      query: print(E2eUpdateElementGql),
      variables: { input },
    })
    .then((r) => r.body.data?.updateElement as TestElementFragment)

export const createPropBinding = (input: CreatePropMapBindingInput) =>
  cy
    .graphqlRequest({
      query: print(E2eCreatePropMapBindingGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createPropMapBinding)

Cypress.Commands.add('createElement', createElement)
Cypress.Commands.add('createPropBinding', createPropBinding)
Cypress.Commands.add('updateElementProps', updateElementProps)
Cypress.Commands.add('updateElement', updateElement)
