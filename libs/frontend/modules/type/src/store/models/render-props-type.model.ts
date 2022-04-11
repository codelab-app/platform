import { IRenderPropsType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { RenderPropsTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/RenderPropsType')
export class RenderPropsType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.RenderPropsType),
    props: {},
  }))
  implements IRenderPropsType
{
  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)
  }

  public static fromFragment({
    id,
    typeKind,
    name,
  }: RenderPropsTypeFragment): RenderPropsType {
    return new RenderPropsType({ id, typeKind, name })
  }
}
