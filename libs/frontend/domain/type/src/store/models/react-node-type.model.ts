import type { IReactNodeType } from '@codelab/frontend/abstract/core'
import { IReactNodeTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
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
  @modelAction
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    return this
  }

  @modelAction
  writeCache(reactNodeTypeDTO: IReactNodeTypeDTO) {
    updateBaseTypeCache(this, reactNodeTypeDTO)

    return this
  }

  public static create = create
}
