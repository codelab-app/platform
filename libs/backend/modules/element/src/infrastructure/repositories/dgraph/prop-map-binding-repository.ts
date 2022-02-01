import { DgraphEntityType } from '@codelab/backend/abstract/core'
import { BaseRepository, DgraphRepository } from '@codelab/backend/infra'
import {
  IPropMapBinding,
  PropMapBindingSchema,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { PropMapBindingMutationFactory } from './prop-map-binding-mutation.factory'
import { PropMapBindingQueryFactory } from './prop-map-binding-query.factory'

@Injectable()
export class PropMapBindingRepository extends BaseRepository<IPropMapBinding> {
  protected readonly entityType = DgraphEntityType.PropMapBinding

  protected readonly queryFactory = new PropMapBindingQueryFactory()

  protected readonly mutationFactory = new PropMapBindingMutationFactory()

  protected readonly schema = PropMapBindingSchema

  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }
}
