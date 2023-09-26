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
import {
  connectNodeId,
  disconnectAll,
  ElementProperties,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
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

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(elements: Array<ICreateElementDTO>) {
    return (
      await (
        await this.ogmService.Element
      ).create({
        input: elements.map(
          ({
            closestContainerNode,
            firstChild,
            id,
            name,
            nextSibling,
            parentElement,
            postRenderAction,
            preRenderAction,
            prevSibling,
            props,
            renderForEachPropKey,
            renderIfExpression,
            renderType,
            style,
          }) => ({
            compositeKey: ElementProperties.elementCompositeKey(
              name,
              closestContainerNode,
            ),
            firstChild: connectNodeId(firstChild?.id),
            id,
            nextSibling: connectNodeId(nextSibling?.id),
            parent: connectNodeId(parentElement?.id),
            postRenderAction: connectNodeId(postRenderAction?.id),
            preRenderAction: connectNodeId(preRenderAction?.id),
            prevSibling: connectNodeId(prevSibling?.id),
            props: connectNodeId(props.id),
            renderForEachPropKey,
            renderIfExpression,
            renderType: {
              Atom:
                renderType.__typename === 'Atom'
                  ? connectNodeId(renderType.id)
                  : undefined,
              Component:
                renderType.__typename === 'Component'
                  ? connectNodeId(renderType.id)
                  : undefined,
            },
            style,
          }),
        ),
      })
    ).elements
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
      selectionSet: `{ ${elementSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { closestContainerNode, id, name, props, renderType }: ICreateElementDTO,
    where: ElementWhere,
  ) {
    return (
      await (
        await this.ogmService.Element
      ).update({
        update: {
          compositeKey: ElementProperties.elementCompositeKey(
            name,
            closestContainerNode,
          ),
          id,
          props: reconnectNodeId(props.id),
          renderType: {
            Atom:
              renderType.__typename === 'Atom'
                ? connectNodeId(renderType.id)
                : disconnectAll(),
            Component:
              renderType.__typename === 'Component'
                ? connectNodeId(renderType.id)
                : disconnectAll(),
          },
        },
        where,
      })
    ).elements[0]
  }
}
