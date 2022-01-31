import {
  DgraphEntityType,
  IHookRepository,
} from '@codelab/backend/abstract/core'
import { BaseRepository } from '@codelab/backend/infra'
import { HookSchema, IHook } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { HookMutationFactory } from './hook-mutation.factory'
import { HookQueryFactory } from './hook-query.factory'

@Injectable()
export class HookRepository
  extends BaseRepository<IHook>
  implements IHookRepository
{
  protected readonly entityType = DgraphEntityType.Hook

  protected readonly queryFactory = new HookQueryFactory()

  protected readonly mutationFactory = new HookMutationFactory()

  protected readonly schema = HookSchema
}
