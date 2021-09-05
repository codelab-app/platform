import { HookType } from '@codelab/shared/abstract/core'

export interface ICreateHookInput {
  id?: string
  type: HookType
  config: Record<string, any>
}
