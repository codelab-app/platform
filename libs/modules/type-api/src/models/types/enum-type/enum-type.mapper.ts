import {
  BaseDgraphFields,
  DeepPartial,
  DgraphArrayMapper,
  IDgraphMapper,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DgraphEnumType, EnumTypeDgraphFields } from './dgraph-enum-type.model'
import { EnumType, enumTypeSchema } from './enum-type.model'
import { EnumTypeValueMapper } from './enum-type-value.mapper'

@Injectable()
export class EnumTypeMapper implements IDgraphMapper<DgraphEnumType, EnumType> {
  constructor(private enumTypeValueMapper: EnumTypeValueMapper) {}

  async map(input: DeepPartial<DgraphEnumType>) {
    const dgraphEnumType = DgraphEnumType.Schema.parse(input)
    const enumType = new EnumType()

    enumType.id = dgraphEnumType[BaseDgraphFields.uid]
    enumType.allowedValues = await new DgraphArrayMapper(
      this.enumTypeValueMapper,
    ).map(dgraphEnumType[EnumTypeDgraphFields.AllowedValues])

    enumTypeSchema.parse(enumType)

    return enumType
  }
}
