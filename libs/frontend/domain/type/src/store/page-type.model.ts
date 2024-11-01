import type { IPageTypeDto } from '@codelab/shared/abstract/core'

import {
  type IPageTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IPageTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.PageType)

  return new PageType({ id, kind, name, owner: userRef(owner.id) })
}

@model('@codelab/PageType')
export class PageType
  extends ExtendedModel(createBaseType(ITypeKind.PageType), {})
  implements IPageTypeModel
{
  public static create = create

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }
}
