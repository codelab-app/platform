import { ComponentOGM } from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { v4 } from 'uuid'

export const createComponent = async (
  component: OGM_TYPES.Component,
  selectedUser: string,
): Promise<OGM_TYPES.Component> => {
  const Component = await ComponentOGM()

  const {
    components: [newComponent],
  } = await Component.create({
    input: [
      {
        id: component.id ?? v4(),
        name: component.name,
        owner: { connect: { where: { node: { id: selectedUser } } } },
        rootElement: {
          connect: { where: { node: { id: component.rootElement.id } } },
        },
      },
    ],
  })

  return newComponent
}
