import { EnumTypeAllowedValuesUpdateFieldInput } from '@codelab/shared/abstract/codegen'
import {
  IAnyType,
  IArrayType,
  ICreateTypeInput,
  IEnumType,
  IInterfaceType,
  IUnionType,
  IUpdateTypeArgs,
  TypeKind,
} from '@codelab/shared/abstract/core'

const makeTypesOfUnionTypeCreateInput = (type: IUnionType) => {
  return {
    connect: type.typesOfUnionType.map((ut) => ({
      where: { node: { id: ut.id } },
    })),
  }
}

const makeAllowedValuesCreateInput = (
  type: IEnumType,
): EnumTypeAllowedValuesUpdateFieldInput => {
  return {
    create: type.allowedValues.map((av) => ({
      node: { id: av.id, name: av.name, value: av.value },
    })),
  }
}

const makeItemTypeCreateInput = (type: IArrayType) => {
  return type.itemType
    ? { connect: { where: { node: { id: type.itemType.id } } } }
    : {}
}

const makeFieldsCreateInput = (type: IInterfaceType) => {
  return {
    connect: type.fields.map((f) => ({
      where: { node: { id: f.type.id } },
      edge: { name: f.name, description: f.description, key: f.key },
    })),
  }
}

export const typeCreateInputFactory = (
  type: IAnyType,
  currentUserAuth0Id: string,
): ICreateTypeInput => {
  return {
    id: type.id,
    name: type.name,
    owner: {
      connect: { where: { node: { auth0Id: currentUserAuth0Id } } },
    },
    primitiveKind:
      type.typeKind === TypeKind.PrimitiveType ? type.primitiveKind : undefined,
    language: type.typeKind === TypeKind.MonacoType ? type.language : undefined,
    elementKind:
      type.typeKind === TypeKind.ElementType ? type.elementKind : undefined,
    allowedValues:
      type.typeKind === TypeKind.EnumType
        ? makeAllowedValuesCreateInput(type)
        : undefined,
    itemType:
      type.typeKind === TypeKind.ArrayType
        ? makeItemTypeCreateInput(type)
        : undefined,
    typesOfUnionType:
      type.typeKind === TypeKind.UnionType
        ? makeTypesOfUnionTypeCreateInput(type)
        : undefined,
    fields:
      type.typeKind === TypeKind.InterfaceType
        ? makeFieldsCreateInput(type)
        : undefined,
  }
}

export const typeUpdateInputFactory = (type: IAnyType): IUpdateTypeArgs => {
  // For some reason if the disconnect and delete are in the update section it throws an error
  return {
    update: {
      name: type.name,
      primitiveKind:
        type.typeKind === TypeKind.PrimitiveType
          ? type.primitiveKind
          : undefined,
      language:
        type.typeKind === TypeKind.MonacoType ? type.language : undefined,
      elementKind:
        type.typeKind === TypeKind.ElementType ? type.elementKind : undefined,
      itemType:
        type.typeKind === TypeKind.ArrayType
          ? makeItemTypeCreateInput(type)
          : undefined,
      typesOfUnionType:
        type.typeKind === TypeKind.UnionType
          ? [makeTypesOfUnionTypeCreateInput(type)]
          : undefined,
      fields:
        type.typeKind === TypeKind.InterfaceType
          ? [makeFieldsCreateInput(type)]
          : undefined,
      allowedValues:
        type.typeKind === TypeKind.EnumType
          ? [makeAllowedValuesCreateInput(type)]
          : undefined,
    },
    disconnect: {
      itemType:
        type.typeKind === TypeKind.ArrayType && type.itemType
          ? { where: { node: { id_NOT: type.itemType.id } } }
          : undefined,
      typesOfUnionType:
        type.typeKind === TypeKind.UnionType
          ? [
              {
                where: {
                  node: {
                    id_NOT_IN: type.typesOfUnionType.map((tu) => tu.id),
                  },
                },
              },
            ]
          : undefined,
      fields:
        type.typeKind === TypeKind.InterfaceType
          ? [
              {
                where: {
                  node: {
                    id_NOT_IN: type.fields.map((f) => f.type.id),
                  },
                },
              },
            ]
          : undefined,
    },
    delete: {
      allowedValues:
        type.typeKind === TypeKind.EnumType
          ? [
              {
                where: {
                  node: {
                    id_NOT_IN: type.allowedValues.map((av) => av.id),
                  },
                },
              },
            ]
          : undefined,
    },
  }
}
