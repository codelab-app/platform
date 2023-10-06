import type {
  Tag,
  TagOptions,
  TagWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  OgmService,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { type ITagDTO } from '@codelab/shared/abstract/core'
import {
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TagRepository extends AbstractRepository<
  ITagDTO,
  Tag,
  TagWhere,
  TagOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
  }

  /**
   * If parent or children exists, then we should connect them
   */
  protected async _add(tags: Array<ITagDTO>) {
    return (
      await (
        await this.ogmService.Tag
      ).create({
        input: tags.map(({ children, descendants, parent, ...tag }) => ({
          ...tag,
          children: connectNodeIds(children?.map((child) => child.id)),
          owner: connectOwner(this.authService.currentUser),
          // parent: connectNodeId(parent?.id),
        })),
      })
    ).tags
  }

  protected async _find({
    options,
    where,
  }: {
    where?: TagWhere
    options?: TagOptions
  }) {
    return await (
      await this.ogmService.Tag
    ).find({
      options,
      selectionSet: `{ ${tagSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { children, descendants, id, parent, ...tag }: ITagDTO,
    where: TagWhere,
  ) {
    // Get existing tag so we know what to connect/disconnect
    const existing = await this.findOne(where)

    if (!existing) {
      return undefined
    }

    /**
     * Parent
     */
    const parentTagToConnect = parent?.id
    const childrenTagsToConnect = children?.map((child) => child.id)

    // cLog('Existing:', tag, 'Tags to connect', parentTagToConnect)

    return (
      await (
        await this.ogmService.Tag
      ).update({
        update: {
          ...tag,
          /**
           * This causes a bug where some nodes aren't connected, can't figure out why maybe race condition
           *
           * It is also unnecessary to have both.
           */
          children: reconnectNodeIds(childrenTagsToConnect),
          // parent: reconnectNodeId(parentTagToConnect),
        },
        where,
      })
    ).tags[0]
  }
}
