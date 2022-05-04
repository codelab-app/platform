import { ComponentOGM, IComponentModel } from '@codelab/backend'

export const importComponent = async (
  component: IComponentModel,
  selectedUser: string,
): Promise<IComponentModel> => {
  const Component = await ComponentOGM()

  const {
    components: [newComponent],
  } = await Component.create({
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
