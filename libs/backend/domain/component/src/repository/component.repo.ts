import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

export const createComponent = async (
  component: OGM_TYPES.Component,
  owner: IAuth0Owner,
): Promise<OGM_TYPES.Component> => {
  const Component = await Repository.instance.Component

  const {
    components: [newComponent],
  } = await Component.create({
    input: [
      {
        api:
          // component.api.id
          // ? connectNodeId(component.api.id) :
          {
            create: {
              node: {
                id: v4(),
                kind: ITypeKind.InterfaceType,
                name: `${component.name} API`,
                owner: connectAuth0Owner(owner),
              },
            },
          },
        childrenContainerElement: connectNodeId(
          component.childrenContainerElement.id,
        ),
        id: component.id,
        name: component.name,
        owner: connectAuth0Owner(owner),
        rootElement: connectNodeId(component.rootElement.id),
      },
    ],
  })

  if (!newComponent) {
    throw new Error('Component not created')
  }

  return newComponent
}
