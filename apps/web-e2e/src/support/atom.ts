import {
  CreateAtomInput,
  GetAtomInput,
} from '@codelab/frontend/abstract/codegen'
import type {
  AtomBaseFragment,
  AtomFragment,
} from '@codelab/frontend/modules/atom'
import { print } from 'graphql'
import {
  E2eCreateAtomGql,
  E2eGetAtomGql,
} from '../graphql/atom.api.graphql.gen'

export const createAtom = (input: CreateAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtom as AtomBaseFragment)
}

export const getAtom = (input: GetAtomInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eGetAtomGql),
      variables: { input },
    })
    .then((r) => r.body.data?.getAtom as AtomFragment)
}

Cypress.Commands.add('createAtom', createAtom)
Cypress.Commands.add('getAtom', getAtom)
