import type {
  Element,
  ElementModel,
  ElementOptions,
  ElementWhere,
} from '@codelab/backend/abstract/codegen'
import {
  elementSelectionSet,
  getDescendantsCypher,
  Neo4jService,
  OGMService,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  type IElementDTO,
  IRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import type { OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Node } from 'neo4j-driver'

@Injectable()
export class ElementRepository
  extends AbstractRepository<IElementDTO, Element, ElementWhere, ElementOptions>
  implements OnModuleInit
{
  private Element!: ElementModel

  constructor(
    private ogmService: OGMService,
    private neo4jService: Neo4jService,
  ) {
    super()
  }

  onModuleInit() {
    this.Element = this.ogmService.getModel('Element')
  }

  async _find({
    options,
    where,
  }: {
    where?: ElementWhere
    options?: ElementOptions
  }) {
    return await (
      await this.Element
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
        await this.Element
      ).create({
        input: elements.map(
          ({
            customCss,
            firstChild,
            guiCss,
            id,
            name,
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
          }) => ({
            customCss,
            firstChild: connectNodeId(firstChild?.id),
            guiCss,
            id,
            name,
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
          }),
        ),
      })
    ).elements
  }

  protected async _update(
    { id, name, props }: IElementDTO,
    where: ElementWhere,
  ) {
    return (
      await (
        await this.Element
      ).update({
        update: {
          id,
          name,
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
