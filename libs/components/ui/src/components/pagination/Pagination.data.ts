import { Pagination } from './Pagination.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const paginationData: NodeDtoReactI<Pagination.Props> = {
  type: 'React.Pagination',
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
