import {
  ElementTypeKind,
  IElementType,
  TypeKind,
} from '@codelab/shared/abstract/core'
import {
  ExtendedModel,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { ElementTypeFragment, TypeFragment } from '../../graphql'
import { baseTypeProps, baseUpdateFromFragment, IBaseType } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/ElementType')
export class ElementType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.ElementType),
    props: {
      elementKind: prop<ElementTypeKind>(),
    },
  }))
  implements IElementType
{
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
