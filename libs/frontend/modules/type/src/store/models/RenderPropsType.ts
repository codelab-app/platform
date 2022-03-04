import { TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { RenderPropsTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/RenderPropsType')
export class RenderPropsType
  extends Model(baseTypeProps(TypeKind.RenderPropsType))
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

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
