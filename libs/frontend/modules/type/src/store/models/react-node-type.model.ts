import { TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { ReactNodeTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/ReactNodeType')
export class ReactNodeType
  extends Model(baseTypeProps(TypeKind.ReactNodeType))
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
  }: ReactNodeTypeFragment): ReactNodeType {
    return new ReactNodeType({ id, typeKind, name })
  }
}
