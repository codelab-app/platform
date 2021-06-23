import type { UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Field, FieldMapper } from '../../../models'
import { GetDgraphFieldService } from './get-dgraph-field.service'
import { GetFieldRequest } from './get-field.request'

@Injectable()
export class GetFieldService implements UseCase<GetFieldRequest, Field | null> {
  constructor(
    private getDgraphFieldService: GetDgraphFieldService,
    private fieldMapper: FieldMapper,
  ) {}

  async execute(request: GetFieldRequest): Promise<Field | null> {
    const dgraphField = await this.getDgraphFieldService.execute(request)

    if (!dgraphField) {
      return null
    }

    return this.fieldMapper.map(dgraphField)
  }
}
