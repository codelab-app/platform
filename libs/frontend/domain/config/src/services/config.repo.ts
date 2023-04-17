import type {
  IConfig,
  IConfigRepository,
} from '@codelab/frontend/abstract/core'
import type { ConfigWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { configApis } from '../store'

@model('@codelab/ConfigRepository')
export class ConfigRepository extends Model({}) implements IConfigRepository {
  @modelFlow
  add = _async(function* (this: ConfigRepository, config: IConfig) {
    const {
      createConfigs: { configs },
    } = yield* _await(
      configApis.CreateConfigs({
        input: config.toCreateInput(),
      }),
    )

    return configs[0]!
  })

  @modelFlow
  update = _async(function* (this: ConfigRepository, config: IConfig) {
    const {
      updateConfigs: { configs },
    } = yield* _await(
      configApis.UpdateConfigs({
        update: config.toUpdateInput(),
        where: { id: config.id },
      }),
    )

    return configs[0]!
  })

  @modelFlow
  find = _async(function* (this: ConfigRepository, where: ConfigWhere) {
    const { configs } = yield* _await(configApis.GetConfigs({ where }))

    return configs
  })

  @modelFlow
  delete = _async(function* (this: ConfigRepository, configs: Array<IConfig>) {
    const {
      deleteConfigs: { nodesDeleted },
    } = yield* _await(
      configApis.DeleteConfigs({
        where: {
          id_IN: configs.map((config) => config.id),
        },
      }),
    )

    return nodesDeleted
  })
}
