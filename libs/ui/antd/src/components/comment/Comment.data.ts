import { Avatar } from '../avatar'
import { Icon } from '../icon'
import { Text } from '../text'
import { Comment } from './Comment.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const commentData: NodeReactI<
  Comment.Props | Text.Props | Icon.Props | Avatar.Props
> = {
  type: NodeType.React_Comment,
  props: {
    author: 'Han Solo',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: '1 July 2020',
    avatar: {
      type: NodeType.React_Avatar,
      props: {
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        alt: 'Han Solo',
      },
    },
    actions: [
      {
        type: NodeType.React_Fragment,
        props: {
          ctx: {
            __type: ['Eval', 'Single'],
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
            type: NodeType.React_Icon,
            props: {
              type: 'like',
              theme: {
                __type: ['Eval'],
                value: `
                  return this.ctx.action === "like" ? "filled" : "outlined"
                `,
              },
              onClick: {
                __type: ['Eval'],
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
            type: NodeType.React_Text,
            props: {
              value: { __type: ['Eval'], value: 'return this.ctx.likes' },
            },
          },
          {
            type: NodeType.React_Icon,
            props: {
              type: 'dislike',
              theme: {
                __type: ['Eval'],
                value:
                  'return this.ctx.action === "dislike"? "filled" : "outlined"',
              },
              style: { paddingLeft: '8px' },
              onClick: {
                __type: ['Eval'],
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
            type: NodeType.React_Text,
            props: {
              value: { __type: ['Eval'], value: 'return this.ctx.dislikes' },
            },
          },
          {
            type: NodeType.React_Html_Span,
            props: { style: { paddingLeft: '8px' } },
            children: [
              {
                type: NodeType.React_Text,
                props: { value: 'Reply to' },
              },
            ],
          },
        ],
      },
    ],
  },
}
