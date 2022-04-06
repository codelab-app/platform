import { PropsData } from '@codelab/shared/abstract/core'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { computed } from 'mobx'
import { frozen, idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { PropFragment } from '../graphql/element.fragment.v2.1.graphql.gen'

@model('@codelab/ElementProps')
export class ElementProps extends Model({
  id: idProp,
  data: prop(() => frozen<PropsData>({})),
}) {
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
  updateFromFragment({ id, data }: PropFragment) {
    this.id = id
    this.data = frozen(JSON.parse(data))
  }

  public static fromFragment({ id, data }: PropFragment): ElementProps {
    return new ElementProps({ id, data: frozen(JSON.parse(data)) })
  }

  @computed
  get jsonString() {
    return propSafeStringify(this.propsData)
  }
}
