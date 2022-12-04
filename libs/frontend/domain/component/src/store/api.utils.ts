import { ICreateComponentDTO } from '@codelab/frontend/abstract/core'
import { makeCreateInput } from '@codelab/frontend/domain/element'
import { createSlug } from '@codelab/frontend/shared/utils'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const mapCreateInput = (
  input: ICreateComponentDTO,
): ComponentCreateInput => {
  const { id = v4(), name, auth0Id, rootElementId } = input

  const createRootElement: ComponentCreateInput['rootElement'] = {
    create: {
      node: makeCreateInput({ name, slug: createSlug(name, id) }),
    },
  }

  const connectRootElement: ComponentCreateInput['rootElement'] = {
    connect: {
      where: {
        node: {
          id: rootElementId,
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
  }
}
