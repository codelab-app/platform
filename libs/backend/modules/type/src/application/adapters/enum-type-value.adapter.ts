import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphEnumTypeValue } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { EnumTypeValue } from '../../domain'

@Injectable()
export class EnumTypeValueAdapter extends BaseAdapter<
  DgraphEnumTypeValue,
  EnumTypeValue
> {
  mapItem({ name, stringValue: value, uid: id }: DgraphEnumTypeValue) {
    return new EnumTypeValue({
      id,
      name,
      value,
    })
  }
}
