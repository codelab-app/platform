import { DgraphField } from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { Field } from '../models'

export type FieldMapperInput = Omit<DgraphField, 'type'>

@Injectable()
export class FieldMapper implements Mapper<FieldMapperInput, Field> {
  async map({ uid: id, key, name, description }: FieldMapperInput) {
    return new Field(id, key, name, description || null)
  }
}
