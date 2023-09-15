import type {
  Element,
  ElementOptions,
  ElementWhere,
} from '@codelab/backend/abstract/codegen'
import {
  elementSelectionSet,
  getDescendantsCypher,
  Neo4jService,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  type ICreateElementDTO,
  type IElementDTO,
} from '@codelab/shared/abstract/core'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import type { Node } from 'neo4j-driver'

@Injectable()
export class ElementRepository extends AbstractRepository<
  IElementDTO,
  Element,
  ElementWhere,
  ElementOptions
> {
  constructor(
    private ogmService: OgmService,
    private neo4jService: Neo4jService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ElementWhere
    options?: ElementOptions
  }) {
    return await (
      await this.ogmService.Element
    ).find({
      options,
      selectionSet: elementSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(elements: Array<IElementDTO>) {
    return (
      await (
        await this.ogmService.Element
      ).create({
        input: elements.map(
          ({
            _compositeKey,
            firstChild,
            id,
            nextSibling,
            parent,
            postRenderAction,
            preRenderAction,
            prevSibling,
            props,
            propTransformationJs,
            renderForEachPropKey,
            renderIfExpression,
            renderType,
            style,
          }) => ({
            _compositeKey,
            firstChild: connectNodeId(firstChild?.id),
            id,
            nextSibling: connectNodeId(nextSibling?.id),
            parent: connectNodeId(parent?.id),
            postRenderAction: connectNodeId(postRenderAction?.id),
            preRenderAction: connectNodeId(preRenderAction?.id),
            prevSibling: connectNodeId(prevSibling?.id),
            props: connectNodeId(props.id),
            propTransformationJs,
            renderAtomType:
              renderType?.kind === IRenderTypeKind.Atom
                ? connectNodeId(renderType.id)
                : null,
            renderComponentType:
              renderType?.kind === IRenderTypeKind.Component
                ? connectNodeId(renderType.id)
                : null,
            renderForEachPropKey,
            renderIfExpression,
            style,
          }),
        ),
      })
    ).elements
  }

  protected async _update(
    { _compositeKey, id, props }: IElementDTO,
    where: ElementWhere,
  ) {
    return (
      await (
        await this.ogmService.Element
      ).update({
        update: {
          _compositeKey,
          id,
          props: reconnectNodeId(props.id),
        },
        where,
      })
    ).elements[0]
  }

  async getElementWithDescendants(rootId: string) {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getDescendantsCypher, { rootId })
      const descendants = records[0]?.get(0)

      const descendantIds = descendants.map(
        ({ properties }: Node) => properties.id,
      )

      return await this.find({
        where: { id_IN: [rootId, ...descendantIds] },
      })
    })
  }
}
