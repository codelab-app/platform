import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { ICreateComponentDTO } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const mapCreateInput = (
  input: ICreateComponentDTO,
): ComponentCreateInput => {
  const { name, auth0Id } = input

  const rootElement: ComponentCreateInput['rootElement'] = {
    create: {
      node: {
        id: v4(),
        name,
        owner: connectOwner(auth0Id),
      },
    },
  }

  return {
    name,
    rootElement,
    owner: connectOwner(auth0Id),
  }
}
