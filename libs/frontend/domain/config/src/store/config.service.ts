import type {
  IConfigDTO,
  ICreateConfigData,
  IUpdateConfigData,
} from '@codelab/frontend/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { ConfigRepository } from '../services'
import { Config } from './config.model'

@model('@codelab/ConfigService')
export class ConfigService extends Model({
  configRepository: prop(() => new ConfigRepository({})),
  configs: prop(() => objectMap<Config>()),
}) {
  @modelFlow
  add = (config: IConfigDTO) => {
    let configModel = this.configs.get(config.id)

    configModel = configModel
      ? configModel.writeCache(config)
      : Config.create(config)

    this.configs.set(config.id, configModel)

    return configModel
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: ConfigService,
    configData: ICreateConfigData,
  ) {
    const config = this.add(configData)

    yield* _await(this.configRepository.add(config))

    return config
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ConfigService,
    { id, name }: IUpdateConfigData,
  ) {
    const config = this.configs.get(id)!

    config.writeCache({ name })

    yield* _await(this.configRepository.update(config))

    return config
  })
}
