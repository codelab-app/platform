import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { ICreateComponentDTO } from '@codelab/shared/abstract/core'

export const mapCreateInput = (
  input: ICreateComponentDTO,
  auth0Id: string,
): ComponentCreateInput => {
  const { name } = input

  const rootElement: ComponentCreateInput['rootElement'] = {
    create: { node: { name: ROOT_ELEMENT_NAME } },
  }

  return {
    name,
    rootElement,
    owner: { connect: { where: { node: { auth0Id } } } },
  }
}
