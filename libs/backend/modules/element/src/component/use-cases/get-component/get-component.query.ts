import { DgraphEntityType } from '@codelab/backend/infra'
import { getElementGraphQuery } from '../../../use-cases'

export const getComponentQuery = () =>
  getElementGraphQuery().addTypeFilterDirective(DgraphEntityType.Component)
