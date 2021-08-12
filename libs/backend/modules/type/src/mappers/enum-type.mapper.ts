import { DgraphEnumType, DgraphEnumTypeValue } from '@codelab/backend/infra'
import { ArrayMapper, Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { EnumType, EnumTypeValue } from '../models'
import { EnumTypeValueMapper } from './enum-type-value.mapper'

@Injectable()
export class EnumTypeMapper implements Mapper<DgraphEnumType, EnumType> {
  private readonly valuesMapper: ArrayMapper<DgraphEnumTypeValue, EnumTypeValue>

  constructor(enumTypeValueMapper: EnumTypeValueMapper) {
    this.valuesMapper = new ArrayMapper(enumTypeValueMapper)
  }

  async map({
    name,
    uid: id,
    allowedValues: dgraphAllowedValues,
  }: DgraphEnumType) {
    const allowedValues = await this.valuesMapper.map(dgraphAllowedValues)

    return new EnumType(id, name, allowedValues)
  }
}
