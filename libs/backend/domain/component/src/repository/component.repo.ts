import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectNodeId, connectOwner } from '@codelab/shared/domain/mapper'
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
        owner: connectOwner(selectedUser),
        rootElement: connectNodeId(component.rootElement.id),
        childrenContainerElement: connectNodeId(
          component.childrenContainerElement.id,
        ),
        api:
          // component.api.id
          // ? connectNodeId(component.api.id) :
          {
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
