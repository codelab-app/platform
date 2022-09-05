import { ComponentOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectId } from '@codelab/shared/data'
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
        api: component.api?.id
          ? connectId(component.api?.id)
          : {
              create: {
                node: {
                  id: v4(),
                  name: `${component.name} API`,
                  kind: ITypeKind.InterfaceType,
                  owner: { connect: { where: { node: { id: selectedUser } } } },
                },
              },
            },
      },
    ],
  })

  return newComponent
}
