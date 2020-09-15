import { NodeDtoI } from '@codelab/shared/interface/node'

export const divData: NodeDtoI = {
  type: 'React.Html.div',
  props: {
    visibility: '',
    parentprops: {
      renderProps: true,
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {},
      },
    },
  ],
}
