import type {
  IComponent,
  ICreateComponentData,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { createUniqueName } from '@codelab/frontend/shared/utils'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

type CreateRootElement = (
  rootElementId: string,
) => ComponentCreateInput['rootElement']

export const mapCreateInput = ({
  id = v4(),
  name,
  owner,
  rootElement,
}: ICreateComponentData): ComponentCreateInput => {
  const newRootElementId = v4()

  const props: ComponentCreateInput['props'] = {
    create: { node: { data: JSON.stringify({}) } },
  }

  const createRootElement: CreateRootElement = (rootElementId: string) => ({
    create: {
      node: {
        id: rootElementId,
        name: createUniqueName(name, rootElementId),
        props,
      },
    },
  })

  const connectRootElement: CreateRootElement = (rootElementId: string) =>
    connectNodeId(rootElementId)

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
      ? connectRootElement(rootElement.id)
      : createRootElement(newRootElementId),
    api,
    owner: connectAuth0Owner(owner.auth0Id),
    props,
    childrenContainerElement: rootElement
      ? connectRootElement(rootElement.id)
      : connectRootElement(newRootElementId),
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
