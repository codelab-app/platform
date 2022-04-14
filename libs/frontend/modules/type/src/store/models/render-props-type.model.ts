import {
  IRenderPropsType,
  IRenderPropsTypeDTO,
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
}: IRenderPropsTypeDTO): RenderPropsType =>
  new RenderPropsType({
    id,
    typeKind,
    name,
    ownerAuth0Id: owner?.auth0Id,
  })

@model('@codelab/RenderPropsType')
export class RenderPropsType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.RenderPropsType),
    props: {},
  }))
  implements IRenderPropsType
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
