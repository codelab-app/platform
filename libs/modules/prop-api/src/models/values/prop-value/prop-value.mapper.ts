import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { PropMappingContext } from '../../prop'
import { ArrayValueMapper, DgraphArrayValue } from '../array-value'
import { BooleanValueMapper, DgraphBooleanValue } from '../boolean-value'
import { DgraphFloatValue, FloatValueMapper } from '../float-value'
import { DgraphIntValue, IntValueMapper } from '../int-value'
import { DgraphInterfaceValue, InterfaceValueMapper } from '../interface-value'
import { DgraphStringValue, StringValueMapper } from '../string-value'
import { DgraphPropValue } from './dgraph-prop-value.model'
import { PropValue } from './prop-value.model'

@Injectable()
export class PropValueMapper
  implements IDgraphMapper<DgraphPropValue, PropValue, PropMappingContext>
{
  constructor(
    private arrayValueMapper: ArrayValueMapper,
    private booleanValueMapper: BooleanValueMapper,
    private floatValueMapper: FloatValueMapper,
    private intValueMapper: IntValueMapper,
    private interfaceValueMapper: InterfaceValueMapper,
    private stringValueMapper: StringValueMapper,
  ) {}

  async map(input: DeepPartial<DgraphPropValue>, context: PropMappingContext) {
    const types = input[BaseDgraphFields.DgraphType]
    const type = types ? types[0] : null

    if (!type) {
      throw new Error(`Can't map prop value, dgraph type not found`)
    }

    switch (type) {
      case 'ArrayValue':
        return await this.arrayValueMapper.map(
          input as DgraphArrayValue,
          context,
        )
      case 'BooleanValue':
        return this.booleanValueMapper.map(input as DgraphBooleanValue)
      case 'FloatValue':
        return this.floatValueMapper.map(input as DgraphFloatValue)
      case 'IntValue':
        return this.intValueMapper.map(input as DgraphIntValue)
      case 'InterfaceValue':
        return await this.interfaceValueMapper.map(
          input as DgraphInterfaceValue,
          context,
        )
      case 'StringValue':
        return this.stringValueMapper.map(input as DgraphStringValue)
      default:
        throw new Error(
          `Can't map prop value, dgraph type ${type} not recognized`,
        )
    }
  }
}
