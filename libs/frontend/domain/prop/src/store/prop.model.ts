import type {
  IInterfaceTypeModel,
  IPropModel,
} from '@codelab/frontend/abstract/domain'
import { typeRef } from '@codelab/frontend/abstract/domain'
import type { IPropDto } from '@codelab/shared/abstract/core'
import { IPropData } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/infra/gql'
import get from 'lodash/get'
import isMatch from 'lodash/isMatch'
import isNil from 'lodash/isNil'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import set from 'lodash/set'
import values from 'lodash/values'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  clone,
  frozen,
  idProp,
  Model,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'
import { mergeDeepRight } from 'ramda'
import { mergeProps } from '../utils/merge-props'
import { propSafeStringify } from '../utils/prop-safe-stringify'

const create = ({ api, data = '{}', id }: IPropDto) => {
  return new Prop({
    api: api ? typeRef<IInterfaceTypeModel>(api.id) : null,
    data: frozen(JSON.parse(data)),
    id,
  })
}

@model('@codelab/Prop')
export class Prop
  extends Model({
    api: prop<Nullable<Ref<IInterfaceTypeModel>>>(null),
    data: prop(() => frozen<Nullable<IPropData>>(null)),
    id: idProp,
  })
  implements IPropModel
{
  static create = create

  @computed
  get jsonString() {
    return propSafeStringify(this.values)
  }

  @computed
  get toJson() {
    return {
      api: this.api?.maybeCurrent,
      data: JSON.stringify(this.data.data),
      id: this.id,
    }
  }

  @computed
  get values() {
    if (this.api?.maybeCurrent) {
      const apiPropsMap = this.api.current.fields

      const apiPropsByKey = values(apiPropsMap)
        .map((propModel) => ({ [propModel.key]: propModel }))
        .reduce(merge, {})

      return omitBy(this.data.data, (_, key) => {
        return !apiPropsByKey[key]
      })
    }

    return { ...this.data.data }
  }

  @modelAction
  clear() {
    this.data = frozen(null)
  }

  @modelAction
  clone() {
    return clone(this)
  }

  @modelAction
  delete(key: string) {
    // Need to cast since deleting key changes the interface
    this.data = frozen(omit(this.data.data, key))
  }

  @modelAction
  set(key: string, value: boolean | object | string) {
    const obj = set({}, key, value)

    this.data = frozen(mergeDeepRight(this.data.data ?? {}, obj))
  }

  @modelAction
  setMany(data: IPropData) {
    // This prevents re-renders caused by setting props with the same values
    const shouldChangeProp =
      isNil(this.data.data) || !isMatch(this.data.data, data)

    if (shouldChangeProp) {
      this.data = frozen(mergeProps(this.data.data, data))
    }
  }

  @modelAction
  writeCache({ api, data, id }: Partial<IPropDto>) {
    this.id = id ?? this.id
    this.data = data ? frozen(JSON.parse(data)) : this.data
    this.api = api ? typeRef<IInterfaceTypeModel>(api.id) : this.api

    return this
  }

  get(key: string) {
    return get(this.values, key)
  }

  toCreateInput(): PropCreateInput {
    return {
      data: JSON.stringify(this.data.data ?? {}),
      id: this.id,
    }
  }

  toUpdateInput(): PropUpdateInput {
    return {
      data: JSON.stringify(this.data.data ?? {}),
    }
  }
}
