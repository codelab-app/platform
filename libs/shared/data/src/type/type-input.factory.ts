import { IEnumTypeValue, IUpdateTypeDTO } from '@codelab/shared/abstract/core'

/**
 * We use IUpdateTypeDTO since auth0Id isn't required here
 */
export const makeTypesOfUnionTypeCreateInput = (type: IUpdateTypeDTO) => {
  return {
    connect: type.unionTypeIds?.map((id) => ({
      where: { node: { id } },
    })),
  }
}

export const makeAllowedValuesCreateInput = (type: IUpdateTypeDTO) => {
  return {
    create: type.allowedValues?.map((value) => ({
      node: makeAllowedValuesNodeInput(value),
    })),
  }
}

/**
 * Create creating an enum node
 */
export const makeAllowedValuesNodeInput = (value: IEnumTypeValue) => {
  return { id: value.id, name: value.name, value: value.value }
}

export const makeItemTypeCreateInput = (type: IUpdateTypeDTO) => {
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
