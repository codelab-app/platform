import { Rate } from './Rate.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const rateData: NodeDtoI<Rate.Props> = {
  type: 'React.Rate',
  props: {
    defaultValue: 2,
  },
}
