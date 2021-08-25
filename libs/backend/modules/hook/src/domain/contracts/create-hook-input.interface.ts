import { HookType } from '../enums'

export interface ICreateHookInput {
  id?: string
  type: HookType
  config: Record<string, any>
}
