import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { ICreateComponentDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const mapCreateInput = (
  input: ICreateComponentDTO,
): ComponentCreateInput => {
  const { name, auth0Id } = input

  const rootElement: ComponentCreateInput['rootElement'] = {
    create: { node: { id: v4(), name: ROOT_ELEMENT_NAME } },
  }

  return {
    name,
    rootElement,
    owner: { connect: { where: { node: { auth0Id } } } },
  }
}
