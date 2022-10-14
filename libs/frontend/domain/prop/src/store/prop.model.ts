import type {
  IInterfaceType,
  IProp,
  IPropData,
  IPropDTO,
} from '@codelab/frontend/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
// eslint-disable-next-line lodash/import-scope
import { difference, keys, values } from 'lodash'
import omit from 'lodash/omit'
import { computed } from 'mobx'
import {
  detach,
  frozen,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'

const hydrate = ({ id, data, apiRef }: IPropDTO): IProp => {
  return new Prop({
    id,
    data: frozen(JSON.parse(data)),
    api: apiRef,
  })
}

@model('@codelab/Prop')
export class Prop
  extends Model({
    id: idProp,
    data: prop(() => frozen<IPropData>({})),
    api: prop<Maybe<Ref<IInterfaceType>>>(),
  })
  implements IProp
{
  @computed
  get values() {
    // Filter out keys inside props that are not defined in the atom API
    // This is to prevent rendering props left over after deleting them from the atom API
    if (this.api) {
      const apiPropsMap = this.api.current.fields.items
      const apiPropsKeys = values(apiPropsMap).map((field) => field.key)
      const currentPropsKeys = keys(this.data.data)
      const keysToOmit = difference(currentPropsKeys, apiPropsKeys)

      keysToOmit.forEach((key) => this.delete(key))
    }

    return { ...this.data.data }
  }

  @modelAction
  set(key: string, value: object) {
    this.data = frozen(mergeProps(this.data.data, { [key]: value }))
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

export const propRef = rootRef<IProp>('@codelab/PropRef', {
  onResolvedValueChange(ref, newProp, oldProp) {
    if (oldProp && !newProp) {
      detach(ref)
    }
  },
})
