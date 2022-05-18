import {
  assertIsTypeKind,
  IReactNodeType,
  IReactNodeTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
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
    ownerId: owner?.id,
  })
}

@model('@codelab/ReactNodeType')
export class ReactNodeType
  extends ExtendedModel(createTypeBase(ITypeKind.ReactNodeType), {})
  implements IReactNodeType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  // }

  public static hydrate = hydrate
}
