import { IEnumType, TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  ExtendedModel,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import {
  EnumTypeFragment,
  EnumTypeValueFragment,
  TypeFragment,
} from '../../graphql'
import { baseTypeProps, baseUpdateFromFragment, IBaseType } from '../abstract'
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
