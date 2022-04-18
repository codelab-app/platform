import { EnumTypeAllowedValuesUpdateFieldInput } from '@codelab/shared/abstract/codegen'
import { ICreateTypeDTO } from '@codelab/shared/abstract/core'

export const makeTypesOfUnionTypeCreateInput = (type: ICreateTypeDTO) => {
  return {
    connect: type.unionTypeIds?.map((id) => ({
      where: { node: { id } },
    })),
  }
}

export const makeAllowedValuesCreateInput = (
  type: ICreateTypeDTO,
): EnumTypeAllowedValuesUpdateFieldInput => {
  return {
    create: type.allowedValues?.map((av) => ({
      node: { id: av.id, name: av.name, value: av.value },
    })),
  }
}

export const makeItemTypeCreateInput = (type: ICreateTypeDTO) => {
  return type.arrayTypeId
    ? { connect: { where: { node: { id: type.arrayTypeId } } } }
    : {}
}

// export const makeFieldsCreateInput = (type: ICreateTypeDTO) => {
//   return {
//     connect: type.fields.map((f) => ({
//       where: { node: { id: f.type.id } },
//       edge: { name: f.name, description: f.description, key: f.key },
//     })),
//   }
// }
