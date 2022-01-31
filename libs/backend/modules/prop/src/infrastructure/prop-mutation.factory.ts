import { DgraphEntityType } from '@codelab/backend/abstract/core'
import { BaseMutationFactory, NullablePredicates } from '@codelab/backend/infra'
import { IProp } from '@codelab/shared/abstract/core'

// The prop entity is simple, no need for custom mutations, the default ones will do the job
export class PropMutationFactory extends BaseMutationFactory<IProp> {
  public readonly entityType = DgraphEntityType.Prop

  public readonly nullablePredicates: NullablePredicates<IProp> = []
}
