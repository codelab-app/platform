import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import type {
  IAtomBoundedContext,
  IComponentBoundedContext,
} from '@codelab/shared/abstract/core'
import { BullModule, Process, Processor } from '@nestjs/bull'
import { CommandBus } from '@nestjs/cqrs'
import type { Job } from 'bull'
import * as env from 'env-var'

export enum QueuePayloadType {
  Atom = 'atom',
  Component = 'component',
}

export const BullRootModule = BullModule.forRoot({
  redis: {
    host: env.get('REDIS_HOST').asString(),
    port: env.get('REDIS_PORT').asInt(),
  },
})

export const BullQueueModule = BullModule.registerQueue({
  name: 'import-queue',
})

@Processor('import-queue')
export class QueueService {
  constructor(private readonly commandBus: CommandBus) {}

  @Process()
  async transcode(job: Job) {
    const { payload, type, user } = job.data

    RequestContext.cls.enterWith(new RequestContext({ user }, {}))

    switch (type) {
      case QueuePayloadType.Atom:
        await this.importAtom(payload)
        break
      case QueuePayloadType.Component:
        await this.importComponent(payload)
        break
      default:
        throw new Error(`Unknown queue element type "${type}"`)
    }
  }

  private async importAtom(atom: IAtomBoundedContext) {
    await this.commandBus.execute(new ImportAtomCommand(atom))
  }

  private async importComponent(component: IComponentBoundedContext) {
    await this.commandBus.execute(new ImportComponentsCommand(component))
  }
}
