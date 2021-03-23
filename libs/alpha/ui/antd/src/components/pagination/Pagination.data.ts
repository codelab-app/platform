import { AtomType, NodeI } from '@codelab/frontend'

export const paginationData: NodeI = {
  type: AtomType.ReactPagination,
  props: {
    defaultCurrent: 1,
    showSizeChanger: false,
    total: 100,
  },
}
