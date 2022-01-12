import {
  BaseRepository,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { IHook } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { HookMutationFactory } from './hook-mutation.factory'
import { HookQueryFactory } from './hook-query.factory'
import { IHookRepository } from './hook-repository.interface'

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
