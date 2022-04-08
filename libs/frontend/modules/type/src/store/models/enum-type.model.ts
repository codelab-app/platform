import { IEnumType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import {
  EnumTypeFragment,
  EnumTypeValueFragment,
  TypeFragment,
} from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/EnumTypeValue')
export class EnumTypeValue extends ExtendedModel(() => ({
  baseModel: createTypeBase(TypeKind.ArrayType),
  props: {
    value: prop<string>(),
  },
})) {
  public static fromFragment(fragment: EnumTypeValueFragment): EnumTypeValue {
    return new EnumTypeValue({
      ...fragment,
      name: fragment.name ? fragment.name : fragment.value,
    })
  }
}

@model('codelab/EnumType')
export class EnumType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.EnumType),
    props: {
      allowedValues: prop<Array<EnumTypeValue>>(() => []),
    },
  }))
  implements IEnumType
{
  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.EnumType) {
      return
    }

    this.allowedValues =
      fragment.allowedValues?.map(EnumTypeValue.fromFragment) ?? []
  }

  public static fromFragment({
    id,
    allowedValues,
    typeKind,
    name,
  }: EnumTypeFragment): EnumType {
    return new EnumType({
      id,
      typeKind,
      name,
      allowedValues: allowedValues.map(EnumTypeValue.fromFragment),
    })
  }
}

const enumType = new EnumType({ allowedValues: [], name: '' })
