import type { IComponent, IPropData } from '@codelab/frontend/abstract/core'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

type CreateRootElement = (
  rootElement: IEntity,
) => ComponentCreateInput['rootElement']

export const mapCreateInput = ({
  id = v4(),
  name,
  owner,
  rootElement,
}: IComponent): ComponentCreateInput => {
  const newRootElement = { id: v4() }

  const props: ComponentCreateInput['props'] = {
    create: { node: { data: JSON.stringify({}), id: v4() } },
  }

  const createRootElement: CreateRootElement = (element: IEntity) => ({
    create: {
      node: {
        id: element.id,
        name,
        props,
      },
    },
  })

  const connectRootElement: CreateRootElement = (element: IEntity) =>
    connectNodeId(element.id)

  const api: ComponentCreateInput['api'] = {
    create: {
      node: {
        id: v4(),
        name: `${name} API`,
        owner: connectAuth0Owner(owner),
      },
    },
  }

  return {
    api,
    childrenContainerElement: rootElement.maybeCurrent
      ? connectRootElement(rootElement.current)
      : connectRootElement(newRootElement),
    id,
    name,
    owner: connectAuth0Owner(owner),
    props,
    rootElement: rootElement.maybeCurrent
      ? connectRootElement(rootElement.current)
      : createRootElement(newRootElement),
  }
}

/**
 * Generates a key-value pair from the api fields of an IComponent
 */
export const getDefaultComponentFieldProps = (component: IComponent) => {
  const props = component.api.maybeCurrent?.fields.reduce<IPropData>(
    (acc, field) => {
      acc[field.key] = field.defaultValues

      return acc
    },
    {},
  )

  return props
}
