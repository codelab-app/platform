import type { IActionTypeDto } from '@codelab/shared-abstract-core'

import {
  type IActionTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'

import { typedPropSchema } from '../shared'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IActionTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.ActionType)

  return new ActionType({ id, kind, name, owner: userRef(owner.id) })
}

@model('@codelab/ActionType')
export class ActionType
  extends ExtendedModel(createBaseType(ITypeKind.ActionType), {})
  implements IActionTypeModel
{
  static create = create

  @computed
  get toJson(): IActionTypeDto {
    return {
      ...super.toJson,
      __typename: this.__typename,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }

  @modelAction
  writeCache({ name }: Partial<IActionTypeDto>): IActionTypeModel {
    this.name = name ?? this.name

    return this
  }
}
