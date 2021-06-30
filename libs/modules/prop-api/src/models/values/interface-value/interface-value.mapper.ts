import {
  BaseDgraphFields,
  DeepPartial,
  DgraphArrayMapper,
  IDgraphMapper,
} from '@codelab/backend'
import { MAX_TYPE_DEPTH } from '@codelab/modules/type-api'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
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

  constructor(
    @Inject(forwardRef(() => PropMapper)) private propMapper: PropMapper,
  ) {
    this.propArrayMapper = new DgraphArrayMapper(propMapper)
  }

  async map(
    input: DeepPartial<DgraphInterfaceValue>,
    context: PropMappingContext,
  ) {
    if (context && context.interfaceIteration > MAX_TYPE_DEPTH) {
      throw new Error('Interface value too nested')
    }

    const dgraphValue = DgraphInterfaceValue.Schema.parse(input)
    const id = dgraphValue[BaseDgraphFields.uid]

    const props = await this.propArrayMapper.map(
      dgraphValue[DgraphInterfaceValueFields.props] as any,
      { ...context, interfaceIteration: context.interfaceIteration + 1 },
    )

    const value = new InterfaceValue(id, props)

    InterfaceValue.Schema.parse(value)

    return value
  }
}
