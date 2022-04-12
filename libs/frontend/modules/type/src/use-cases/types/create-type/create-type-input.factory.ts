import { ICreateTypeDTO, TypeKind } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { v4 } from 'uuid'
import { baseTypeMutationSchemaProperties } from '../../../shared'
import {
  AppType,
  ArrayType,
  ElementType,
  EnumType,
  EnumTypeValue,
  InterfaceType,
  LambdaType,
  MonacoType,
  PageType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  typeRef,
  UnionType,
} from '../../../store'

export const createTypeSchema: JSONSchemaType<ICreateTypeDTO> = {
  title: 'Create Type Input',
  type: 'object',
  properties: {
    kind: { type: 'string', enum: Object.values(TypeKind) },
    arrayItemTypeId: { type: 'string', nullable: true },
    ...(baseTypeMutationSchemaProperties as any),
  },
  required: ['name', 'kind'],
}

export const typeFactory = (
  formData: ICreateTypeDTO,
  currentUserId: string,
) => {
  const id = v4()
  const name = formData.name
  const ownerAuth0Id = currentUserId
  const common = { id, name, ownerAuth0Id }

  switch (formData.kind) {
    case TypeKind.UnionType:
      if (
        !(formData.typeIdsOfUnionType && formData.typeIdsOfUnionType.length > 0)
      ) {
        throw new Error('Union item types not set')
      }

      return new UnionType({
        ...common,
        typesOfUnionType: formData.typeIdsOfUnionType.map((typeId) =>
          typeRef(typeId),
        ),
      })

    case TypeKind.ArrayType:
      if (!formData.arrayItemTypeId) {
        throw new Error('Array item type not set')
      }

      return new ArrayType({
        ...common,
        itemType: typeRef(formData.arrayItemTypeId),
      })
    case TypeKind.InterfaceType:
      return new InterfaceType(common)
    case TypeKind.EnumType:
      if (!formData.allowedValues) {
        throw new Error('Invalid form input')
      }

      return new EnumType({
        ...common,
        allowedValues: formData.allowedValues.map(
          (av) => new EnumTypeValue(av),
        ),
      })

    case TypeKind.PrimitiveType:
      if (!formData.primitiveKind) {
        throw new Error('Primitive kind is required')
      }

      return new PrimitiveType({
        ...common,
        primitiveKind: formData.primitiveKind,
      })
    case TypeKind.LambdaType:
      return new LambdaType(common)
    case TypeKind.AppType:
      return new AppType(common)
    case TypeKind.RenderPropsType:
      return new RenderPropsType(common)
    case TypeKind.ReactNodeType:
      return new ReactNodeType(common)
    case TypeKind.PageType:
      return new PageType(common)
    case TypeKind.MonacoType:
      if (!formData.language) {
        throw new Error('Language is required')
      }

      return new MonacoType({ ...common, language: formData.language })
    case TypeKind.ElementType:
      if (!formData.elementKind) {
        throw new Error('Element kind is required')
      }

      return new ElementType({ ...common, elementKind: formData.elementKind })
    default:
      throw new Error('Invalid create form type')
  }
}
