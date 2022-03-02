import { AtomCreateInput, AtomWhere } from '@codelab/shared/abstract/codegen-v2'
import { IAtom } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { E2eGetAtomsDocument } from '../graphql/atom.api.v2.1.graphql.gen'
import { E2eCreateElementDocument } from '../graphql/element.api.v2.1.graphql.gen'

export const createAtom = (input: AtomCreateInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateElementDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtoms as Array<IAtom>)
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
