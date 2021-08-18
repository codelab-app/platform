import { DgraphEntityType, DgraphQueryBuilder } from '@codelab/backend/infra'

export const getLambdaQuery = () =>
  new DgraphQueryBuilder()
    .addBaseFields()
    .addTypeFilterDirective(DgraphEntityType.Lambda)
    .addExpandAll()
