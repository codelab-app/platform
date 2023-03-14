import type { IComponent, IPropData } from '@codelab/frontend/abstract/core'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

type CreateRootElement = (
  rootElement: IEntity,
) => ComponentCreateInput['rootElement']

export const mapCreateInput = ({
  api,
  id = v4(),
  name,
  owner,
  props,
  rootElement,
}: IComponent): ComponentCreateInput => {
  const newRootElement = { id: v4() }

  const componentProps: ComponentCreateInput['props'] = {
    create: { node: { data: JSON.stringify({}), id: props?.id ?? v4() } },
  }

  const rootElementProps: ComponentCreateInput['props'] = {
    create: {
      node: {
        data: JSON.stringify({}),
        id: rootElement.maybeCurrent?.props.id ?? v4(),
      },
    },
  }

  const createRootElement: CreateRootElement = (element: IEntity) => ({
    create: {
      node: {
        id: element.id,
        name,
        props: rootElementProps,
      },
    },
  })

  const connectRootElement: CreateRootElement = (element: IEntity) =>
    connectNodeId(element.id)

  const createApi: ComponentCreateInput['api'] = {
    create: {
      node: {
        id: api.id,
        name: `${name} API`,
        owner: connectAuth0Owner(owner),
      },
    },
  }

  return {
    api: createApi,
    childrenContainerElement: connectRootElement(
      rootElement.maybeCurrent ?? newRootElement,
    ),
    id,
    name,
    owner: connectAuth0Owner(owner),
    props: componentProps,
    rootElement: createRootElement(rootElement.maybeCurrent ?? newRootElement),
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
