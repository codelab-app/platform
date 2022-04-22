import { Element as IElementModel, ElementModel } from '@codelab/backend'

/**
 * Creates the element without prop map bindings and without parent/children connections
 */
export const importElementInitial = async (
  element: IElementModel,
  idMap: Map<string, string>,
): Promise<IElementModel> => {
  const Elements = await ElementModel()

  const {
    elements: [newElement],
  } = await Elements.create({
    input: [
      {
        name: element.name,
        css: element.css,
        atom: element.atom
          ? { connect: { where: { node: { id: element.atom.id } } } }
          : undefined,
        component: element.component
          ? {
              connect: {
                where: { node: { id: idMap.get(element.component.id) } },
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

/**
 * Updates the imported element with prop map bindings, parent/children connections and props after we have imported all the elements, so we can reference them
 */
export const updateImportedElement = async (
  element: IElementModel,
  idMap: Map<string, string>,
): Promise<void> => {
  const Elements = await ElementModel()

  if (element.props) {
    // replace all references in props
    for (const [key, value] of idMap.entries()) {
      element.props.data = element.props.data.replace(
        new RegExp(key, 'g'),
        value,
      )
    }
  }

  await Elements.update({
    where: { id: idMap.get(element.id) },
    update: {
      parentElement: element.parentElement
        ? {
            disconnect: { where: {} },
            connect: {
              edge: { order: element.parentElementConnection?.edges[0].order },
              where: { node: { id: idMap.get(element.parentElement.id) } },
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
                        node: { id: idMap.get(pmb.targetElement.id) },
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
