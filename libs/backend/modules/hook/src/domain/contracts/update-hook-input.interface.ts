import { HookType } from '@codelab/shared/abstract/core'

export interface IUpdateHookInput {
  type: HookType
  data: Record<string, any>
}
