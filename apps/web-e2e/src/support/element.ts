import { print } from 'graphql'
import {
  CreateElementGql,
  CreateElementMutationVariables,
} from './graphql/CreateElement.api.graphql.gen'
import {
  CreatePropMapBindingGql,
  CreatePropMapBindingMutationVariables,
} from './graphql/CreatePropMapBinding.api.graphql.gen'

type CreateElementInput = CreateElementMutationVariables['input']

export const createElement = (input: CreateElementInput) =>
  cy
    .graphqlRequest({
      query: print(CreateElementGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createElement)

type CreatePropMapBindingInput = CreatePropMapBindingMutationVariables['input']

export const createPropBinding = (input: CreatePropMapBindingInput) =>
  cy
    .graphqlRequest({
      query: print(CreatePropMapBindingGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createPropMapBinding)

Cypress.Commands.add('createElement', createElement)
Cypress.Commands.add('createPropBinding', createPropBinding)
