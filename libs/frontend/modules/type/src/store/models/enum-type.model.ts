import {
  IEnumType,
  IEnumTypeDTO,
  IEnumTypeValueDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  ExtendedModel,
  idProp,
  Model,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragmentValue = (fragment: IEnumTypeValueDTO): EnumTypeValue =>
  new EnumTypeValue({
    ...fragment,
    name: fragment.name,
  })

@model('codelab/EnumTypeValue')
export class EnumTypeValue extends Model({
  id: idProp,
  name: prop<Nullish<string>>(),
  value: prop<string>(),
}) {
  get label() {
    return this.name || this.value
  }

  public static fromFragment = fromFragmentValue
}

const fromFragmentEnumType = ({
  id,
  allowedValues,
  typeKind,
  name,
  owner,
}: IEnumTypeDTO): EnumType =>
  new EnumType({
    id,
    typeKind,
    name,
    allowedValues: allowedValues.map(EnumTypeValue.fromFragment),
    ownerAuth0Id: owner?.auth0Id,
  })

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
  updateFromFragment(fragment: ITypeDTO): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.EnumType) {
      return
    }

    this.allowedValues =
      fragment.allowedValues?.map(EnumTypeValue.fromFragment) ?? []
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)

    if (!input.allowedValues) {
      throw new Error('EnumType must have an allowedValues array')
    }

    this.allowedValues = input.allowedValues?.map((v) =>
      EnumTypeValue.fromFragment({ value: v.value, name: v.name, id: v4() }),
    )
  }

  public static fromFragment = fromFragmentEnumType
}
