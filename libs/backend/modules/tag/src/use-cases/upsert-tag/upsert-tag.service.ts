import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { CreateTagService } from '../create-tag'
import { GetTagService } from '../get-tag'
import { UpdateTagService } from '../update-tag'
import { UpsertTagRequest } from './upsert-tag.request'

@Injectable()
export class UpsertTagService extends DgraphUseCase<UpsertTagRequest, any> {
  constructor(
    dgraph: DgraphRepository,
    private getTagService: GetTagService,
    private updateTagService: UpdateTagService,
    private createTagService: CreateTagService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    { currentUser, input }: UpsertTagRequest,
    txn: Txn,
  ) {
    const { where, data } = input

    if (where?.id && where?.name) {
      throw new Error('At most 1 where')
    }

    if (where?.id) {
      const tag = await this.getTagService.execute({ where: { id: where.id } })

      if (tag) {
        return await this.updateTagService.execute({
          input: {
            id: tag.uid,
            data,
          },
        })
      }
    }

    if (where?.name) {
      const tag = await this.getTagService.execute({
        where: { name: where.name },
      })

      if (tag) {
        return await this.updateTagService.execute({
          input: {
            id: tag.uid,
            data,
          },
        })
      }
    }

    return await this.createTagService.execute({ input: data, currentUser })
  }
}
