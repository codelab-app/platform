import { ICreateComponentDTO } from '@codelab/frontend/abstract/core'
import { makeCreateInput } from '@codelab/frontend/domain/element'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const mapCreateInput = (
  input: ICreateComponentDTO,
): ComponentCreateInput => {
  const { id = v4(), name, auth0Id } = input

  const rootElement: ComponentCreateInput['rootElement'] = {
    create: {
      node: makeCreateInput({ name }),
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
    rootElement,
    api,
    owner: connectOwner(auth0Id),
  }
}
