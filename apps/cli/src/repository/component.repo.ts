import { ComponentOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectNode, connectTypeOwner } from '@codelab/shared/data'
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
        owner: connectNode(selectedUser),
        rootElement: connectNode(component.rootElement.id),
        api: component.api?.id
          ? connectNode(component.api?.id)
          : {
              create: {
                node: {
                  id: v4(),
                  name: `${component.name} API`,
                  kind: ITypeKind.InterfaceType,
                  owner: connectTypeOwner(selectedUser),
                },
              },
            },
      },
    ],
  })

  return newComponent
}
