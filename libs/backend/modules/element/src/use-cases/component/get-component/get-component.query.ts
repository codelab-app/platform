import { DgraphEntityType } from '@codelab/backend/infra'
import { getElementGraphQuery } from '../../element/get-element-graph'

export const getComponentQuery = () =>
  getElementGraphQuery().addTypeFilterDirective(DgraphEntityType.Component)
