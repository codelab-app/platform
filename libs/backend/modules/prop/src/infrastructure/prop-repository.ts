import {
  BaseRepository,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { IProp, PropSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { PropMutationFactory } from './prop-mutation.factory'
import { PropQueryFactory } from './prop-query.factory'
import { IPropRepository } from './props-repository.interface'

@Injectable()
export class PropRepository
  extends BaseRepository<IProp, PropQueryFactory, PropMutationFactory>
  implements IPropRepository
{
  constructor(protected dgraph: DgraphRepository) {
    super(
      dgraph,
      DgraphEntityType.Prop,
      new PropQueryFactory(),
      new PropMutationFactory(),
      PropSchema,
    )
  }
}
