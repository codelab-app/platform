import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const commentData: NodeI = {
  type: AtomType.ReactComment,
  props: {
    author: 'Han Solo',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: '1 July 2020',
    avatar: {
      type: AtomType.ReactAvatar,
      props: {
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        alt: 'Han Solo',
      },
    },
    actions: [
      {
        type: AtomType.ReactFragment,
        props: {
          ctx: {
            __type: [PropType.Eval, PropType.Single],
            value: `
              const [likes, setLikes] = this.React.useState(0);
              const [dislikes, setDislikes] = this.React.useState(0);
              const [action, setAction] = this.React.useState(null);

              return { likes, setLikes, dislikes, setDislikes, action, setAction }
            `,
          },
        },
        children: [
          {
            type: AtomType.ReactIcon,
            props: {
              type: 'like',
              theme: {
                __type: [PropType.Eval],
                value: `
                  return this.ctx.action === "like" ? "filled" : "outlined"
                `,
              },
              onClick: {
                __type: [PropType.Eval],
                value: `
                  return () => {
                    this.ctx.setLikes(1);
                    this.ctx.setDislikes(0);
                    this.ctx.setAction("like");
                  }
                `,
              },
            },
          },
          {
            type: AtomType.ReactText,
            props: {
              value: {
                __type: [PropType.Eval],
                value: 'return this.ctx.likes',
              },
            },
          },
          {
            type: AtomType.ReactIcon,
            props: {
              type: 'dislike',
              theme: {
                __type: [PropType.Eval],
                value:
                  'return this.ctx.action === "dislike"? "filled" : "outlined"',
              },
              style: { paddingLeft: '8px' },
              onClick: {
                __type: [PropType.Eval],
                value: `
                  return () => {
                    this.ctx.setLikes(0);
                    this.ctx.setDislikes(1);
                    this.ctx.setAction("dislike");
                  }
                `,
              },
            },
          },
          {
            type: AtomType.ReactText,
            props: {
              value: {
                __type: [PropType.Eval],
                value: 'return this.ctx.dislikes',
              },
            },
          },
          {
            type: AtomType.ReactHtmlSpan,
            props: { style: { paddingLeft: '8px' } },
            children: [
              {
                type: AtomType.ReactText,
                props: { value: 'Reply to' },
              },
            ],
          },
        ],
      },
    ],
  },
}
