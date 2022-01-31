import {
  DgraphEntityType,
  IPropRepository,
} from '@codelab/backend/abstract/core'
import { BaseRepository } from '@codelab/backend/infra'
import { IProp, PropSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { PropMutationFactory } from './prop-mutation.factory'
import { PropQueryFactory } from './prop-query.factory'

@Injectable()
export class PropRepository
  extends BaseRepository<IProp>
  implements IPropRepository
{
  protected readonly entityType = DgraphEntityType.Prop

  protected readonly queryFactory = new PropQueryFactory()

  protected readonly mutationFactory = new PropMutationFactory()

  protected readonly schema = PropSchema
}
