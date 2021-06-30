import {
  BaseDgraphFields,
  DeepPartial,
  DgraphArrayMapper,
  IDgraphMapper,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphTypeFields } from '../dgraph-type.model'
import { DgraphEnumType, EnumTypeDgraphFields } from './dgraph-enum-type.model'
import { EnumType } from './enum-type.model'
import { EnumTypeValueMapper } from './enum-type-value.mapper'

@Injectable()
export class EnumTypeMapper implements IDgraphMapper<DgraphEnumType, EnumType> {
  constructor(private enumTypeValueMapper: EnumTypeValueMapper) {}

  async map(input: DeepPartial<DgraphEnumType>) {
    const dgraphEnumType = DgraphEnumType.Schema.parse(input)
    const id = dgraphEnumType[BaseDgraphFields.uid]
    const name = dgraphEnumType[DgraphTypeFields.name]

    const allowedValues = await new DgraphArrayMapper(
      this.enumTypeValueMapper,
    ).map(dgraphEnumType[EnumTypeDgraphFields.AllowedValues])

    const enumType = new EnumType(id, name, allowedValues)

    EnumType.Schema.parse(enumType)

    return enumType
  }
}
