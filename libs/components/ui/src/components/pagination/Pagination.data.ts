import { Pagination } from './Pagination.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const paginationData: NodeDtoI<Pagination.Props> = {
  type: 'React.Pagination',
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
