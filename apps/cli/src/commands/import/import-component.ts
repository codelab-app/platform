import { Component as IComponentModel, ComponentModel } from '@codelab/backend'

export const importComponent = async (
  component: IComponentModel,
  selectedUser: string,
): Promise<IComponentModel> => {
  const Components = await ComponentModel()

  const {
    components: [newComponent],
  } = await Components.create({
    input: [
      {
        name: component.name,
        owner: { connect: { where: { node: { id: selectedUser } } } },
        rootElement: { create: { node: { name: '' } } },
      },
    ],
  })

  return newComponent
}
