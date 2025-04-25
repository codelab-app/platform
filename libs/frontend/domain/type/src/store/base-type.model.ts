import type {
  IBaseTypeModel,
  ITypeTransformContext,
  IUserModel,
  JsonSchema,
} from '@codelab/frontend-abstract-domain'
import type { IBaseTypeDto, ITypeKind } from '@codelab/shared-abstract-core'
import type { ModelClassDeclaration, Ref } from 'mobx-keystone'

import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

export interface ModelInterface {
  get toJson(): IBaseTypeDto
  toJsonSchema(context: ITypeTransformContext): JsonSchema
  writeCache(dto: Partial<IBaseTypeDto>): IBaseTypeModel<IBaseTypeDto>
}

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  const ModelProps = Model({
    __typename: prop(typeKind),
    id: idProp,
    kind: prop<T>(() => typeKind),
    name: prop<string>(),
    owner: prop<Ref<IUserModel>>(),
  })

  @model(`@codelab/BaseType${typeKind}`)
  class BaseType extends ModelProps implements IBaseTypeModel<IBaseTypeDto> {
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

    toJsonSchema(context: ITypeTransformContext): JsonSchema {
      return {}
    }

    @modelAction
    writeCache({ name }: Partial<IBaseTypeDto>): IBaseTypeModel<IBaseTypeDto> {
      this.name = name ?? this.name

      return this
    }
  }

  return BaseType as ModelClassDeclaration<typeof ModelProps, ModelInterface>
}
