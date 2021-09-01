import { HookType } from '@codelab/shared/enums'

export interface IUpdateHookInput {
  type: HookType
  data: Record<string, any>
}
