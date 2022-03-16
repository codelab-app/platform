import {
  AtomCreateInput,
  ImportAtomsInput,
} from '@codelab/shared/abstract/codegen-v2'
import { IAtom } from '@codelab/shared/abstract/core'
import { EntityLike, MaybeArray } from '@codelab/shared/abstract/types'
import { print } from 'graphql'
import {
  E2eCreateAtomDocument,
  E2eImportAtomsDocument,
} from './graphql/atom.api.v2.1.graphql.gen'

export const createAtom = (input: MaybeArray<AtomCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(E2eCreateAtomDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtoms.atoms as Array<IAtom>)

export const importAtoms = (input: ImportAtomsInput) =>
  cy
    .graphqlRequest({
      query: print(E2eImportAtomsDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.importAtoms.atoms as Array<EntityLike>)
