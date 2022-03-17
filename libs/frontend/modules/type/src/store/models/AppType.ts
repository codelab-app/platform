import { TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { AppTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/AppType')
export class AppType
  extends Model(baseTypeProps(TypeKind.AppType))
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)
  }

  public static fromFragment({ id, typeKind, name }: AppTypeFragment): AppType {
    return new AppType({ id, typeKind, name })
  }
}
