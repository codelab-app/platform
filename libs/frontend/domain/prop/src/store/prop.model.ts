import type {
  IInterfaceType,
  IProp,
  IPropData,
  IPropDTO,
  IResourceConfig,
} from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/domain/type'
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

const create = <TData extends IPropData>({
  id,
  data,
  api,
}: IPropDTO<TData>) => {
  return new Prop({
    id,
    data: frozen(data),
    api,
  })
}

@model('@codelab/Prop')
export class Prop<TData extends IPropData>
  extends Model(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    <TData extends IPropData>() => ({
      id: idProp,
      data: prop(() => frozen<Nullable<TData>>(null)),
      api: prop<Maybe<Ref<IInterfaceType>>>(),
    }),
  )<TData>
  implements IProp<TData>
{
  private silentData: IPropData = {}

  static create = create

  @modelAction
  writeCache({ id, data, api }: Partial<IPropDTO<TData>>) {
    this.data = data ? frozen<TData>(data) : this.data
    this.api = api ? typeRef<IInterfaceType>(api.id) : this.api

    return this
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  get values(): TData {
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
      }) as TData
    }

    return { ...this.data.data } as TData
  }

  @modelAction
  set(key: string, value: object) {
    const obj = set({}, key, value) as TData

    if (this.data.data) {
      this.data = frozen(mergeDeepRight(this.data.data, obj) as TData)
    }
  }

  // set data without re-rendering
  setSilently(key: string, value: object) {
    this.silentData[key] = value
  }

  @modelAction
  setMany(data: TData) {
    this.data = frozen<Nullable<TData>>(mergeProps(this.data.data, data))
  }

  @modelAction
  delete(key: string) {
    // Need to cast since deleting key changes the interface
    this.data = frozen(omit(this.data.data, key) as TData)
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
    return this.propService.add<TData>({
      id: v4(),
      data: this.values,
      api: this.api?.id
        ? (typeRef(this.api.id) as Ref<IInterfaceType>)
        : undefined,
    })
  }

  @computed
  get jsonString() {
    return propSafeStringify(this.values)
  }
}

export const propRef = rootRef<IProp<IPropData>>('@codelab/PropRef', {
  onResolvedValueChange: (ref, newProp, oldProp) => {
    if (oldProp && !newProp) {
      detach(ref)
    }
  },
})
