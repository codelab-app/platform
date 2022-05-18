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
      node: {
        id: v4(),
        name,
      },
    },
  }

  return {
    id,
    name,
    rootElement,
    owner: connectOwner(auth0Id),
  }
}
