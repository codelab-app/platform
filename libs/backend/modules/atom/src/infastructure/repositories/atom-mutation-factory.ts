import {
  DgraphEntityType,
  IMutationFactory,
} from '@codelab/backend/abstract/core'
import {
  BaseMutationFactory,
  mergeMutations,
  NullablePredicates,
  randomBlankNode,
} from '@codelab/backend/infra'
import { IAtom } from '@codelab/shared/abstract/core'
import { Mutation } from 'dgraph-js-http'

export class AtomMutationFactory
  extends BaseMutationFactory<IAtom>
  implements IMutationFactory<IAtom>
{
  readonly entityType = DgraphEntityType.Atom

  protected readonly nullablePredicates: NullablePredicates<IAtom> = []

  forCreate(entity: IAtom, uid?: string): Mutation {
    uid = uid || randomBlankNode()

    return {
      setJson: {
        uid: uid,
        'dgraph.type': [DgraphEntityType.Atom],
        atomType: entity.type,
        name: entity.name,
        api: { uid: entity.api.id },
      },
    }
  }

  forUpdate(entity: IAtom, oldEntity: IAtom): Mutation {
    const base = super.forUpdate(entity, oldEntity)

    if (entity.api.id !== oldEntity.api.id) {
      return mergeMutations(base, {
        deleteJson: {
          uid: oldEntity.id,
          api: { uid: oldEntity.api.id },
        },
      })
    }

    return base
  }
}
