import { JSONSchema7 } from 'json-schema'
import { filterAddChildVertexInputSchema } from './filterAddChildVertexInputSchema'
describe('filterAddChildVertexInputSchema', () => {
  const nonAppropriateSchema: JSONSchema7 = {
    type: 'object',
    properties: {
      vertex: {
        $ref: '#/definitions/OtherRef',
      },
    },
    definitions: {
      OtherRef: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['1'],
          },
        },
      },
    },
  }
  const AddChildVertexInputSchema: JSONSchema7 = {
    type: 'object',
    properties: {
      vertex: {
        $ref: '#/definitions/CreateVertexInput',
      },
    },
    definitions: {
      CreateVertexInput: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'React_Fragment',
              'React_Grid_Row',
              'React_Grid_Col',
            ],
          },
        },
      },
    },
  }
  const FilteredAddChildVertexInputSchema: JSONSchema7 = {
    type: 'object',
    properties: {
      vertex: {
        $ref: '#/definitions/CreateVertexInput',
      },
    },
    definitions: {
      CreateVertexInput: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['React_Grid_Col'],
          },
        },
      },
    },
  }
  it(`should return the same scheme if it's not AddChildVertexInputSchema`, () => {
    expect(
      filterAddChildVertexInputSchema('React_Html_Div', nonAppropriateSchema),
    ).toEqual(nonAppropriateSchema)
  })
  it(`should return the same scheme if there parent isn't in the list`, () => {
    expect(
      filterAddChildVertexInputSchema('React_Empty', AddChildVertexInputSchema),
    ).toEqual(AddChildVertexInputSchema)
  })
  it(`should return the same scheme if there are no any restrictions in the list`, () => {
    expect(
      filterAddChildVertexInputSchema(
        'React_Fragment',
        nonAppropriateSchema,
      ),
    ).toEqual(nonAppropriateSchema)
  })
  it(`should return the scheme with filtered enum`, () => {
    expect(
      filterAddChildVertexInputSchema(
        'React_Grid_Row',
        AddChildVertexInputSchema,
      ),
    ).toEqual(FilteredAddChildVertexInputSchema)
  })
})
