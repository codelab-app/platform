import { CreateAtomGql } from '@codelab/frontend/modules/atom'
import { CreateAtomInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

export const createAtom = (input: CreateAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtom)
}

Cypress.Commands.add('createAtom', createAtom)
