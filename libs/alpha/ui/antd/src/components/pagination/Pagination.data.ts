import { Pagination } from './Pagination.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const paginationData: NodeReactI<Pagination.Props> = {
  type: NodeType.React_Pagination,
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
