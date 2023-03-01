import type {
  IComponent,
  ICreateComponentData,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { createUniqueName } from '@codelab/frontend/shared/utils'
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
}: ICreateComponentData): ComponentCreateInput => {
  const newRootElement = { id: v4() }

  const props: ComponentCreateInput['props'] = {
    create: { node: { data: JSON.stringify({}) } },
  }

  const createRootElement: CreateRootElement = (element: IEntity) => ({
    create: {
      node: {
        id: element.id,
        name: createUniqueName(name, element),
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
        owner: connectAuth0Owner(owner.auth0Id),
      },
    },
  }

  return {
    id,
    name,
    rootElement: rootElement
      ? connectRootElement(rootElement)
      : createRootElement(newRootElement),
    api,
    owner: connectAuth0Owner(owner.auth0Id),
    props,
    childrenContainerElement: rootElement
      ? connectRootElement(rootElement)
      : connectRootElement(newRootElement),
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
