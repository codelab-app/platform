import { Spin } from './Spin.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const spinData: NodeDtoReactI<Spin.Props> = {
  type: 'React.Spin',
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
