import { domainRequest } from '@codelab/backend/shared/testing'
import { IField, IType, TypeKind } from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { TestTypeGraphFragment } from '../../../../tests/graphql/TestTypeGraph.fragment.graphql.gen'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import {
  createEnumTypeInput,
  createInterfaceTypeInput,
  createPrimitiveStringInput,
} from '../../create-type/tests/create-type.data'
import { GetTypeGraphInput } from '../get-type-graph.input'
import {
  TestGetTypeGraphGql,
  TestGetTypeGraphQuery,
} from './get-type-graph.api.graphql.gen'

describe('GetTypeGraph', () => {
  const testModule = setupTypeTestModule()
  let getTypeInput: GetTypeGraphInput
  const createdFields: Array<IField> = []
  const createdTypes: Array<IType> = []
  let rootInterfaceId: string
  let typeIdsOfUnionType: Array<string>
  let arrayItemTypeId: string
  let typeGraph: TestTypeGraphFragment
  let tree: TypeTree

  beforeAll(async () => {
    //
    // Types:
    //
    // 1. Interface (root)
    const interfaceType = await testModule.createTestType(
      createInterfaceTypeInput,
    )

    createdTypes.push(interfaceType as IType)
    rootInterfaceId = interfaceType.id

    // 2. Primitive
    const primitiveType = await testModule.createTestType(
      createPrimitiveStringInput,
    )

    createdTypes.push(primitiveType as IType)

    // 3. Enum
    const enumType = await testModule.createTestType(createEnumTypeInput)
    createdTypes.push(enumType as IType)

    // 4. Union
    typeIdsOfUnionType = [enumType.id, primitiveType.id]

    const unionType = await testModule.createTestType({
      name: 'StringEnumUnion',
      typeKind: TypeKind.UnionType,
      unionType: { typeIdsOfUnionType },
    })

    createdTypes.push(unionType as IType)

    // 5. Array
    arrayItemTypeId = primitiveType.id

    const arrayType = await testModule.createTestType({
      name: 'StringArray',
      typeKind: TypeKind.ArrayType,
      arrayType: {
        itemTypeId: arrayItemTypeId,
      },
    })

    createdTypes.push(arrayType as IType)

    //
    // Fields:
    //
    // 1. Enum
    const enumField = await testModule.createTestField({
      type: { existingTypeId: enumType.id },
      key: 'enumField',
      interfaceId: interfaceType.id,
    })

    createdFields.push(enumField)

    // 2. Primitive
    const primitiveField = await testModule.createTestField({
      type: { existingTypeId: primitiveType.id },
      key: 'primitiveField',
      interfaceId: interfaceType.id,
    })

    createdFields.push(primitiveField)

    // 3. Union field
    const unionField = await testModule.createTestField({
      type: {
        existingTypeId: unionType.id,
      },
      key: 'unionField',
      interfaceId: interfaceType.id,
    })

    createdFields.push(unionField)

    const arrayField = await testModule.createTestField({
      type: {
        existingTypeId: arrayType.id,
      },
      key: 'arrayField',
      interfaceId: interfaceType.id,
    })

    createdFields.push(arrayField)

    getTypeInput = { where: { id: interfaceType.id } }

    const { getTypeGraph } = await domainRequest<
      GetTypeGraphInput,
      TestGetTypeGraphQuery
    >(testModule.userApp, TestGetTypeGraphGql, getTypeInput)

    if (!getTypeGraph) {
      throw new Error("Couldn't get type graph")
    }

    typeGraph = getTypeGraph
    tree = new TypeTree(typeGraph as any)
  })

  describe('Guest', () => {
    it('should not get type graph', async () => {
      await domainRequest<GetTypeGraphInput>(
        testModule.guestApp,
        TestGetTypeGraphGql,
        getTypeInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    // TODO: get type specs:
    // - test if the graph contains all sub types
    // - test if the subtypes are well arranged with edges
    // - test arrays, interfaces

    it('should get all types in the graph', async () => {
      expect(typeGraph.vertices).toHaveLength(createdTypes.length)

      for (const createdType of createdTypes) {
        const actualType = tree.getTypeById(createdType.id)

        expect(actualType).toMatchObject(createdType)
      }
    })

    it('should get all fields in the graph', async () => {
      // fields count + union type edges + array item type edge \/
      expect(typeGraph.edges).toHaveLength(7)

      const rootFields = tree.getRootFields()

      expect(rootFields).toHaveLength(createdFields.length)
      expect(tree.getFields(rootInterfaceId)).toHaveLength(createdFields.length)

      for (const createdField of createdFields) {
        const field = rootFields.find((f) => f.id === createdField.id)

        expect(field).toMatchObject(createdField)
      }
    })

    it('should get union types', async () => {
      const unionFields = tree.getFieldsByTypeKind(TypeKind.UnionType)

      expect(unionFields).toHaveLength(1)

      const union = tree.getFieldType(unionFields[0].id)

      expect(union).toBeTruthy()

      const unionSubTypes = tree.getUnionItemTypes(union!.id)

      expect(unionSubTypes).toHaveLength(typeIdsOfUnionType.length)

      const expectedSubTypes = createdTypes.filter(
        ({ id }) => !!typeIdsOfUnionType.find((tId) => tId === id),
      )

      for (const expectedType of expectedSubTypes) {
        const actualType = unionSubTypes.find((t) => t.id === expectedType.id)

        expect(actualType).toMatchObject(expectedType)
      }
    })

    it('should get array item type', async () => {
      const arrayFields = tree.getFieldsByTypeKind(TypeKind.ArrayType)

      expect(arrayFields).toHaveLength(1)

      const array = tree.getFieldType(arrayFields[0].id)

      expect(array).toBeTruthy()

      const arrayItemType = tree.getArrayItemType(array!.id)

      const expectedArrayItemType = createdTypes.find(
        ({ id }) => id === arrayItemTypeId,
      ) as any

      expect(arrayItemType).toMatchObject(expectedArrayItemType)
    })
  })
})
