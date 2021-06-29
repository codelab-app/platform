import {
  BaseDgraphFields,
  baseFieldsZodShape,
  DeepPartial,
  IDgraphMapper,
} from '@codelab/backend'
import { FieldMapper } from '@codelab/modules/type-api'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import {
  DgraphInterfaceValueFields,
  dgraphPropValueSchema,
  PropValueMapper,
} from '../values'
import { DgraphProp, DgraphPropFields } from './dgraph-prop.model'
import { Prop } from './prop.model'

export interface PropMappingContext {
  arrayIteration: number
  interfaceIteration: number
}

@Injectable()
export class PropMapper
  implements IDgraphMapper<DgraphProp, Prop, PropMappingContext>
{
  static MappingInterfaceValueSchema: z.ZodSchema<any> = z.object({
    ...baseFieldsZodShape('InterfaceValue'),
    [DgraphInterfaceValueFields.props]: z.lazy(() =>
      PropMapper.InputSchema.array(),
    ),
  })

  // We do not need the whole field to map to a Prop object
  static InputSchema = z.lazy(() =>
    DgraphProp.Schema.omit({
      [DgraphPropFields.field]: true,
      [DgraphPropFields.value]: true,
    }).extend({
      [DgraphPropFields.field]: FieldMapper.inputSchema,
      [DgraphPropFields.value]: z
        .lazy(() =>
          dgraphPropValueSchema.or(PropMapper.MappingInterfaceValueSchema),
        )
        .optional()
        .nullable(),
    }),
  )

  constructor(
    private propValueMapper: PropValueMapper,
    private fieldMapper: FieldMapper,
  ) {}

  async map(input: DeepPartial<DgraphProp>, context?: PropMappingContext) {
    const dgraphProp = PropMapper.InputSchema.parse(input)
    const dgraphValue = dgraphProp[DgraphPropFields.value]
    const id = dgraphProp[BaseDgraphFields.uid]

    const value = dgraphValue
      ? await this.propValueMapper.map(dgraphValue, {
          arrayIteration: context?.arrayIteration || 0,
          interfaceIteration: context?.interfaceIteration || 0,
        })
      : null

    const field = await this.fieldMapper.map(dgraphProp[DgraphPropFields.field])
    const prop = new Prop({ id, field, value })

    Prop.Schema.parse(prop)

    return prop
  }
}
