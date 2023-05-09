import type {
  Component,
  ComponentWhere,
} from '@codelab/backend/abstract/codegen'
import {
  componentSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'

export const createComponent = async (
  component: Component,
  owner: IAuth0Owner,
): Promise<Component> => {
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

export const findComponent = async (where: ComponentWhere) => {
  const Component = await Repository.instance.Component

  const components = await Component.find({
    selectionSet: componentSelectionSet,
    where,
  })

  return components
}
