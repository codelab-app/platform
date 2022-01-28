import {
  DgraphEntityType,
  IHookRepository,
} from '@codelab/backend/abstract/core'
import { BaseRepository, DgraphRepository } from '@codelab/backend/infra'
import { IHook } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { HookMutationFactory } from './hook-mutation.factory'
import { HookQueryFactory } from './hook-query.factory'

@Injectable()
export class HookRepository
  extends BaseRepository<IHook, HookQueryFactory, HookMutationFactory>
  implements IHookRepository
{
  constructor(protected dgraph: DgraphRepository) {
    super(
      dgraph,
      DgraphEntityType.Hook,
      new HookQueryFactory(),
      new HookMutationFactory(),
    )
  }
}
