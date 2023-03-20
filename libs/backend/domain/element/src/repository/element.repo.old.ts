import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'

/**
 * Creates the element without prop map bindings and without parent/children connections
 */

const label = (element: OGM_TYPES.Element) =>
  element.name ||
  element.renderAtomType?.name ||
  (element.renderAtomType
    ? compoundCaseToTitleCase(element.renderAtomType.type)
    : undefined) ||
  element.parentComponent?.name ||
  element.renderComponentType?.name

export const importElementInitial = async (
  element: OGM_TYPES.Element,
  owner: IAuth0Owner,
): Promise<OGM_TYPES.Element> => {
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
          customCss: element.customCss,
          guiCss: element.guiCss,
          id: element.id,
          name: element.name,
          postRenderAction: connectNodeId(element.postRenderAction?.id),
          preRenderAction: connectNodeId(element.preRenderAction?.id),
          props: {
            create: {
              node: { data: element.props.data, id: element.props.id },
            },
          },
          propTransformationJs: element.propTransformationJs,
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
        },
      ],
    })

    if (!newElement) {
      throw new Error('Element not created')
    }

    return newElement
  }

  console.log(`Updating ${label(element)}`)

  const {
    elements: [newElement],
  } = await Element.update({
    update: {
      name: element.name,
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
  element: OGM_TYPES.Element,
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
      firstChild: connectNodeId(element.firstChild?.id),
      nextSibling: connectNodeId(element.nextSibling?.id),
      parent: connectNodeId(element.parent?.id),
      parentComponent: connectNodeId(element.parentComponent?.id),
      prevSibling: connectNodeId(element.prevSibling?.id),
      props: {
        update: { node: { data: element.props.data } },
      },
      renderComponentType: connectNodeId(element.renderComponentType?.id),
    },
    where: { id: element.id },
  })
}
