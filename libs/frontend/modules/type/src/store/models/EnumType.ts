import { TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
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
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/EnumTypeValue')
export class EnumTypeValue extends Model({
  id: idProp,
  name: prop<Nullish<string>>(),
  value: prop<string>(),
}) {
  public static fromFragment(fragment: EnumTypeValueFragment): EnumTypeValue {
    return new EnumTypeValue({ ...fragment })
  }
}

@model('codelab/EnumType')
export class EnumType
  extends Model({
    ...baseTypeProps(TypeKind.EnumType),
    allowedValues: prop<Array<EnumTypeValue>>(() => []),
  })
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

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
