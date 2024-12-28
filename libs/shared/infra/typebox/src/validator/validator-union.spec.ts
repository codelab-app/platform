import { Type } from '@sinclair/typebox'

import { NestedValidator } from './nested-validator'

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

    const validator = new NestedValidator(schema)
    const result = validator.validateAndClean(input)

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

    const validator = new NestedValidator(schema)
    const result = validator.validateAndClean(input)

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

    const validator = new NestedValidator(schema)

    expect(() => validator.validateAndClean(input)).toThrow()
  })
})

describe('with nested objects in top-level union', () => {
  const schema = Type.Union(
    [
      Type.Object({
        metadata: Type.Object({
          author: Type.String(),
          tags: Type.Array(Type.String()),
        }),
        settings: Type.Object({
          color: Type.String(),
          fontSize: Type.Number(),
        }),
        type: Type.Literal('article'),
      }),
      Type.Object({
        metadata: Type.Object({
          duration: Type.Number(),
          resolution: Type.String(),
        }),
        settings: Type.Object({
          autoplay: Type.Boolean(),
          volume: Type.Number(),
        }),
        type: Type.Literal('video'),
      }),
    ],
    { discriminantKey: 'type' },
  )

  it('should clean nested objects in article type', () => {
    const input = {
      metadata: {
        author: 'John Doe',
        // Should be removed
        extraField: 'should be removed',
        tags: ['tech', 'programming'],
      },
      settings: {
        color: '#000000',
        // Should be removed
        extraSetting: 'remove this',
        fontSize: 16,
      },
      type: 'article',
    }

    const validator = new NestedValidator(schema)
    const result = validator.validateAndClean(input)

    expect(result).toEqual({
      metadata: {
        author: 'John Doe',
        tags: ['tech', 'programming'],
      },
      settings: {
        color: '#000000',
        fontSize: 16,
      },
      type: 'article',
    })
  })

  it('should clean nested objects in video type', () => {
    const input = {
      metadata: {
        duration: 120,
        extraMetadata: 'should be removed',
        resolution: '1080p',
      },
      settings: {
        autoplay: true,
        extraSetting: 'remove this too',
        volume: 0.8,
      },
      type: 'video',
    }

    const validator = new NestedValidator(schema)
    const result = validator.validateAndClean(input)

    expect(result).toEqual({
      metadata: {
        duration: 120,
        resolution: '1080p',
      },
      settings: {
        autoplay: true,
        volume: 0.8,
      },
      type: 'video',
    })
  })

  it('should throw error when nested object properties are invalid', () => {
    const input = {
      metadata: {
        // should be string
        author: 123,
        // should be array of strings
        tags: ['tech', 456],
      },
      settings: {
        color: '#000000',
        fontSize: 16,
      },
      type: 'article',
    }

    const validator = new NestedValidator(schema)

    expect(() => validator.validateAndClean(input)).toThrow()
  })
})
