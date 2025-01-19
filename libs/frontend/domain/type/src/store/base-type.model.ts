import type {
  IBaseTypeModel,
  ITypeTransformContext,
  IUserModel,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import type { IBaseTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

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
      owner: prop<Ref<IUserModel>>(),
    })
    implements IBaseTypeModel<IBaseTypeDto>
  {
    @computed
    get toJson() {
      return {
        __typename: this.__typename,
        id: this.id,
        kind: this.kind,
        name: this.name,
        owner: this.owner.current.toJson,
      }
    }

    @modelAction
    writeCache({ name }: Partial<IBaseTypeDto>) {
      this.name = name ?? this.name

      return this
    }

    toJsonSchema(context: ITypeTransformContext): JsonSchema {
      return {}
    }
  }

  return BaseType
}
