import type { IReactNodeTypeDto } from '@codelab/shared-abstract-core'

import {
  type IReactNodeTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({
  id,
  kind,
  name,
  owner,
}: IReactNodeTypeDto): ReactNodeType => {
  assertIsTypeKind(kind, ITypeKind.ReactNodeType)

  return new ReactNodeType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/ReactNodeType')
export class ReactNodeType
  extends ExtendedModel(createBaseType(ITypeKind.ReactNodeType), {})
  implements IReactNodeTypeModel
{
  public static create = create

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(this, context)
  }
}
