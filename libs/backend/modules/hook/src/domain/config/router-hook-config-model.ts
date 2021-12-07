import {
  HookDiscriminator,
  IRouterHookConfig,
} from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'

@ObjectType(HookDiscriminator.RouterHookConfig)
export class RouterHookConfig implements IRouterHookConfig {}
