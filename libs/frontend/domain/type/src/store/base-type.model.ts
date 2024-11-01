import type { IBaseTypeDto, ITypeKind } from '@codelab/shared/abstract/core'

import {
  getUserDomainService,
  type IBaseTypeModel,
  ITypeTransformContext,
  IUserModel,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import {
  connectOwner,
  ITypeCreateInput,
  ITypeUpdateVars,
} from '@codelab/shared/domain-old'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop, Ref } from 'mobx-keystone'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  @model(`@codelab/BaseType${typeKind}`)
  class BaseType
    extends Model({
      __typename: prop(typeKind),
      id: idProp,
      kind: prop<T>(() => typeKind),
      name: prop<string>(),
      owner: prop<Ref<IUserModel>>(),
    })
    implements IBaseTypeModel<IBaseTypeDto, ITypeCreateInput, ITypeUpdateVars>
  {
    @computed
    get toJson() {
      return {
        __typename: this.__typename,
        id: this.id,
        kind: this.kind,
        name: this.name,
        owner: this.owner,
      }
    }

    @modelAction
    writeCache({ name }: Partial<IBaseTypeDto>) {
      this.name = name ?? this.name

      return this
    }

    toCreateInput() {
      return {
        id: this.id,
        kind: this.kind,
        name: this.name,
        owner: this.owner,
      }
    }

    toJsonSchema(context: ITypeTransformContext): JsonSchema {
      return {}
    }
  }

  return BaseType
}
