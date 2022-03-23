import { ElementTypeKind, TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { ElementTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/ElementType')
export class ElementType
  extends Model({
    ...baseTypeProps(TypeKind.ElementType),
    elementKind: prop<ElementTypeKind>(),
  })
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.ElementType) {
      return
    }

    this.elementKind = fragment.elementKind
  }

  public static fromFragment({
    id,
    typeKind,
    name,
    elementKind,
  }: ElementTypeFragment): ElementType {
    return new ElementType({ id, typeKind, name, elementKind })
  }
}
