import type {
  IProp,
  IPropData,
  IPropDTO,
} from '@codelab/frontend/abstract/core'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import omit from 'lodash/omit'
import { computed } from 'mobx'
import { frozen, idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const hydrate = ({ id, data }: IPropDTO): IProp => {
  return new Prop({ id, data: frozen(JSON.parse(data)) })
}

@model('@codelab/Prop')
export class Prop
  extends Model({
    id: idProp,
    data: prop(() => frozen<IPropData>({})),
  })
  implements IProp
{
  @computed
  get values() {
    return { ...this.data.data }
  }

  @modelAction
  set(key: string, value: any) {
    this.data = frozen(mergeProps(this.data, { [key]: value }))
  }

  @modelAction
  delete(key: string) {
    this.data = frozen(omit(this.data, key))
  }

  get(key: string) {
    return this.values[key]
  }

  @modelAction
  clear() {
    this.data = frozen({})
  }

  static hydrate = hydrate

  @modelAction
  writeCache({ id, data }: IPropDTO) {
    this.id = id
    this.data = frozen(JSON.parse(data))

    return this
  }

  @computed
  get jsonString() {
    return propSafeStringify(this.values)
  }
}
