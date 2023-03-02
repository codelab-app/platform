import type {
  IInterfaceType,
  IProp,
  IPropDTO,
} from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/domain/type'
import type { PropCreateInput } from '@codelab/shared/abstract/codegen'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
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
import { getPropService } from './prop.service'

const create = ({ id, data = '{}', api }: IPropDTO) => {
  return new Prop({
    id,
    data: frozen(JSON.parse(data)),
    api,
  })
}

@model('@codelab/Prop')
export class Prop
  extends Model({
    id: idProp,
    data: prop(() => frozen<Nullable<IPropData>>(null)),
    api: prop<Maybe<Ref<IInterfaceType>>>(),
  })
  implements IProp
{
  private silentData: IPropData = {}

  static create = create

  @modelAction
  writeCache({ id, data, api }: Partial<IPropDTO>) {
    this.data = data ? frozen(JSON.parse(data)) : this.data
    this.api = api ? typeRef<IInterfaceType>(api.id) : this.api

    return this
  }

  toCreateInput(): PropCreateInput {
    return {
      data: JSON.stringify(this.data.data ?? {}),
    }
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  get values() {
    if (this.api?.maybeCurrent) {
      const apiPropsMap = this.api.current.fields

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
  set(key: string, value: object | string) {
    const obj = set({}, key, value)

    if (this.data.data) {
      this.data = frozen(mergeDeepRight(this.data.data, obj))
    }
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
    // Need to cast since deleting key changes the interface
    this.data = frozen(omit(this.data.data, key))
  }

  get(key: string) {
    return get(merge(this.values, this.silentData), key)
  }

  @modelAction
  clear() {
    this.data = frozen(null)
  }

  @modelAction
  clone() {
    return this.propService.add({
      id: v4(),
      data: this.jsonString,
      api: this.api?.id ? typeRef<IInterfaceType>(this.api.id) : undefined,
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
