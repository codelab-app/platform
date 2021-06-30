import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  DgraphEnumTypeValue,
  EnumTypeValueDgraphFields,
} from './dgraph-enum-type-value.model'
import { EnumTypeValue } from './enum-type-value.model'

@Injectable()
export class EnumTypeValueMapper
  implements IDgraphMapper<DgraphEnumTypeValue, EnumTypeValue>
{
  map(input: DeepPartial<DgraphEnumTypeValue>) {
    const dgraphValue = DgraphEnumTypeValue.Schema.parse(input)
    const id = dgraphValue[BaseDgraphFields.uid]
    const name = dgraphValue[EnumTypeValueDgraphFields.name]
    const value = dgraphValue[EnumTypeValueDgraphFields.value]
    const enumTypeValue = new EnumTypeValue(id, name || null, value)

    EnumTypeValue.Schema.parse(enumTypeValue)

    return enumTypeValue
  }
}
