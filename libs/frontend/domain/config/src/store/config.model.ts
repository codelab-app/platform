import type { IConfig, IConfigDTO } from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const create = ({ app, id, name }: IConfigDTO) => {
  return new Config({
    app,
    id,
    name,
  })
}

@model('@codelab/Config')
export class Config
  extends Model({
    app: prop<IEntity>(),
    id: idProp,
    name: prop<string>(),
  })
  implements IConfig
{
  static create = create

  toCreateInput() {
    return {
      app: connectNodeId(this.app.id),
      id: this.id,
      name: this.name,
    }
  }

  toUpdateInput() {
    return {
      name: this.name,
    }
  }

  toDeleteInput() {
    return {}
  }

  @modelAction
  public writeCache({ app, id, name }: Partial<IConfigDTO>) {
    this.app = app ?? this.app
    this.name = name ?? this.name
    this.id = id ?? this.id

    return this
  }
}

export const configRef = rootRef<IConfig>('@codelab/ConfigRef', {
  onResolvedValueChange: (ref, newConfig, oldConfig) => {
    if (oldConfig && !newConfig) {
      detach(ref)
    }
  },
})
