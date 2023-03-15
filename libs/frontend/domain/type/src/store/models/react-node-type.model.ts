import type {
  IReactNodeType,
  IReactNodeTypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({
  id,
  kind,
  name,
  owner,
}: IReactNodeTypeDTO): ReactNodeType => {
  assertIsTypeKind(kind, ITypeKind.ReactNodeType)

  return new ReactNodeType({
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/ReactNodeType')
export class ReactNodeType
  extends ExtendedModel(createBaseType(ITypeKind.ReactNodeType), {})
  implements IReactNodeType
{
  public static create = create
}
