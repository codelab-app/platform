import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphEnumType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { EnumType } from '../../domain'
import { EnumTypeValueAdapter } from './enum-type-value.adapter'

@Injectable()
export class EnumTypeAdapter extends BaseAdapter<DgraphEnumType, EnumType> {
  constructor(private readonly enumTypeValueAdapter: EnumTypeValueAdapter) {
    super()
  }

  mapItem({
    name,
    uid: id,
    allowedValues: dgraphAllowedValues,
    tags,
  }: DgraphEnumType) {
    const allowedValues = this.enumTypeValueAdapter.map(dgraphAllowedValues)

    return new EnumType({
      id,
      name,
      allowedValues,
      tags,
    })
  }
}
