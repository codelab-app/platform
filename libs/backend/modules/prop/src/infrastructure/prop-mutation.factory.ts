import { BaseMutationFactory, DgraphEntityType } from '@codelab/backend/infra'
import { IProp } from '@codelab/shared/abstract/core'

// The prop entity is simple, no need for custom mutations, the default ones will do the job
export class PropMutationFactory extends BaseMutationFactory<IProp> {
  constructor() {
    super(DgraphEntityType.Prop, []) // Edit this if any of the prop fields are nullable
  }
}
