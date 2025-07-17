import type { ITypeDto } from '@codelab/shared-abstract-core'

import {
  type ITypeTransformContext,
  type IUnknownTypeModel,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model } from 'mobx-keystone'

import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: ITypeDto) => {
  assertIsTypeKind(kind, ITypeKind.UnknownType)

  return new UnknownType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/UnknownType')
export class UnknownType
  extends ExtendedModel(createBaseType(ITypeKind.UnknownType), {})
  implements IUnknownTypeModel
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
