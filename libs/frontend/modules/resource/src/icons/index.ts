import { IResourceType } from '@codelab/shared/abstract/core'
import { ReactComponent as GraphQlSvg } from './graphql.svg'
import { ReactComponent as MongoDBSvg } from './mongodb.svg'
import { ReactComponent as MySqlSvg } from './mysql.svg'
import { ReactComponent as OracleSvg } from './oracle.svg'
import { ReactComponent as PostgreSqlSvg } from './postgresql.svg'
import { ReactComponent as RestSvg } from './rest.svg'
import { ReactComponent as SqlServerSvg } from './sql-server.svg'

export const icons = {
  [IResourceType.GraphQL]: GraphQlSvg,
  [IResourceType.Rest]: RestSvg,
  [IResourceType.MySql]: MySqlSvg,
  [IResourceType.Oracle]: OracleSvg,
  [IResourceType.PostgreSql]: PostgreSqlSvg,
  [IResourceType.SqlServer]: SqlServerSvg,
  [IResourceType.MongoDB]: MongoDBSvg,
}
