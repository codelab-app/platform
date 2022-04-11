import { ILambdaType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { LambdaTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/LambdaType')
export class LambdaType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.LambdaType),
    props: {},
  }))
  implements ILambdaType
{
  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)
  }

  public static fromFragment({
    id,
    typeKind,
    name,
  }: LambdaTypeFragment): LambdaType {
    return new LambdaType({ id, typeKind, name })
  }
}
