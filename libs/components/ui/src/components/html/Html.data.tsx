import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const divData: NodeReactDtoI = {
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
