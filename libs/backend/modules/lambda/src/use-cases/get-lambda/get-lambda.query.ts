import { DgraphEntityType, DgraphQueryBuilder } from '@codelab/backend/infra'

export const getLambdaQuery = () =>
  new DgraphQueryBuilder()
    .addTypeFilterDirective(DgraphEntityType.Lambda)
    .addBaseFields()
    .addExpandAll()
