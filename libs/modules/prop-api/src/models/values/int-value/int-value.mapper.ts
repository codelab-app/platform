import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphIntValue, DgraphIntValueFields } from './dgraph-int-value.model'
import { IntValue } from './int-value.model'

@Injectable()
export class IntValueMapper implements IDgraphMapper<DgraphIntValue, IntValue> {
  map(input: DeepPartial<DgraphIntValue>) {
    const dgraphValue = DgraphIntValue.Schema.parse(input)

    const value = new IntValue(
      dgraphValue[BaseDgraphFields.uid],
      dgraphValue[DgraphIntValueFields.value],
    )

    IntValue.Schema.parse(value)

    return value
  }
}
