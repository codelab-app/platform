import { TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { LambdaTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/LambdaType')
export class LambdaType
  extends Model(baseTypeProps(TypeKind.LambdaType))
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
  }: LambdaTypeFragment): LambdaType {
    return new LambdaType({ id, typeKind, name })
  }
}
