import type { ITypeDTO } from '@codelab/shared/abstract/core'
import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'

@Processor('import-admin-data')
export class CommandHandlerService {
  @Process()
  async import(job: Job<ITypeDTO>) {
    console.log(job.data)
  }
}
