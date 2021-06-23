import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { FieldMapper } from '@codelab/modules/type-api'
import { Injectable } from '@nestjs/common'
import { PropValueMapper } from '../values'
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
  constructor(
    private propValueMapper: PropValueMapper,
    private fieldMapper: FieldMapper,
  ) {}

  async map(input: DeepPartial<DgraphProp>, context?: PropMappingContext) {
    const dgraphProp = DgraphProp.Schema.omit({
      [DgraphPropFields.field]: true,
    })
      .extend({
        [DgraphPropFields.field]: FieldMapper.inputSchema,
      })
      .parse(input)

    const dgraphValue = dgraphProp[DgraphPropFields.value]

    const value = dgraphValue
      ? await this.propValueMapper.map(dgraphValue, {
          arrayIteration: context?.arrayIteration || 0,
          interfaceIteration: context?.interfaceIteration || 0,
        })
      : null

    const prop = new Prop({
      id: dgraphProp[BaseDgraphFields.uid],
      field: await this.fieldMapper.map(dgraphProp[DgraphPropFields.field]),
      value,
    })

    Prop.Schema.parse(prop)

    return prop
  }
}
