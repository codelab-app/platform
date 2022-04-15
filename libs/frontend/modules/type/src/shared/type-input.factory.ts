import { EnumTypeAllowedValuesUpdateFieldInput } from '@codelab/shared/abstract/codegen'
import {
  IArrayType,
  IEnumType,
  IInterfaceType,
  IUnionType,
} from '@codelab/shared/abstract/core'

export const makeTypesOfUnionTypeCreateInput = (type: IUnionType) => {
  return {
    connect: type.typesOfUnionType.map((ut) => ({
      where: { node: { id: ut.id } },
    })),
  }
}

export const makeAllowedValuesCreateInput = (
  type: IEnumType,
): EnumTypeAllowedValuesUpdateFieldInput => {
  return {
    create: type.allowedValues.map((av) => ({
      node: { id: av.id, name: av.name, value: av.value },
    })),
  }
}

export const makeItemTypeCreateInput = (type: IArrayType) => {
  return type.itemType
    ? { connect: { where: { node: { id: type.itemType.id } } } }
    : {}
}

export const makeFieldsCreateInput = (type: IInterfaceType) => {
  return {
    connect: type.fields.map((f) => ({
      where: { node: { id: f.type.id } },
      edge: { name: f.name, description: f.description, key: f.key },
    })),
  }
}
