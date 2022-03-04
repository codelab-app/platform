import { TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { PageTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/PageType')
export class PageType
  extends Model(baseTypeProps(TypeKind.PageType))
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
  }: PageTypeFragment): PageType {
    return new PageType({ id, typeKind, name })
  }
}
