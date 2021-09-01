import { UseCasePort } from '@codelab/backend/abstract/core'
import { DgraphService } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResetDataService implements UseCasePort<void, void> {
  constructor(private dgraphService: DgraphService) {}

  async execute(): Promise<void> {
    this.dgraphService.resetData()
  }
}
