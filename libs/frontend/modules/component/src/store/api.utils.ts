import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { CreateComponentInput } from '../use-cases'

export const mapCreateInput = (
  input: CreateComponentInput,
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
