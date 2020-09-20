import { Pagination } from './Pagination.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const paginationData: NodeReactDtoI<Pagination.Props> = {
  type: 'React.Pagination',
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
