import { CreateAtomGql, GetAtomGql } from '@codelab/frontend/modules/atom'
import { CreateAtomInput, GetAtomInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

export const createAtom = (input: CreateAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtom)
}

export const getAtom = (input: GetAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(GetAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.getAtom)
}

Cypress.Commands.add('createAtom', createAtom)
Cypress.Commands.add('getAtom', getAtom)
