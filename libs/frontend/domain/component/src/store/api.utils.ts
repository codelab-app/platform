import type {
  IComponent,
  ICreateComponentDTO,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { connectOwner } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

export const mapCreateInput = (
  input: ICreateComponentDTO,
): ComponentCreateInput => {
  const { id = v4(), name, auth0Id, rootElementId } = input
  const newRootElementId = v4()

  const props: ComponentCreateInput['props'] = {
    create: { node: { data: JSON.stringify({}) } },
  }

  const createRootElement: ComponentCreateInput['rootElement'] = {
    create: {
      node: {
        id: newRootElementId,
        name,
        slug: createSlug(name, id),
        props,
      },
    },
  }

  const connectRootElement: ComponentCreateInput['rootElement'] = {
    connect: {
      where: {
        node: {
          id: rootElementId ?? newRootElementId,
        },
      },
    },
  }

  const api: ComponentCreateInput['api'] = {
    create: {
      node: {
        id: v4(),
        name: `${name} API`,
        owner: connectOwner(auth0Id),
      },
    },
  }

  return {
    id,
    name,
    rootElement: rootElementId ? connectRootElement : createRootElement,
    api,
    owner: connectOwner(auth0Id),
    props,
    childrenContainerElement: connectRootElement,
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
