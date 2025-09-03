import type { ITypeDto } from '@codelab/shared-abstract-core'

import {
  type IAnyTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model } from 'mobx-keystone'

import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: ITypeDto) => {
  assertIsTypeKind(kind, ITypeKind.AnyType)

  return new AnyType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/AnyType')
export class AnyType
  extends ExtendedModel(createBaseType(ITypeKind.AnyType), {})
  implements IAnyTypeModel
{
  public static create = create

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return {
      type: 'object',
      properties: {},
      additionalProperties: true,
    }
  }
}
