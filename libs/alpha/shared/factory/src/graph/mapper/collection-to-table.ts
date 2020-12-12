import { ColumnsType } from 'antd/lib/table'
import { omit, reduce } from 'lodash'
import objectMapper from 'object-mapper'
import { capitalize } from 'voca'
import { GraphA } from '@codelab/alpha/shared/interface/graph-v2'
import { TableMapper } from '@codelab/alpha/shared/interface/mapper'

/**
 * Maps from apollo query results to EntityA
 */
export const collectionToTable: TableMapper<GraphA> = (collection) => {
  if (!collection?.data) {
    return {
      dataSource: [],
      columns: [],
    }
  }

  const dataSourceMapper = {
    id: [
      {
        key: 'id',
      },
      { key: 'key' },
    ],
    label: 'label',
    // edges: 'edges',
    // vertices: 'vertices',
  }

  const mapper = {
    data: [
      {
        key: 'dataSource',
        transform: (graphs: Array<GraphA>) => {
          return graphs.map((graph) => objectMapper(graph, dataSourceMapper))
        },
      },
      {
        key: 'columns',
        transform: (graphs: Array<GraphA>) => {
          if (!Array.isArray(graphs)) {
            return []
          }

          const record = omit(graphs[0], '__typename')

          return reduce(
            record,
            (res: ColumnsType<any>, val: string, key: string) => {
              return [
                ...res,
                {
                  title: capitalize(key),
                  dataIndex: key,
                  key,
                },
              ]
            },
            [],
          )
        },
      },
    ],
  }

  return objectMapper(collection, mapper)
}
