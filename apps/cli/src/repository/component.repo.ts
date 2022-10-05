import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectNode, connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const createComponent = async (
  component: OGM_TYPES.Component,
  selectedUser: string,
): Promise<OGM_TYPES.Component> => {
  const Component = await Repository.instance.Component

  const {
    components: [newComponent],
  } = await Component.create({
    input: [
      {
        id: component.id,
        name: component.name,
        owner: connectNode(selectedUser),
        rootElement: connectNode(component.rootElement.id),
        api: component.api.id
          ? connectNode(component.api.id)
          : {
              create: {
                node: {
                  id: v4(),
                  name: `${component.name} API`,
                  kind: ITypeKind.InterfaceType,
                  owner: connectOwner(selectedUser),
                },
              },
            },
      },
    ],
  })

  if (!newComponent) {
    throw new Error('Component not created')
  }

  return newComponent
}
