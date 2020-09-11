import { ReactNodeI } from '@codelab/shared/interface/node'
import { Rate } from './Rate.types'

export const rateData: ReactNodeI<Rate.Props> = {
  type: 'Rate',
  nodeType: 'React',
  props: {
    defaultValue: 2,
  },
}
