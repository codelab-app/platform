import {
  BaseDgraphFields,
  DeepPartial,
  DgraphArrayMapper,
  IDgraphMapper,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { PropMappingContext } from '../../prop'
import { DgraphPropValue, PropValue, PropValueMapper } from '../prop-value'
import { ArrayValue } from './array-value.model'
import {
  DgraphArrayValue,
  DgraphArrayValueFields,
} from './dgraph-array-value.model'

@Injectable()
export class ArrayValueMapper
  implements IDgraphMapper<DgraphArrayValue, ArrayValue, PropMappingContext>
{
  private propValueArrayMapper: DgraphArrayMapper<
    DgraphPropValue,
    PropValue,
    PropMappingContext
  >

  constructor(private propValueMapper: PropValueMapper) {
    this.propValueArrayMapper = new DgraphArrayMapper(propValueMapper)
  }

  async map(input: DeepPartial<DgraphArrayValue>, context: PropMappingContext) {
    if (context?.arrayIteration || 0 > 20) {
      throw new Error('Arrays too nested in value')
    }

    const dgraphValue = DgraphArrayValue.Schema.parse(input)
    const value = new ArrayValue(dgraphValue[BaseDgraphFields.uid])

    value.values = await this.propValueArrayMapper.map(
      dgraphValue[DgraphArrayValueFields.values],
      { ...context, arrayIteration: (context?.arrayIteration || 0) + 1 },
    )

    ArrayValue.Schema.parse(value)

    return value
  }
}
