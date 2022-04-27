import { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { IAtomDTO } from '@codelab/shared/abstract/core'
import { MaybeArray } from '@codelab/shared/abstract/types'
import { print } from 'graphql'
import { CreateAtomsDocument } from '../../../../../libs/frontend/modules/atom/src/graphql/atom.endpoints.graphql.gen'

export const createAtom = (input: MaybeArray<AtomCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(CreateAtomsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createAtoms.atoms as Array<IAtomDTO>)
