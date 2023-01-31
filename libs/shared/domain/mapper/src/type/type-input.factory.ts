import type {
  IEnumTypeValue,
  IPropData,
  IUpdateTypeDTO,
} from '@codelab/frontend/abstract/core'
import type {
  ArrayTypeItemTypeDisconnectInput,
  UnionTypeTypesOfUnionTypeDisconnectInput,
  UnionTypeTypesOfUnionTypeUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { connectNode } from '../orm'

const makeAllTypes = (input: IPropData) =>
  Object.values(ITypeKind)
    .map((kind) => ({ [kind]: input }))
    .reduce((all, current) => ({ ...all, ...current }), {})

/**
 * We use IUpdateTypeDTO since auth0Id isn't required here
 */
export const makeTypesOfUnionTypeCreateInput = (
  type: IUpdateTypeDTO,
): UnionTypeTypesOfUnionTypeUpdateInput =>
  makeAllTypes({
    connect: type.unionTypeIds?.map((id) => ({ where: { node: { id } } })),
  })

export const getApiName = (name: string) => {
  return `${name} API`
}

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
  return { id: value.id, key: value.key, value: value.value }
}

export const makeItemTypeCreateInput = (type: IUpdateTypeDTO) => {
  return type.arrayTypeId ? makeAllTypes(connectNode(type.arrayTypeId)) : {}
}

export const getInterfaceName = (type: string) =>
  `${compoundCaseToTitleCase(type)} API`

// export const makeFieldsCreateInput = (type: ICreateTypeDTO) => {
//   return {
//     connect: type.fields.map((f) => ({
//       where: { node: { id: f.type.id } },
//       edge: { name: f.name, description: f.description, key: f.key },
//     })),
//   }
// }
