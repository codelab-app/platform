import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  DgraphFloatValue,
  DgraphFloatValueFields,
} from './dgraph-float-value.model'
import { FloatValue } from './float-value.model'

@Injectable()
export class FloatValueMapper
  implements IDgraphMapper<DgraphFloatValue, FloatValue>
{
  map(input: DeepPartial<DgraphFloatValue>) {
    const dgraphValue = DgraphFloatValue.Schema.parse(input)
    const value = new FloatValue()

    value.id = dgraphValue[BaseDgraphFields.uid]
    value.value = dgraphValue[DgraphFloatValueFields.value]

    DgraphFloatValue.Schema.parse(value)

    return value
  }
}
