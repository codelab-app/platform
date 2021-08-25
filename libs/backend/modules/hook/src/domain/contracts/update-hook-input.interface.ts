import { HookType } from '../enums'

export interface IUpdateHookInput {
  type: HookType
  data: Record<string, any>
}
