import type {
  IAction,
  IAppDTO,
  IInterfaceType,
  IProp,
  IStore,
  IStoreDTO,
} from '@codelab/frontend/abstract/core'
import { IPropData } from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import { getByExpression } from '@codelab/frontend/shared/utils'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { mapDeep } from '@codelab/shared/utils'
import isString from 'lodash/isString'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const create = ({ id, name, api }: IStoreDTO) => {
  new Store({
    api: typeRef(api.id) as Ref<IInterfaceType>,
    id,
    name,
  })
}

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    actions: prop<Array<Ref<IAction>>>(() => []),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    id: idProp,
    name: prop<string>(),
    state: prop<IProp>(() => new Prop({})),
  }))
  implements IStore
{
  @modelAction
  writeCache({ id, name, api }: Partial<IStoreDTO>) {
    this.id = id ? id : this.id
    this.name = name ? name : this.name
    this.api = api ? (typeRef(api.id) as Ref<IInterfaceType>) : this.api

    return this
  }

  @modelAction
  public replaceStateInProps(
    props: IPropData,
    context: IPropData = this.state.values,
  ) {
    props = mapDeep(
      props,
      // value mapper
      (value, key) =>
        isString(value) ? getByExpression(value, context) : value,
      // key mapper
      (value, key) =>
        (isString(key) ? getByExpression(key, context) : key) as string,
    )

    return props
  }

  static create = create

  toCreateInput(): StoreCreateInput {
    const api = this.api.current

    return {
      api: {
        create: {
          node: api.toCreateInput(),
        },
      },
      id: this.id,
      name: this.name,
    }
  }

  toUpdateInput(): StoreUpdateInput {
    return { name: this.name }
  }

  toDeleteInput(): StoreDeleteInput {
    return {
      actions: {
        ApiAction: [{ where: {} }],
        CodeAction: [{ where: {} }],
      },
      api: { where: {} },
    }
  }

  static createName(app: Pick<IAppDTO, 'name'>) {
    return `${app.name} Store`
  }
}

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
