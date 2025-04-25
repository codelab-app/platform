import type { IActionTypeDto, IAppTypeDto } from '@codelab/shared-abstract-core'

import {
  IActionTypeModel,
  type IAppTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IAppTypeDto): AppType => {
  assertIsTypeKind(kind, ITypeKind.AppType)

  return new AppType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/AppType')
export class AppType
  extends ExtendedModel(createBaseType(ITypeKind.AppType), {})
  implements IAppTypeModel
{
  public static create = create

  @computed
  get toJson(): IAppTypeDto {
    return {
      ...super.toJson,
      __typename: this.__typename,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }

  @modelAction
  writeCache({ name }: Partial<IAppTypeDto>): IAppTypeModel {
    this.name = name ?? this.name

    return this
  }
}
