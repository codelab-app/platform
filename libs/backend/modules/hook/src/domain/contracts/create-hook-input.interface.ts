import { HookType } from '@codelab/shared/enums'

export interface ICreateHookInput {
  id?: string
  type: HookType
  config: Record<string, any>
}
