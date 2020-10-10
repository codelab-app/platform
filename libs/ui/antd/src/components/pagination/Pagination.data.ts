import { Pagination } from './Pagination.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const paginationData: NodeReactI<Pagination.Props> = {
  type: 'React.Pagination',
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
