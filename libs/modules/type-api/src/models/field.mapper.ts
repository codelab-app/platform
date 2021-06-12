import {
  BaseDgraphFields,
  DeepPartial,
  DgraphArrayMapper,
  IDgraphMapper,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { DecoratorMapper } from './decorators'
import { DgraphField, FieldDgraphFields } from './dgraph-field.model'
import { Field, fieldSchema } from './field.model'

@Injectable()
export class FieldMapper implements IDgraphMapper<DgraphField, Field> {
  static inputSchema = z.intersection(
    DgraphField.Schema.omit({
      [FieldDgraphFields.Type]: true,
    }),
    z.object({
      [FieldDgraphFields.Type]: z.object({
        [BaseDgraphFields.uid]: z.string(),
      }),
    }),
  )

  constructor(private decoratorMapper: DecoratorMapper) {}

  async map(input: DeepPartial<DgraphField>) {
    const dgraphField = FieldMapper.inputSchema.parse(input)
    const field = new Field()

    field.id = dgraphField[BaseDgraphFields.uid]
    field.key = dgraphField[FieldDgraphFields.Key]
    field.name = dgraphField[FieldDgraphFields.Name]
    field.description = dgraphField[FieldDgraphFields.Description] || null
    field.typeId = dgraphField[FieldDgraphFields.Type]?.uid
    field.decorators = await new DgraphArrayMapper(this.decoratorMapper).map(
      dgraphField[FieldDgraphFields.Decorators],
    )

    fieldSchema.parse(field)

    return field
  }
}
