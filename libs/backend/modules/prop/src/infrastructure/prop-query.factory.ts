import { BaseQueryFactory, DgraphEntityType } from '@codelab/backend/infra'

// The prop entity is simple, no need for custom queries, the default ones will do the job
export class PropQueryFactory extends BaseQueryFactory {
  constructor() {
    super(DgraphEntityType.Prop)
  }
}
