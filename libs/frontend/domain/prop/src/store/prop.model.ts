import {
  CUSTOM_TEXT_PROP_KEY,
  IInterfaceType,
  IProp,
  IPropData,
  IPropDTO,
} from '@codelab/frontend/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import values from 'lodash/values'
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
  return new Prop({ id, data: frozen(JSON.parse(data)), apiRef })
}

@model('@codelab/Prop')
export class Prop
  extends Model({
    id: idProp,
    data: prop(() => frozen<IPropData>({})),
    apiRef: prop<Maybe<Ref<IInterfaceType>>>(),
  })
  implements IProp
{
  @computed
  get values() {
    if (this.apiRef) {
      const apiPropsMap = this.apiRef.current.fields

      const apiPropsByKey = values(apiPropsMap)
        .map((propModel) => ({ [propModel.key]: propModel }))
        .reduce(merge, {})

      return omitBy(this.data.data, (_, key) => {
        // CUSTOM_TEXT_PROP_KEY is a special case, it's an element prop
        // that is not part of the api
        if (key === CUSTOM_TEXT_PROP_KEY) {
          return false
        }

        return !apiPropsByKey[key]
      })
    }

    return { ...this.data.data }
  }

  @modelAction
  set(key: string, value: object) {
    this.data = frozen(mergeProps(this.data.data, { [key]: value }))
  }

  @modelAction
  setMany(data: IPropData) {
    this.data = frozen(mergeProps(this.data.data, data))
  }

  @modelAction
  patch(data: IPropData) {
    this.data = frozen(data)
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
