import { print } from 'graphql'
import {
  CreateAtomGql,
  CreateAtomMutationVariables,
} from './graphql/CreateAtom.api.graphql.gen'

type CreateAtomInput = CreateAtomMutationVariables['input']

export const createAtom = (input: CreateAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtom)
}

Cypress.Commands.add('createAtom', createAtom)
