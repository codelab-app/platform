import { Statistic } from './Statistic.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const statisticData: NodeReactI<
  Statistic.Props | Statistic.CountdownProps
> = {
  type: NodeType.React_Statistic,
  props: {
    title: 'Active Users',
    value: 545465,
  },
}
