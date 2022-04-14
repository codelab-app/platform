import {
  IReactNodeType,
  IReactNodeTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateFromDTO } from '../abstract'
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
    ownerAuth0Id: owner?.auth0Id,
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
    updateFromDTO(this, fragment)
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)
  }

  public static hydrate = hydrate
}
