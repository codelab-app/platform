import { Type } from '@sinclair/typebox'

import { validateAndClean } from './validate'

describe('with nested discriminated unions', () => {
  const schema = Type.Object({
    content: Type.Union(
      [
        Type.Object({
          formatting: Type.Union(
            [
              Type.Object({
                style: Type.Literal('bold'),
                weight: Type.Number(),
              }),
              Type.Object({
                angle: Type.Number(),
                style: Type.Literal('italic'),
              }),
            ],
            { discriminantKey: 'style' },
          ),
          text: Type.String(),
          type: Type.Literal('text'),
        }),
        Type.Object({
          dimensions: Type.Object({
            height: Type.Number(),
            width: Type.Number(),
          }),
          type: Type.Literal('image'),
          url: Type.String(),
        }),
      ],
      { discriminantKey: 'type' },
    ),
    name: Type.String(),
  })

  it('should validate nested text content with bold formatting', () => {
    const input = {
      content: {
        extra: 'remove me too',
        formatting: {
          extra: 'remove me',
          style: 'bold',
          weight: 700,
        },
        text: 'Hello',
        type: 'text',
      },
      name: 'Test',
    }

    const result = validateAndClean(schema, input)

    expect(result).toEqual({
      content: {
        formatting: {
          style: 'bold',
          weight: 700,
        },
        text: 'Hello',
        type: 'text',
      },
      name: 'Test',
    })
  })

  it('should validate nested text content with italic formatting', () => {
    const input = {
      content: {
        formatting: {
          angle: 15,
          style: 'italic',
        },
        text: 'Hello',
        type: 'text',
      },
      name: 'Test',
    }

    const result = validateAndClean(schema, input)

    expect(result).toEqual({
      content: {
        formatting: {
          angle: 15,
          style: 'italic',
        },
        text: 'Hello',
        type: 'text',
      },
      name: 'Test',
    })
  })

  it('should throw error when nested discriminant is invalid', () => {
    const input = {
      content: {
        formatting: {
          // invalid style
          style: 'underline',
          weight: 700,
        },
        text: 'Hello',
        type: 'text',
      },
      name: 'Test',
    }

    expect(() => validateAndClean(schema, input)).toThrow()
  })
})
