import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphField } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Field } from '../models'

export type FieldAdapterInput = Omit<DgraphField, 'type'>

@Injectable()
export class FieldAdapter extends BaseAdapter<FieldAdapterInput, Field> {
  mapItem({ uid: id, key, name, description }: FieldAdapterInput) {
    return new Field(id, key, name, description || null)
  }
}
