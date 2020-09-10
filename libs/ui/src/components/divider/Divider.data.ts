import { ReactNodeI } from '@codelab/shared/interface/node'
import { DividerProps } from './Divider.types'
import { TextProps } from '../text/Text.types'

export const dividerData: ReactNodeI<DividerProps | TextProps> = {
  type: 'Provider',
  nodeType: 'React',
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
      },
    },
    {
      type: 'Divider',
      nodeType: 'React',
      props: {
        orientation: 'center',
        type: 'horizontal',
      },
    },
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
      },
    },
  ],
}
