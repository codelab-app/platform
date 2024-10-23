import type {
  IInterfaceTypeModel,
  IPropModel,
} from '@codelab/frontend/abstract/domain'
import type { IPropDto } from '@codelab/shared/abstract/core'
import type { Nullable, ObjectLike } from '@codelab/shared/abstract/types'
import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import { typeRef } from '@codelab/frontend/abstract/domain'
import { IPropData } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  clone,
  frozen,
  idProp,
  Model,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'
import {
  hasSubObject,
  isNullish,
  mergeDeep,
  omit,
  omitBy,
  prop as rProp,
  values,
} from 'remeda'

import { mergeProps } from '../utils/merge-props'
import { propSafeStringify } from '../utils/prop-safe-stringify'

const create = ({ api, data, id }: IPropDto) => {
  return new Prop({
    api: api ? typeRef<IInterfaceTypeModel>(api.id) : null,
    data: frozen(data),
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
        .reduce<IPropData>((acc, cur) => mergeDeep(acc, cur), {})

      return omitBy(this.data.data ?? {}, (_, key) => {
        return !apiPropsByKey[key as keyof typeof apiPropsByKey]
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
    this.data = frozen(omit(this.data.data ?? {}, [key as keyof IPropData]))
  }

  @modelAction
  set(key: string, value: boolean | string | ObjectLike) {
    const obj = { [key]: value }

    this.data = frozen(mergeDeep(this.data.data ?? {}, obj))
  }

  @modelAction
  setMany(data: IPropData) {
    // This prevents re-renders caused by setting props with the same values
    const shouldChangeProp =
      isNullish(this.data.data) || !hasSubObject(this.data.data, data)

    if (shouldChangeProp) {
      this.data = frozen(mergeProps(this.data.data ?? {}, data))
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
    return rProp(this.values, key)
  }
}
