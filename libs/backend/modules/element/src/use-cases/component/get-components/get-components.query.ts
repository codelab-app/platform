import { DgraphEntityType } from '@codelab/backend/infra'
import { getComponentQuery } from '../get-component'
import { GetComponentsInput } from './get-components.input'

export const getComponentsQuery = (input: GetComponentsInput) => {
  const q = getComponentQuery()

  if (input.componentIds && input.componentIds.length) {
    q.setUidsFunc(input.componentIds)
  } else {
    q.setTypeFunc(DgraphEntityType.Component)
  }

  return q
}
