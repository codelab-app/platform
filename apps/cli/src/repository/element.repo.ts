import { ElementOGM } from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { v4 } from 'uuid'

/**
 * Creates the element without prop map bindings and without parent/children connections
 */
export const importElementInitial = async (
  element: OGM_TYPES.Element,
): Promise<OGM_TYPES.Element> => {
  const Element = await ElementOGM()

  const existing = await Element.find({
    where: {
      id: element.id,
    },
  })

  if (!existing.length) {
    console.log(`Creating ${element.name} ${element?.atom?.type}`)

    const {
      elements: [newElement],
    } = await Element.create({
      input: [
        {
          id: element.id ?? v4(),
          name: element.name,
          css: element.css,
          atom: element.atom
            ? { connect: { where: { node: { id: element.atom.id } } } }
            : undefined,
          component: element.component
            ? {
                connect: {
                  where: { node: { id: element.component.id } },
                },
              }
            : undefined,
          instanceOfComponent: element.instanceOfComponent
            ? {
                connect: {
                  where: { node: { id: element.instanceOfComponent.id } },
                },
              }
            : undefined,
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

  console.log(`Updating ${element.name}`)

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
export const updateImportedElement = async (
  element: OGM_TYPES.Element,
): Promise<void> => {
  const Elements = await ElementOGM()

  if (element.props) {
    // replace all references in props
    // for (const [key, value] of idMap.entries()) {
    //   element.props.data = element.props.data.replace(
    //     new RegExp(key, 'g'),
    //     value,
    //   )
    // }
  }

  await Elements.update({
    where: { id: element.id },
    update: {
      parentElement: element.parentElement
        ? {
            disconnect: { where: {} },
            connect: {
              edge: { order: element.parentElementConnection?.edges[0].order },
              where: { node: { id: element.parentElement.id } },
            },
          }
        : undefined,
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
              targetElement: pmb.targetElement
                ? {
                    connect: {
                      where: {
                        node: { id: pmb.targetElement.id },
                      },
                    },
                  }
                : undefined,
            },
          },
        ],
      })),
    },
  })
}
