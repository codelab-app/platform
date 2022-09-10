import type {
  IEnumType,
  IEnumTypeDTO,
  IEnumTypeValueDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import {
  ExtendedModel,
  idProp,
  Model,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrateEnumValue = (fragment: IEnumTypeValueDTO): EnumTypeValue =>
  new EnumTypeValue({
    ...fragment,
    name: fragment.name,
  })

@model('@codelab/EnumTypeValue')
export class EnumTypeValue extends Model({
  id: idProp,
  name: prop<Nullish<string>>(),
  value: prop<string>(),
}) {
  get label() {
    return this.name || this.value
  }

  public static hydrate = hydrateEnumValue
}

const hydrate = ({
  id,
  allowedValues,
  kind,
  name,
  owner,
}: IEnumTypeDTO): EnumType => {
  assertIsTypeKind(kind, ITypeKind.EnumType)

  return new EnumType({
    id,
    kind,
    name,
    allowedValues: allowedValues.map(EnumTypeValue.hydrate),
    ownerId: owner?.id,
  })
}

@model('@codelab/EnumType')
export class EnumType
  extends ExtendedModel(createTypeBase(ITypeKind.EnumType), {
    allowedValues: prop<Array<EnumTypeValue>>(() => []),
  })
  implements IEnumType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.EnumType) {
      throw new Error('Incorrect EnumType')
    }

    this.allowedValues =
      fragment.allowedValues?.map(EnumTypeValue.hydrate) ?? []

    return this
  }

  public static hydrate = hydrate
}
