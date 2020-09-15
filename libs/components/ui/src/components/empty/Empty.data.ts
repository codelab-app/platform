import { Empty } from './Empty.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const emptyData: NodeDtoI<Empty.Props> = {
  type: 'React.Empty',
  props: {
    description: 'No Data',
  },
}
