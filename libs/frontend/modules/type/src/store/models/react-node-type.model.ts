import {
  IReactNodeType,
  IReactNodeTypeDTO,
  ITypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  typeKind,
  name,
  owner,
}: IReactNodeTypeDTO): ReactNodeType =>
  new ReactNodeType({
    id,
    typeKind,
    name,
    ownerId: owner?.id,
  })

@model('@codelab/ReactNodeType')
export class ReactNodeType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.ReactNodeType),
    props: {},
  }))
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
