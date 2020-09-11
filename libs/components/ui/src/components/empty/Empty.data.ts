import { ReactNodeI } from '@codelab/shared/interface/node'
import { Empty } from './Empty.types'

export const emptyData: ReactNodeI<Empty.Props> = {
  type: 'Empty',
  nodeType: 'React',
  props: {
    description: 'No Data',
  },
}
