import { connectNodeId } from '@codelab/shared-domain-orm'
import {
  CreateAppsDocument,
  CreateEnumTypesDocument,
  CreateFieldsDocument,
  type FieldCreateInput,
  GetTypesDocument,
  TypeKind,
} from '@codelab/shared-infra-gqlgen'
import { v4 } from 'uuid'

import {
  batchArrayMutations,
  needsMutationArrayBatching,
} from './batch-array-mutations'

const createFieldInput = (
  overrides?: Partial<FieldCreateInput>,
): FieldCreateInput => ({
  api: connectNodeId(v4()),
  defaultValues: null,
  description: null,
  fieldType: connectNodeId(v4()),
  id: v4(),
  key: 'test',
  name: 'Test Field',
  validationRules: null,
  ...overrides,
})

describe('batch-array-mutations', () => {
  describe('needsMutationArrayBatching', () => {
    it('should return null for queries', () => {
      const result = needsMutationArrayBatching(GetTypesDocument, {
        ids: [],
      })

      expect(result).toBeNull()
    })

    it('should return null for mutations with small arrays', () => {
      const result = needsMutationArrayBatching(CreateFieldsDocument, {
        input: Array(5)
          .fill(null)
          .map(() => createFieldInput()),
      })

      expect(result).toBeNull()
    })

    it('should return config for mutations with large arrays', () => {
      const result = needsMutationArrayBatching(CreateFieldsDocument, {
        input: Array(15)
          .fill(null)
          .map(() => createFieldInput()),
      })

      expect(result).toEqual({
        batchSize: 10,
        fieldName: 'input',
        operationName: 'CreateFields',
      })
    })

    it('should handle non-array fields', () => {
      const result = needsMutationArrayBatching(CreateFieldsDocument, {
        // @ts-expect-error Testing invalid input type
        input: 'not an array',
      })

      expect(result).toBeNull()
    })

    it('should return null for documents without operation type', () => {
      const invalidDocument = {
        toString: () => '{ fields { id } }',
      }

      const result = needsMutationArrayBatching(
        // @ts-expect-error Testing invalid document type
        invalidDocument,
        {
          input: Array(15).fill({ key: 'test' }),
        },
      )

      expect(result).toBeNull()
    })
  })

  describe('batchArrayMutations', () => {
    const mockExecuteRequest = jest.fn()

    beforeEach(() => {
      mockExecuteRequest.mockClear()
    })

    it('should split large array into batches', async () => {
      const input = Array(25)
        .fill(null)
        .map((_, i) =>
          createFieldInput({
            key: `field${i}`,
            name: `Field ${i}`,
          }),
        )

      mockExecuteRequest
        .mockResolvedValueOnce({
          createFields: {
            fields: input.slice(0, 10).map((_, i) => ({ id: `id${i}` })),
          },
        })
        .mockResolvedValueOnce({
          createFields: {
            fields: input.slice(10, 20).map((_, i) => ({ id: `id${i + 10}` })),
          },
        })
        .mockResolvedValueOnce({
          createFields: {
            fields: input.slice(20, 25).map((_, i) => ({ id: `id${i + 20}` })),
          },
        })

      const result = await batchArrayMutations(
        CreateFieldsDocument,
        { input },
        mockExecuteRequest,
        undefined,
        10,
      )

      // Should be called 3 times
      expect(mockExecuteRequest).toHaveBeenCalledTimes(3)

      // First batch
      expect(mockExecuteRequest).toHaveBeenNthCalledWith(
        1,
        CreateFieldsDocument,
        { input: input.slice(0, 10) },
        undefined,
      )

      // Second batch
      expect(mockExecuteRequest).toHaveBeenNthCalledWith(
        2,
        CreateFieldsDocument,
        { input: input.slice(10, 20) },
        undefined,
      )

      // Third batch
      expect(mockExecuteRequest).toHaveBeenNthCalledWith(
        3,
        CreateFieldsDocument,
        { input: input.slice(20, 25) },
        undefined,
      )

      // Merged result should contain all fields
      expect(result).toEqual({
        createFields: {
          fields: Array(25)
            .fill(null)
            .map((_, i) => ({ id: `id${i}` })),
        },
      })
    })

    it('should handle single batch correctly', async () => {
      const input = Array(5)
        .fill(null)
        .map((_, i) =>
          createFieldInput({
            key: `field${i}`,
            name: `Field ${i}`,
          }),
        )

      mockExecuteRequest.mockResolvedValueOnce({
        createFields: { fields: input.map((_, i) => ({ id: `id${i}` })) },
      })

      const result = await batchArrayMutations(
        CreateFieldsDocument,
        { input },
        mockExecuteRequest,
        undefined,
        10,
      )

      expect(mockExecuteRequest).toHaveBeenCalledTimes(1)
      expect(result).toEqual({
        createFields: {
          fields: input.map((_, i) => ({ id: `id${i}` })),
        },
      })
    })

    it('should merge nested arrays correctly', async () => {
      const enumTypeInput = {
        allowedValues: null,
        fieldRefs: null,
        id: v4(),
        kind: TypeKind.EnumType,
        name: 'TestEnum',
        owner: null,
      }

      mockExecuteRequest
        .mockResolvedValueOnce({
          createEnumTypes: {
            enumTypes: [{ id: '1', name: 'Type1' }],
          },
        })
        .mockResolvedValueOnce({
          createEnumTypes: {
            enumTypes: [{ id: '2', name: 'Type2' }],
          },
        })

      const result = await batchArrayMutations(
        CreateEnumTypesDocument,
        { input: Array(15).fill(enumTypeInput) },
        mockExecuteRequest,
        undefined,
        10,
      )

      expect(result).toEqual({
        createEnumTypes: {
          enumTypes: [
            { id: '1', name: 'Type1' },
            { id: '2', name: 'Type2' },
          ],
        },
      })
    })

    it('should handle errors in batch execution', async () => {
      mockExecuteRequest
        .mockResolvedValueOnce({
          createFields: { fields: [{ id: '1' }] },
        })
        .mockRejectedValueOnce(new Error('Batch 2 failed'))

      await expect(
        batchArrayMutations(
          CreateFieldsDocument,
          {
            input: Array(15)
              .fill(null)
              .map(() => createFieldInput()),
          },
          mockExecuteRequest,
          undefined,
          10,
        ),
      ).rejects.toThrow('Batch 2 failed')

      expect(mockExecuteRequest).toHaveBeenCalledTimes(2)
    })

    it('should handle GraphQL mutation response structure', async () => {
      // Mock typical GraphQL response structure like createApps
      mockExecuteRequest
        .mockResolvedValueOnce({
          createApps: {
            apps: [
              { __typename: 'App', id: '1' },
              { __typename: 'App', id: '2' },
            ],
          },
        })
        .mockResolvedValueOnce({
          createApps: {
            apps: [
              { __typename: 'App', id: '3' },
              { __typename: 'App', id: '4' },
            ],
          },
        })

      const appInput = {
        compositeKey: 'test-key',
        domains: null,
        id: v4(),
        owner: null,
        pages: null,
      }

      const result = await batchArrayMutations(
        CreateAppsDocument,
        { input: Array(15).fill(appInput) },
        mockExecuteRequest,
        undefined,
        10,
      )

      // The apps array should be merged
      expect(result).toEqual({
        createApps: {
          apps: [
            { __typename: 'App', id: '1' },
            { __typename: 'App', id: '2' },
            { __typename: 'App', id: '3' },
            { __typename: 'App', id: '4' },
          ],
        },
      })
    })

    it('should not batch queries and execute them normally', async () => {
      const mockResult = { types: [{ id: '1' }, { id: '2' }] }

      mockExecuteRequest.mockResolvedValueOnce(mockResult)

      const result = await batchArrayMutations(
        GetTypesDocument,
        { ids: Array(23).fill('some-id') },
        mockExecuteRequest,
        undefined,
        10,
      )

      // Should execute query without batching
      expect(mockExecuteRequest).toHaveBeenCalledTimes(1)
      expect(mockExecuteRequest).toHaveBeenCalledWith(
        GetTypesDocument,
        { ids: Array(23).fill('some-id') },
        undefined,
      )
      expect(result).toEqual(mockResult)
    })

    it('should only merge arrays at depth 2 (mutation response pattern)', async () => {
      // Test that only depth 2 arrays (mutation pattern) are merged
      mockExecuteRequest
        .mockResolvedValueOnce({
          // Mutation-style response with arrays at depth 2
          createItems: {
            items: [{ id: 'a' }],
          },
          // Arrays at depth 1 should not be merged
          errors: [],
          types: [{ id: '1' }],
        })
        .mockResolvedValueOnce({
          createItems: {
            items: [{ id: 'b' }],
          },
          errors: ['error1'],
          types: [{ id: '2' }],
        })

      const mockMixedDepthDocument = {
        toString: () =>
          'mutation MixedDepthOperation($input: [Input!]!) { createItems(input: $input) { items { id } } types { id } errors }',
      }

      const result = await batchArrayMutations(
        // @ts-expect-error Testing with mock document
        mockMixedDepthDocument,
        { input: Array(15).fill({ name: 'test' }) },
        mockExecuteRequest,
        undefined,
        10,
      )

      // Only depth 2 arrays should be merged
      expect(result).toEqual({
        createItems: {
          items: [{ id: 'a' }, { id: 'b' }],
        },
        // Depth 1 arrays should keep only the first batch's value
        errors: [],
        types: [{ id: '1' }],
      })
    })

    it('should handle empty arrays in batch results', async () => {
      mockExecuteRequest
        .mockResolvedValueOnce({
          createFields: {
            fields: [{ id: '1' }],
          },
        })
        .mockResolvedValueOnce({
          createFields: {
            fields: [],
          },
        })
        .mockResolvedValueOnce({
          createFields: {
            fields: [{ id: '2' }, { id: '3' }],
          },
        })

      const input = Array(25)
        .fill(null)
        .map(() => createFieldInput())

      const result = await batchArrayMutations(
        CreateFieldsDocument,
        { input },
        mockExecuteRequest,
        undefined,
        10,
      )

      expect(result).toEqual({
        createFields: {
          fields: [{ id: '1' }, { id: '2' }, { id: '3' }],
        },
      })
    })
  })
})
