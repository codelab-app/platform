import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
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
  constructor(private propValueMapper: PropValueMapper) {}

  async map(input: DeepPartial<DgraphProp>, context?: PropMappingContext) {
    const dgraphProp = DgraphProp.Schema.parse(input)
    const prop = new Prop()

    prop.id = dgraphProp[BaseDgraphFields.uid]

    const dgraphValue = dgraphProp[DgraphPropFields.value]
    prop.value = dgraphValue
      ? await this.propValueMapper.map(dgraphValue, {
          arrayIteration: context?.arrayIteration || 0,
          interfaceIteration: context?.interfaceIteration || 0,
        })
      : null

    DgraphProp.Schema.parse(prop)

    return prop
  }
}
