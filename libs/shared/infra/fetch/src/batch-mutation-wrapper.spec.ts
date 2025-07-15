import {
  executeWithArrayBatching,
  needsArrayBatching,
} from './batch-mutation-wrapper'

describe('batch-mutation-wrapper', () => {
  describe('needsArrayBatching', () => {
    it('should return null for non-configured mutations', () => {
      const result = needsArrayBatching('SomeOtherMutation', { input: [] })

      expect(result).toBeNull()
    })

    it('should return null for undefined operation name', () => {
      const result = needsArrayBatching(undefined, { input: [] })

      expect(result).toBeNull()
    })

    it('should return null for small arrays', () => {
      const result = needsArrayBatching('createFields', {
        input: Array(5).fill({ key: 'test' }),
      })

      expect(result).toBeNull()
    })

    it('should return config for large arrays', () => {
      const result = needsArrayBatching('createFields', {
        input: Array(15).fill({ key: 'test' }),
      })

      expect(result).toEqual({
        batchSize: 10,
        fieldName: 'input',
      })
    })

    it('should handle non-array fields', () => {
      const result = needsArrayBatching('createFields', {
        input: 'not an array',
      })

      expect(result).toBeNull()
    })
  })

  describe('executeWithArrayBatching', () => {
    const mockDocument = {
      toString: () =>
        'mutation CreateFields($input: [FieldCreateInput!]!) { createFields(input: $input) { fields { id } } }',
    }

    const mockExecuteRequest = jest.fn()

    beforeEach(() => {
      mockExecuteRequest.mockClear()
    })

    it('should split large array into batches', async () => {
      const input = Array(25)
        .fill(null)
        .map((_, i) => ({
          id: `id${i}`,
          key: `field${i}`,
        }))

      mockExecuteRequest
        .mockResolvedValueOnce({
          createFields: {
            fields: input.slice(0, 10).map((field) => ({ id: field.id })),
          },
        })
        .mockResolvedValueOnce({
          createFields: {
            fields: input.slice(10, 20).map((field) => ({ id: field.id })),
          },
        })
        .mockResolvedValueOnce({
          createFields: {
            fields: input.slice(20, 25).map((field) => ({ id: field.id })),
          },
        })

      const result = await executeWithArrayBatching(
        mockDocument as never,
        { input },
        'createFields',
        { batchSize: 10, fieldName: 'input' },
        mockExecuteRequest,
      )

      // Should be called 3 times
      expect(mockExecuteRequest).toHaveBeenCalledTimes(3)

      // First batch
      expect(mockExecuteRequest).toHaveBeenNthCalledWith(
        1,
        mockDocument,
        { input: input.slice(0, 10) },
        undefined,
      )

      // Second batch
      expect(mockExecuteRequest).toHaveBeenNthCalledWith(
        2,
        mockDocument,
        { input: input.slice(10, 20) },
        undefined,
      )

      // Third batch
      expect(mockExecuteRequest).toHaveBeenNthCalledWith(
        3,
        mockDocument,
        { input: input.slice(20, 25) },
        undefined,
      )

      // Merged result should contain all fields
      expect(result).toEqual({
        createFields: {
          fields: input.map((field) => ({ id: field.id })),
        },
      })
    })

    it('should handle single batch correctly', async () => {
      const input = Array(5)
        .fill(null)
        .map((_, i) => ({
          id: `id${i}`,
          key: `field${i}`,
        }))

      mockExecuteRequest.mockResolvedValueOnce({
        createFields: { fields: input.map((field) => ({ id: field.id })) },
      })

      const result = await executeWithArrayBatching(
        mockDocument as never,
        { input },
        'createFields',
        { batchSize: 10, fieldName: 'input' },
        mockExecuteRequest,
      )

      expect(mockExecuteRequest).toHaveBeenCalledTimes(1)
      expect(result).toEqual({
        createFields: {
          fields: input.map((field) => ({ id: field.id })),
        },
      })
    })

    it('should merge nested arrays correctly', async () => {
      mockExecuteRequest
        .mockResolvedValueOnce({
          createTypes: {
            count: 1,
            types: [{ id: '1', name: 'Type1' }],
          },
        })
        .mockResolvedValueOnce({
          createTypes: {
            count: 1,
            types: [{ id: '2', name: 'Type2' }],
          },
        })

      const result = await executeWithArrayBatching(
        mockDocument as never,
        { input: Array(15).fill({ name: 'test' }) },
        'createTypes',
        { batchSize: 10, fieldName: 'input' },
        mockExecuteRequest,
      )

      expect(result).toEqual({
        createTypes: {
          count: 1,
          types: [
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
        executeWithArrayBatching(
          mockDocument as never,
          { input: Array(15).fill({ key: 'test' }) },
          'createFields',
          { batchSize: 10, fieldName: 'input' },
          mockExecuteRequest,
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

      const result = await executeWithArrayBatching(
        mockDocument as never,
        { input: Array(15).fill({ name: 'test' }) },
        'createApps',
        { batchSize: 10, fieldName: 'input' },
        mockExecuteRequest,
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
  })
})
