import { mergeDeep } from 'remeda'

describe('mergeDeep function', () => {
  it('should deeply merge two objects', () => {
    // Arrange
    const baseSchema = {
      properties: {
        defaultValues: null,
        id: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['id'],
    }

    const extensionSchema = {
      properties: {
        defaultValues: {
          properties: {
            value: { type: 'string' },
          },
          type: 'object',
        },
      },
    }

    // Act
    const result = mergeDeep(baseSchema, extensionSchema)

    // Assert
    expect(result).toEqual({
      properties: {
        defaultValues: {
          properties: {
            value: { type: 'string' },
          },
          type: 'object',
        },
        id: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['id'],
    })
  })

  it('should override primitive values', () => {
    // Arrange
    const original = { active: false, count: 1 }
    const override = { active: true }
    // Act
    const result = mergeDeep(original, override)

    // Assert
    expect(result).toEqual({ active: true, count: 1 })
  })
})
