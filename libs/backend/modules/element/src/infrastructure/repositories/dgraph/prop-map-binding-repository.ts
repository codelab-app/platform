import {
  BaseRepository,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { PropMapBindingMutationFactory } from './prop-map-binding-mutation.factory'
import { PropMapBindingQueryFactory } from './prop-map-binding-query.factory'

@Injectable()
export class PropMapBindingRepository extends BaseRepository<
  IPropMapBinding,
  PropMapBindingQueryFactory,
  PropMapBindingMutationFactory
> {
  constructor(protected dgraph: DgraphRepository) {
    super(
      dgraph,
      DgraphEntityType.PropMapBinding,
      new PropMapBindingQueryFactory(),
      new PropMapBindingMutationFactory(),
    )
  }
}
