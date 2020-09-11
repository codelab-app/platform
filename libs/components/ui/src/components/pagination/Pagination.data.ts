import { ReactNodeI } from '@codelab/shared/interface/node'
import { PaginationProps } from './Pagination.types'

export const paginationData: ReactNodeI<PaginationProps> = {
  type: 'Pagination',
  nodeType: 'React',
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
