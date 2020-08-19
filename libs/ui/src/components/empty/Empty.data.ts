import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'

export const emptyPropKeys = ['description', 'imageStyle', 'image']

type EmptyProps = PropsFromKeys<typeof emptyPropKeys[number]>

export const emptyData: ReactNodeI<EmptyProps> = {
  type: 'Empty',
  nodeType: 'React',
  props: {
    description: 'No Data',
  },
}
