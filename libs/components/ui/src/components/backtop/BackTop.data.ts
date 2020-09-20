import { Text } from '../text'
import { BackTop } from './BackTop.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const backtopData: NodeDtoReactI<BackTop.Props | Text.Props> = {
  type: 'React.Html.div',
  props: { style: { height: '200vh' } },
  children: [
    {
      type: 'React.Text',
      props: { value: 'Scroll down to see the bottom-right gray button' },
    },
    {
      type: 'React.BackTop',
      props: { visibilityHeight: 100 },
    },
  ],
}
