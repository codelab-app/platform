import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectNode } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'

/**
 * Creates the element without prop map bindings and without parent/children connections
 */

const label = (element: OGM_TYPES.Element) =>
  element.name ||
  element.renderAtomType?.name ||
  (element.renderAtomType
    ? pascalCaseToWords(element.renderAtomType.type)
    : undefined) ||
  element.parentComponent?.name ||
  element.renderComponentType?.name

export const importElementInitial = async (
  element: OGM_TYPES.Element,
  userId: string,
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
          id: element.id ?? v4(),
          name: element.name,
          // owner: connectNode(userId),
          customCss: element.customCss,
          guiCss: element.guiCss,

          preRenderActionId: element.preRenderActionId,
          postRenderActionId: element.postRenderActionId,

          renderAtomType: connectNode(element.renderAtomType?.id),
          props: element.props
            ? {
                create: { node: { data: element.props.data } },
              }
            : undefined,
          propTransformationJs: element.propTransformationJs,
          renderForEachPropKey: element.renderForEachPropKey,
          renderIfPropKey: element.renderIfPropKey,
        },
      ],
    })

    return newElement
  }

  console.log(`Updating ${label(element)}`)

  const {
    elements: [newElement],
  } = await Element.update({
    where: {
      id: element.id,
    },
    update: {
      name: element.name,
    },
  })

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

  if (element.props) {
    // replace all references in props
    // for (const [key, value] of idMap.entries()) {
    //   element.props.data = element.props.data.replace(
    //     new RegExp(key, 'g'),
    //     value,
    //   )
    // }
  }

  await Element.update({
    where: { id: element.id },
    update: {
      parentComponent: connectNode(element.parentComponent?.id),
      renderComponentType: connectNode(element.renderComponentType?.id),
      props: element.props
        ? {
            update: { node: { data: element.props.data } },
          }
        : undefined,
      propMapBindings: element.propMapBindings.map((pmb) => ({
        create: [
          {
            node: {
              sourceKey: pmb.sourceKey,
              targetKey: pmb.targetKey,
              targetElement: connectNode(pmb.targetElement?.id),
            },
          },
        ],
      })),
    },
  })
}
