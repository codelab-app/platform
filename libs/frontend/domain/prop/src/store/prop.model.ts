import type { IInterfaceType, IProp } from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  IPropData,
  IPropDTO,
} from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/domain/type'
import type { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import get from 'lodash/get'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import set from 'lodash/set'
import values from 'lodash/values'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  frozen,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'
import { mergeDeepRight } from 'ramda'
import { v4 } from 'uuid'

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
  private silentData: IPropData = {}

  @computed
  get values() {
    if (this.apiRef?.maybeCurrent) {
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
    const obj = set({}, key, value)
    this.data = frozen(mergeDeepRight(this.data.data, obj))
  }

  // set data without re-rendering
  setSilently(key: string, value: object) {
    this.silentData[key] = value
  }

  @modelAction
  setMany(data: IPropData) {
    this.data = frozen(mergeProps(this.data.data, data))
  }

  @modelAction
  delete(key: string) {
    this.data = frozen(omit(this.data, key))
  }

  get(key: string) {
    return get(merge(this.values, this.silentData), key)
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

  @modelAction
  clone() {
    return Prop.hydrate({
      id: v4(),
      data: this.jsonString,
      apiRef: this.apiRef?.id
        ? (typeRef(this.apiRef.id) as Ref<IInterfaceType>)
        : undefined,
    })
  }

  @computed
  get jsonString() {
    return propSafeStringify(this.values)
  }
}

export const propRef = rootRef<IProp>('@codelab/PropRef', {
  onResolvedValueChange: (ref, newProp, oldProp) => {
    if (oldProp && !newProp) {
      detach(ref)
    }
  },
})
