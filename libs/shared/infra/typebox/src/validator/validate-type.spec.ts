import { TypeExportSchema } from '@codelab/shared/abstract/core'

import { validateAndClean } from './validate'

describe('TypeExportSchema', () => {
  it('should validate known type (ActionType) and remove "owner" & extra fields', () => {
    const input = {
      __typename: 'UnionType',
      extraField: 'remove me too',
      id: 'some-id',
      kind: 'UnionType',
      name: 'AtomChildren Union',
      owner: 'remove-me',
      typesOfUnionType: [
        {
          __typename: 'CodeMirrorType',
          id: '010c4f5a-434b-4c3e-a0ed-01eb1f78172a',
          kind: 'CodeMirrorType',
          name: 'Typescript Code',
        },
        {
          __typename: 'RichTextType',
          id: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
          kind: 'RichTextType',
          name: 'RichTextType',
        },
      ],
    }

    const result = validateAndClean(TypeExportSchema, input)

    // The omitted "owner" field should not appear in the output
    // The extra field should also be removed
    expect(result).toEqual({
      __typename: 'UnionType',
      id: 'some-id',
      kind: 'UnionType',
      name: 'AtomChildren Union',
      typesOfUnionType: [
        {
          __typename: 'CodeMirrorType',
          id: '010c4f5a-434b-4c3e-a0ed-01eb1f78172a',
          // kind: 'CodeMirrorType',
          // name: 'Typescript Code',
        },
        {
          __typename: 'RichTextType',
          id: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
          // kind: 'RichTextType',
          // name: 'RichTextType',
        },
      ],
    })
  })
})
