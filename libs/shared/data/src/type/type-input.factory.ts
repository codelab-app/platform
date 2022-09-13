import {
  ArrayTypeItemTypeDisconnectInput,
  UnionTypeTypesOfUnionTypeDisconnectInput,
  UnionTypeTypesOfUnionTypeUpdateInput,
} from '@codelab/shared/abstract/codegen'
import {
  IEnumTypeValue,
  IPropData,
  ITypeKind,
  IUpdateTypeDTO,
} from '@codelab/shared/abstract/core'
import { merge, values } from 'lodash'

const makeAllTypes = (input: IPropData) =>
  values(ITypeKind)
    .map((kind) => ({ [kind]: input }))
    .reduce(merge, {})

/**
 * We use IUpdateTypeDTO since auth0Id isn't required here
 */
export const makeTypesOfUnionTypeCreateInput = (
  type: IUpdateTypeDTO,
): UnionTypeTypesOfUnionTypeUpdateInput =>
  makeAllTypes({
    connect: type.unionTypeIds?.map((id) => ({ where: { node: { id } } })),
  })

export const makeTypesOfUnionTypeDisconnectInput = (
  type: IUpdateTypeDTO,
): UnionTypeTypesOfUnionTypeDisconnectInput =>
  makeAllTypes({
    where: { node: { id_NOT_IN: type.unionTypeIds?.map((id) => id) } },
  })

export const makeArrayTypeDisconnectInput = (
  type: IUpdateTypeDTO,
): ArrayTypeItemTypeDisconnectInput =>
  makeAllTypes({ where: { node: { id_NOT: type.arrayTypeId } } })

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
    ? makeAllTypes({ connect: { where: { node: { id: type.arrayTypeId } } } })
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
