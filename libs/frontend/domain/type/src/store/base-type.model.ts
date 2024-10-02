import type { IBaseTypeDto, ITypeKind } from '@codelab/shared/abstract/core'

import {
  getUserDomainService,
  type IBaseTypeModel,
  type ICreateTypeInput,
  ITypeTransformContext,
  type IUpdateTypeVars,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import { connectOwner } from '@codelab/shared/domain'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  @model(`@codelab/BaseType${typeKind}`)
  class BaseType
    extends Model({
      __typename: prop(typeKind),
      id: idProp,
      kind: prop<T>(() => typeKind),
      name: prop<string>(),
    })
    implements IBaseTypeModel<IBaseTypeDto, ICreateTypeInput, IUpdateTypeVars>
  {
    @computed
    get toJson() {
      return {
        __typename: this.__typename,
        id: this.id,
        kind: this.kind,
        name: this.name,
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
        owner: connectOwner(this.userDomainService.user),
      }
    }

    toJsonSchema(context: ITypeTransformContext): JsonSchema {
      return {}
    }

    toUpdateInput() {
      return {
        update: {
          name: this.name,
        },
        where: { id: this.id },
      }
    }

    @computed
    private get userDomainService() {
      return getUserDomainService(this)
    }
  }

  return BaseType
}
