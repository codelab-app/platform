import {
  BaseDgraphFields,
  baseFieldsZodShape,
  DeepPartial,
  IDgraphMapper,
} from '@codelab/backend'
import { DgraphField, FieldMapper } from '@codelab/modules/type-api'
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
  fieldContext?: Map<string, DeepPartial<DgraphField>>
}

const defaultContext = {
  arrayIteration: 0,
  interfaceIteration: 0,
  fieldContext: new Map(),
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
      [DgraphPropFields.field]: z.union([
        FieldMapper.inputSchema,
        z.object({ [BaseDgraphFields.uid]: z.string() }),
      ]),
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
    context = { ...defaultContext, ...context }

    const dgraphProp = PropMapper.InputSchema.parse(input)
    const dgraphValue = dgraphProp[DgraphPropFields.value]
    const id = dgraphProp[BaseDgraphFields.uid]

    let dField: DeepPartial<DgraphField> | undefined =
      dgraphProp[DgraphPropFields.field]

    if (!(dField as any)[BaseDgraphFields.DgraphType]) {
      if (context?.fieldContext) {
        dField = context?.fieldContext.get(
          dField[BaseDgraphFields.uid] as string,
        )
      }
    }

    if (dField) {
      context?.fieldContext?.set(dField[BaseDgraphFields.uid] as string, dField)
    }

    const field = await this.fieldMapper.map(dField as any)

    const value = dgraphValue
      ? await this.propValueMapper.map(dgraphValue, {
          ...context,
        })
      : null

    const prop = new Prop({ id, field, value })

    Prop.Schema.parse(prop)

    return prop
  }
}
