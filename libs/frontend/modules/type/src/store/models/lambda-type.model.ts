import {
  ILambdaType,
  ILambdaTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  owner,
}: ILambdaTypeDTO): LambdaType =>
  new LambdaType({
    id,
    typeKind,
    name,
    ownerAuth0Id: owner?.auth0Id,
  })

@model('codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.LambdaType),
    props: {},
  }))
  implements ILambdaType
{
  @modelAction
  updateFromFragment(fragment: ITypeDTO): void {
    baseUpdateFromFragment(this, fragment)
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)
  }

  public static fromFragment = fromFragment
}
