import { Empty } from './Empty.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const emptyData: NodeReactI<Empty.Props> = {
  type: 'React.Empty',
  props: {
    description: 'No Data',
  },
}
