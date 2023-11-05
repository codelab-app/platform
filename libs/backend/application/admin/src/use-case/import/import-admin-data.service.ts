import { ReadAdminDataService } from '@codelab/backend/application/shared'
import { ImportTagsCommand } from '@codelab/backend/application/tag'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import type { AuthenticatedRequest } from '@codelab/backend/domain/shared/auth'
import {
  Span,
  TraceService,
  withActiveSpan,
} from '@codelab/backend/infra/adapter/otel'
import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import {
  IAtomBoundedContext,
  ImportDto,
  Stage,
} from '@codelab/shared/abstract/core'
import { flattenWithPrefix } from '@codelab/shared/infra/otel'
import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Queue } from 'bull'
import { QueuePayloadType } from './bull-queue.module'

/**
 * During `save`, we'll want to replace the owner with the current
 */
@Injectable()
export class ImportAdminDataService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly traceService: TraceService,
    private readonly readAdminDataService: ReadAdminDataService,
    @InjectQueue('import-queue') private importQueue: Queue,
  ) {}

  @Span()
  async import({ adminDataPath }: ImportDto) {
    if (adminDataPath) {
      this.readAdminDataService.migrationDataService.basePaths = adminDataPath
    }

    this.readAdminDataService.partiallySeed =
      process.env['NX_TASK_TARGET_CONFIGURATION'] === Stage.CI

    /**
     * System types must be seeded first, so other types can reference it
     */
    await this.importSystemTypes()

    await this.importTags()

    await this.importAtoms()

    await this.importComponents()
  }

  @Span()
  private async importAtom(atom: IAtomBoundedContext) {
    const span = this.traceService.getSpan()

    span?.setAttributes(flattenWithPrefix(atom))

    const { user } = RequestContext.currentContext?.req as AuthenticatedRequest
    const payload = atom
    const type = QueuePayloadType.Atom

    await this.importQueue.add({ payload, type, user })
  }

  private async importAtoms() {
    for (const atom of this.readAdminDataService.atoms) {
      // const attributes = pick(atomData.atom, ['name'])
      // this.traceService.getSpan()?.setAttributes(attributes)
      await withActiveSpan(`${atom.atom.name}`, () => this.importAtom(atom))
    }
  }

  private async importComponents() {
    const { user } = RequestContext.currentContext?.req as AuthenticatedRequest
    const type = QueuePayloadType.Component

    for (const payload of this.readAdminDataService.components) {
      await this.importQueue.add({ payload, type, user })
    }
  }

  @Span()
  private async importSystemTypes() {
    return this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )
  }

  @Span()
  private async importTags() {
    const { tags } = this.readAdminDataService

    return this.commandBus.execute<ImportTagsCommand, void>(
      new ImportTagsCommand(tags),
    )
  }
}
