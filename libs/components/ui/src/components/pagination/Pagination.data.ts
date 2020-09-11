import { ReactNodeI } from '@codelab/shared/interface/node'
import { Pagination } from './Pagination.types'

export const paginationData: ReactNodeI<Pagination.Props> = {
  type: 'Pagination',
  nodeType: 'React',
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
