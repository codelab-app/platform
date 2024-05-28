import type { IRef } from '@codelab/shared/abstract/core'
import { SchemaKinds } from '@codelab/shared/abstract/core'
import { Kind } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { v4 } from 'uuid'
import { schemaProvider } from './schema.provider'

describe('SchemaProvider', () => {
  it('can validate a ref type', () => {
    const data = { id: v4() }
    const validated = schemaProvider.validate(SchemaKinds.Ref, data)

    expect(validated).toBeTruthy()
  })

  it('can assert a ref type', () => {
    expect(() => {
      const data = {
        id: 4,
      }

      schemaProvider.asserts<IRef>(SchemaKinds.Ref, data)
    }).toThrow()
  })
})
