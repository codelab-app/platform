import {
  BaseDgraphFields,
  DeepPartial,
  DgraphArrayMapper,
  IDgraphMapper,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphProp, Prop, PropMapper, PropMappingContext } from '../../prop'
import {
  DgraphInterfaceValue,
  DgraphInterfaceValueFields,
} from './dgraph-interface-value.model'
import { InterfaceValue } from './interface-value.model'

@Injectable()
export class InterfaceValueMapper
  implements
    IDgraphMapper<DgraphInterfaceValue, InterfaceValue, PropMappingContext>
{
  private propArrayMapper: DgraphArrayMapper<
    DgraphProp,
    Prop,
    PropMappingContext
  >

  constructor(private propMapper: PropMapper) {
    this.propArrayMapper = new DgraphArrayMapper(propMapper)
  }

  async map(
    input: DeepPartial<DgraphInterfaceValue>,
    context: PropMappingContext,
  ) {
    if (context && context.interfaceIteration > 20) {
      throw new Error('Interface value too nested')
    }

    const dgraphValue = DgraphInterfaceValue.Schema.parse(input)
    const value = new InterfaceValue()

    value.id = dgraphValue[BaseDgraphFields.uid]
    value.props = await this.propArrayMapper.map(
      dgraphValue[DgraphInterfaceValueFields.props],
      { ...context, interfaceIteration: context.interfaceIteration + 1 },
    )

    DgraphInterfaceValue.Schema.parse(value)

    return value
  }
}
