import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import type { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { CreateAtomsDocument } from 'libs/frontend/domain/atom/src/graphql/atom.endpoints.graphql.gen'
import type { ArrayOrSingle } from 'ts-essentials'

export const createAtomRequestId = 'CreateAtom'

export const createAtom = (input: ArrayOrSingle<AtomCreateInput>) =>
  cy
    .graphqlRequest(
      {
        query: print(CreateAtomsDocument),
        variables: { input },
      },
      createAtomRequestId,
    )
    .then((result) => result.body.data?.createAtoms.atoms as Array<IAtomDTO>)
