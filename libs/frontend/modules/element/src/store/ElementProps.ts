import { PropsData } from '@codelab/shared/abstract/core'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { frozen, idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { Frozen } from 'mobx-keystone/src/frozen/Frozen'
import { PropFragment } from '../graphql/Element.fragment.v2.1.graphql.gen'

@model('@codelab/ElementProps')
export class ElementProps extends Model({
  id: idProp,
  // freeze the data object to make it immutable.
  // The actual data is in data.data, because the Frozen class keeps the data in its own data property
  data: prop<Frozen<PropsData>>(() => frozen({})).withSetter(),
}) {
  get propsData() {
    return this.data.data
  }

  @modelAction
  set(key: string, value: any) {
    this.data = frozen(mergeProps(this.propsData, { [key]: value }))
  }

  @modelAction
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

  toJsonString() {
    return propSafeStringify(this.propsData)
  }
}
