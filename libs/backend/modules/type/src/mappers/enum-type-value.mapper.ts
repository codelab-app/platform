import { DgraphEnumTypeValue } from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { EnumTypeValue } from '../models'

@Injectable()
export class EnumTypeValueMapper
  implements Mapper<DgraphEnumTypeValue, EnumTypeValue>
{
  map({ name, stringValue: value, uid: id }: DgraphEnumTypeValue) {
    return new EnumTypeValue(id, name || null, value)
  }
}
