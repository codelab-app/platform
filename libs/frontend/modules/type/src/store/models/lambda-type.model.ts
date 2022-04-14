import {
  ILambdaType,
  ILambdaTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateFromDTO } from '../abstract'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, typeKind, name, owner }: ILambdaTypeDTO): LambdaType =>
  new LambdaType({
    id,
    typeKind,
    name,
    ownerAuth0Id: owner?.auth0Id,
  })

@model('@codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.LambdaType),
    props: {},
  }))
  implements ILambdaType
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
