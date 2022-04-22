import { IProp, IPropData, IPropDTO } from '@codelab/shared/abstract/core'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { computed } from 'mobx'
import { frozen, idProp, Model, model, modelAction, prop } from 'mobx-keystone'

@model('@codelab/Prop')
export class Prop
  extends Model({
    id: idProp,
    data: prop(() => frozen<IPropData>({})),
  })
  implements IProp
{
  @computed
  get propsData() {
    return { ...this.data.data }
  }

  @modelAction
  set(key: string, value: any) {
    this.data = frozen(mergeProps(this.data, { [key]: value }))
  }

  get(key: string) {
    return this.propsData[key]
  }

  @modelAction
  clear() {
    this.data = frozen({})
  }

  @modelAction
  updateCache({ id, data }: IPropDTO) {
    this.id = id
    this.data = frozen(JSON.parse(data))
  }

  public static hydrate({ id, data }: IPropDTO): Prop {
    return new Prop({ id, data: frozen(JSON.parse(data)) })
  }

  @computed
  get jsonString() {
    return propSafeStringify(this.propsData)
  }
}
