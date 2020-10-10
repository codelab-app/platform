import { Spin } from './Spin.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const spinData: NodeReactI<Spin.Props> = {
  type: 'React.Spin',
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
