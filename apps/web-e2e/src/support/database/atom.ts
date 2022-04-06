import { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { IAtom } from '@codelab/shared/abstract/core'
import { MaybeArray } from '@codelab/shared/abstract/types'
import { print } from 'graphql'
import { E2eCreateAtomDocument } from './graphql/atom.endpoints.graphql.gen'

export const createAtom = (input: MaybeArray<AtomCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(E2eCreateAtomDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createAtoms.atoms as Array<IAtom>)
