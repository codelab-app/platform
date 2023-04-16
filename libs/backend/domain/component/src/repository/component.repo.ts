import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'

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
        api: connectNodeId(component.api.id),
        childrenContainerElement: connectNodeId(
          component.childrenContainerElement.id,
        ),
        id: component.id,
        name: component.name,
        owner: connectAuth0Owner(owner),
        props: connectNodeId(component.props.id),
        rootElement: connectNodeId(component.rootElement.id),
        store: connectNodeId(component.store.id),
      },
    ],
  })

  if (!newComponent) {
    throw new Error('Component not created')
  }

  return newComponent
}
