import { ReactNodeI } from '@codelab/shared/interface/node'

export const renderPropsData: ReactNodeI = {
  type: 'Html.div',
  nodeType: 'React',
  props: {
    visibility: '',
    parentprops: {
      renderProps: true,
      value: {},
    },
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        childprops: {},
      },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            grandchildprops: {},
          },
        },
      ],
    },
  ],
}

export const leafRenderPropsData: ReactNodeI = {
  type: 'Html.div',
  nodeType: 'React',
  props: {
    visibility: '',
    leafprops: {
      renderProps: 'leaf',
      value: {},
    },
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        childprops: {},
      },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            grandChildProps: {},
          },
        },
      ],
    },
  ],
}

export const BasicPropsPassedInDeepData: ReactNodeI = {
  type: 'Html.div',
  nodeType: 'React',
  props: {
    onClick: {
      eval: true,
      value: 'return ()=>console.log("Root onClick cb is fired")',
    },
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          children: [
            {
              type: 'Button',
              nodeType: 'React',
              children: [
                {
                  nodeType: 'React',
                  type: 'Text',
                  props: {
                    value: '3rd level but Cb still available',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
