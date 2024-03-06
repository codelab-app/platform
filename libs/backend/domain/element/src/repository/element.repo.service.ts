import type {
  Element,
  ElementOptions,
  ElementWhere,
} from '@codelab/backend/abstract/codegen'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  elementSelectionSet,
  getElementWithDescendants,
  Neo4jService,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IElementDto } from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  disconnectAll,
  ElementProperties,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElementRepository extends AbstractRepository<
  IElementDto,
  Element,
  ElementWhere,
  ElementOptions
> {
  constructor(
    private ogmService: OgmService,
    private neo4jService: Neo4jService,
    protected override traceService: TraceService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(traceService, validationService, loggerService)
  }

  async getElementWithDescendants(rootId: string) {
    return getElementWithDescendants(this.neo4jService, this.ogmService, {
      id: rootId,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(elements: Array<IElementDto>) {
    return (
      await this.ogmService.Element.create({
        input: elements.map(
          ({
            childMapperComponent,
            childMapperPreviousSibling,
            childMapperPropKey,
            closestContainerNode,
            compositeKey,
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
            tailwindClassNames,
          }) => ({
            childMapperComponent: connectNodeId(childMapperComponent?.id),
            childMapperPreviousSibling: connectNodeId(
              childMapperPreviousSibling?.id,
            ),
            childMapperPropKey,
            compositeKey:
              compositeKey ??
              ElementProperties.elementCompositeKey(name, closestContainerNode),
            // We only need to do one way
            // firstChild: connectNodeId(firstChild?.id),
            id,
            nextSibling: connectNodeId(nextSibling?.id),
            parentElement: connectNodeId(parentElement?.id),
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
            tailwindClassNames,
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
    {
      childMapperComponent,
      childMapperPreviousSibling,
      childMapperPropKey,
      closestContainerNode,
      compositeKey,
      id,
      name,
      props,
      renderType,
    }: IElementDto,
    where: ElementWhere,
  ) {
    return (
      await (
        await this.ogmService.Element
      ).update({
        update: {
          childMapperComponent: connectNodeId(childMapperComponent?.id),
          childMapperPreviousSibling: connectNodeId(
            childMapperPreviousSibling?.id,
          ),
          childMapperPropKey,
          compositeKey:
            compositeKey ??
            ElementProperties.elementCompositeKey(name, closestContainerNode),
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
