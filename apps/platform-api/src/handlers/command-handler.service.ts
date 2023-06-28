import type { ITypeDTO } from '@codelab/shared/abstract/core'
import { Process, Processor } from '@nestjs/bull'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Job } from 'bull'

@Processor('import-admin-data')
export class CommandHandlerService {
  @Process()
  async import(job: Job<ITypeDTO>) {
    console.log(job.data)
  }
}
