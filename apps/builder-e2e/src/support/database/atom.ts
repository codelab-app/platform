import { IAtomDTO } from '@codelab/frontend/abstract/core'
import { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { MaybeArray } from '@codelab/shared/abstract/types'
import { print } from 'graphql'
import { CreateAtomsDocument } from 'libs/frontend/domain/atom/src/graphql/atom.endpoints.graphql.gen'

export const createAtomRequestId = 'CreateAtom'

export const createAtom = (input: MaybeArray<AtomCreateInput>) =>
  cy
    .graphqlRequest(
      {
        query: print(CreateAtomsDocument),
        variables: { input },
      },
      createAtomRequestId,
    )
    .then((result) => result.body.data?.createAtoms.atoms as Array<IAtomDTO>)
