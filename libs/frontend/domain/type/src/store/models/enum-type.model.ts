import type {
  IEnumType,
  IEnumTypeDTO,
  IEnumTypeValueDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import {
  ExtendedModel,
  idProp,
  Model,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'

const hydrateEnumValue = (fragment: IEnumTypeValueDTO) =>
  new EnumTypeValue({
    ...fragment,
    key: fragment.key,
  })

@model('@codelab/EnumTypeValue')
export class EnumTypeValue extends Model({
  id: idProp,
  key: prop<string>(),
  value: prop<string>(),
}) {
  get label() {
    return this.key
  }

  public static hydrate = hydrateEnumValue
}

const hydrate = ({ id, allowedValues, kind, name, owner }: IEnumTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.EnumType)

  return new EnumType({
    id,
    kind,
    name,
    allowedValues: allowedValues.map(EnumTypeValue.hydrate),
    owner,
  })
}

@model('@codelab/EnumType')
export class EnumType
  extends ExtendedModel(createBaseType(ITypeKind.EnumType), {
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

    this.allowedValues = fragment.allowedValues.map(EnumTypeValue.hydrate)

    return this
  }

  public static hydrate = hydrate
}
