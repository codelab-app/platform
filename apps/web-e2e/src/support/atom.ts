import {
  CreateAtomInput,
  GetAtomInput,
} from '@codelab/frontend/abstract/codegen'
import {
  AtomBaseFragment,
  AtomFragment,
  CreateAtomGql,
  GetAtomGql,
} from '@codelab/frontend/modules/atom'
import { print } from 'graphql'

export const createAtom = (input: CreateAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtom as AtomBaseFragment)
}

export const getAtom = (input: GetAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(GetAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.getAtom as AtomFragment)
}

Cypress.Commands.add('createAtom', createAtom)
Cypress.Commands.add('getAtom', getAtom)
