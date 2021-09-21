import {
  CreateAtomGql,
  CreateAtomMutationVariables,
} from '@codelab/frontend/modules/atom'
import { print } from 'graphql'

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
