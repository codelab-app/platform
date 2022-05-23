import { makeCreateInput } from '@codelab/frontend/modules/element'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { ICreateComponentDTO } from '@codelab/shared/abstract/core'
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
        owner: { connect: { where: { node: { auth0Id } } } },
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
