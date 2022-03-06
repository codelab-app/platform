import { AtomCreateInput, AtomWhere } from '@codelab/shared/abstract/codegen-v2'
import { IAtom } from '@codelab/shared/abstract/core'
import { MaybeArray } from '@codelab/shared/abstract/types'
import { print } from 'graphql'
import {
  E2eCreateAtomDocument,
  E2eGetAtomsDocument,
} from '../graphql/atom.api.v2.1.graphql.gen'

export const createAtom = (input: MaybeArray<AtomCreateInput>) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateAtomDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtoms.atoms as Array<IAtom>)
}

export const getAtoms = (where: AtomWhere) => {
  return cy
    .graphqlRequest({
      query: print(E2eGetAtomsDocument),
      variables: { where },
    })
    .then((r) => r.body.data?.atoms as Array<IAtom>)
}

Cypress.Commands.add('createAtom', createAtom)
Cypress.Commands.add('getAtom', getAtoms)
