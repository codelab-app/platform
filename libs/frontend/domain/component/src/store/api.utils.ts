import type {
  ICreateComponentDTO,
  IField,
  IFieldDefaultValue,
} from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import type { Nullish } from '@codelab/shared/abstract/types'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const mapCreateInput = (
  input: ICreateComponentDTO,
): ComponentCreateInput => {
  const { id = v4(), name, auth0Id, rootElementId } = input
  const newRootElementId = v4()

  const createRootElement: ComponentCreateInput['rootElement'] = {
    create: {
      node: {
        id: newRootElementId,
        name,
        slug: createSlug(name, id),
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

  const props: ComponentCreateInput['props'] = {
    create: { node: { data: JSON.stringify({}) } },
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
 * Generates a key-value pair from an array of IField
 */
export const convertFieldsToProps = (fields: Array<IField>) => {
  const props = fields.reduce<Record<string, Nullish<IFieldDefaultValue>>>(
    (acc, field) => {
      acc[field.key] = field.defaultValues

      return acc
    },
    {},
  )

  return props
}
