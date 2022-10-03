import { ICreatePreRenderDTO } from '@codelab/frontend/abstract/core'
import { PreRenderCreateInput } from '@codelab/shared/abstract/codegen'
import { connectNode } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const mapCreateInput = (
  input: ICreatePreRenderDTO,
): PreRenderCreateInput => {
  const { id = v4(), code, pageId, name, type } = input

  return {
    id,
    page: connectNode(pageId),
    type,
    name,
    code,
  }
}
