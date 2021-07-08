import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { DgraphField, DgraphFieldFields } from './dgraph-field.model'
import { dgraphFieldSchema } from './dgraph-field-schema'
import { Field, fieldSchema } from './field.model'

@Injectable()
export class FieldMapper implements IDgraphMapper<DgraphField, Field> {
  // We don't need the whole type and interface object, just their ids
  static inputSchema = z.intersection(
    dgraphFieldSchema.schema.omit({
      [DgraphFieldFields.Type]: true,
      [DgraphFieldFields.Interface]: true,
    }),
    z.object({
      [DgraphFieldFields.Type]: z.object({
        [BaseDgraphFields.uid]: z.string(),
      }),
      [DgraphFieldFields.Interface]: z.object({
        [BaseDgraphFields.uid]: z.string(),
      }),
    }),
  )

  async map(input: DeepPartial<DgraphField>) {
    const dgraphField = FieldMapper.inputSchema.parse(input)
    const field = new Field()

    field.id = dgraphField[BaseDgraphFields.uid]
    field.key = dgraphField[DgraphFieldFields.Key]
    field.name = dgraphField[DgraphFieldFields.Name]
    field.description = dgraphField[DgraphFieldFields.Description] || null
    field.typeId = dgraphField[DgraphFieldFields.Type]?.uid
    field.interface = {
      id: dgraphField[DgraphFieldFields.Interface][BaseDgraphFields.uid],
    }

    fieldSchema.parse(field)

    return field
  }
}
