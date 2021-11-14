import { HookType, IHookConfig } from '@codelab/shared/abstract/core'
import { ICreateHookInput, IUpdateHookInput } from './contracts'
import { parseHookConfig } from './hook-config'

/**
 * Hook hooks entity
 */
export class Hook {
  private readonly _id?: string

  private _type: HookType

  private _config: IHookConfig

  constructor({ id, type, config }: ICreateHookInput) {
    this._id = id
    this._type = type

    // Validate that the config is correct
    this._config = parseHookConfig(type, config)
  }

  get id(): string | undefined {
    return this._id
  }

  get type(): HookType {
    return this._type
  }

  get config(): IHookConfig {
    return this._config
  }

  update({ data, type }: IUpdateHookInput) {
    this._type = type

    // Validate that the config is correct
    this._config = parseHookConfig(type, data)
  }
}
