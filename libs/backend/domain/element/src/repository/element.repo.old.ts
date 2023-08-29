import type { Element } from '@codelab/backend/abstract/codegen'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import type { IEntity } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import {
  compoundCaseToTitleCase,
  createUniqueName,
} from '@codelab/shared/utils'

/**
 * Creates the element without prop map bindings and without parent/children connections
 */

const label = (element: Element) =>
  element.name ||
  element.renderAtomType?.name ||
  (element.renderAtomType
    ? compoundCaseToTitleCase(element.renderAtomType.type)
    : undefined) ||
  element.parentComponent?.name ||
  element.renderComponentType?.name

export const importElementInitial = async (
  element: Element,
  closestContainerNode: IEntity,
): Promise<Element> => {
  const Element = await Repository.instance.Element

  const existing = await Element.find({
    where: {
      id: element.id,
    },
  })

  if (!existing.length) {
    console.log(`Creating ${label(element)}`)

    const {
      elements: [newElement],
    } = await Element.create({
      input: [
        {
          _compoundName: createUniqueName(
            element.name,
            closestContainerNode.id,
          ),
          childMapperComponent: connectNodeId(element.childMapperComponent?.id),
          childMapperPreviousSibling: connectNodeId(
            element.childMapperPreviousSibling?.id,
          ),
          childMapperPropKey: element.childMapperPropKey,
          id: element.id,
          postRenderAction: connectNodeId(element.postRenderAction?.id),
          preRenderAction: connectNodeId(element.preRenderAction?.id),
          props: {
            create: {
              node: { data: element.props.data, id: element.props.id },
            },
          },
          renderAtomType: element.renderAtomType
            ? {
                connect: {
                  where: {
                    node: {
                      OR: [
                        { id: element.renderAtomType.id },
                        { name: element.renderAtomType.name },
                      ],
                    },
                  },
                },
              }
            : undefined,
          renderForEachPropKey: element.renderForEachPropKey,
          renderIfExpression: element.renderIfExpression,
          style: element.style,
        },
      ],
    })

    if (!newElement) {
      throw new Error('Element not created')
    }

    return newElement
  }

  // console.log(`Updating ${label(element)}`)

  const {
    elements: [newElement],
  } = await Element.update({
    update: {
      _compoundName: createUniqueName(element.name, closestContainerNode.id),
    },
    where: {
      id: element.id,
    },
  })

  if (!newElement) {
    throw new Error('Element not created')
  }

  return newElement
}

/**
 * Updates the imported element with prop map bindings, parent/children connections and props after we have imported all the elements, so we can reference them
 */
// TODO: update CLI to support the new elment-parent structure
export const updateImportedElement = async (
  element: Element,
): Promise<void> => {
  const Element = await Repository.instance.Element

  // if (element.props) {
  // replace all references in props
  // for (const [key, value] of idMap.entries()) {
  //   element.props.data = element.props.data.replace(
  //     new RegExp(key, 'g'),
  //     value,
  //   )
  // }
  // }

  await Element.update({
    update: {
      childMapperComponent: connectNodeId(element.childMapperComponent?.id),
      childMapperPreviousSibling: connectNodeId(
        element.childMapperPreviousSibling?.id,
      ),
      childMapperPropKey: element.childMapperPropKey,
      firstChild: connectNodeId(element.firstChild?.id),
      nextSibling: connectNodeId(element.nextSibling?.id),
      parent: connectNodeId(element.parent?.id),
      parentComponent: connectNodeId(element.parentComponent?.id),
      postRenderAction: connectNodeId(element.postRenderAction?.id),
      preRenderAction: connectNodeId(element.preRenderAction?.id),
      prevSibling: connectNodeId(element.prevSibling?.id),
      props: {
        update: { node: { data: element.props.data } },
      },
      renderComponentType: connectNodeId(element.renderComponentType?.id),
    },
    where: { id: element.id },
  })
}
