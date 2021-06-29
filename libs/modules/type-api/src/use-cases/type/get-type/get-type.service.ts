import { UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Type, TypeMapper } from '../../../models'
import { GetDgraphTypeService } from '../get-dgraph-type'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService implements UseCase<GetTypeRequest, Type | null> {
  constructor(
    private typeMapper: TypeMapper,
    private getDgraphTypeService: GetDgraphTypeService,
  ) {}

  async execute({ input: { typeId } }: GetTypeRequest): Promise<Type | null> {
    const dgraphType = await this.getDgraphTypeService.execute({ typeId })

    if (!dgraphType) {
      return null
    }

    return this.typeMapper.map(dgraphType)
  }
}
