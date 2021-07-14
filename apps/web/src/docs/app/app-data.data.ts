import { D3GraphProps, NodeType } from '@codelab/ui/d3'

const USER_A = 'User A'
const APP_A = 'App A'
const APP_B = 'App B'
const PAGE_A_1 = 'Page A 1'
const PAGE_A_2 = 'Page A 2'
const PAGE_B_1 = 'Page B 1'

export const appData: D3GraphProps = {
  nodes: [
    {
      id: USER_A,
      label: USER_A,
      type: NodeType.User,
    },
    {
      id: APP_A,
      type: NodeType.App,
    },
    {
      id: APP_B,
      type: NodeType.App,
    },
    {
      id: PAGE_A_1,
      type: NodeType.Page,
    },
    {
      id: PAGE_A_2,
      type: NodeType.Page,
    },
    {
      id: PAGE_B_1,
      type: NodeType.Page,
    },
  ],
  links: [
    // User - App
    {
      id: `${USER_A}_${APP_A}`,
      source: USER_A,
      target: APP_A,
      label: '',
    },
    {
      id: `${USER_A}_${APP_B}`,
      source: USER_A,
      target: APP_B,
      label: '',
    },
    // App - Page
    {
      id: `${APP_A}_${PAGE_A_1}`,
      source: APP_A,
      target: PAGE_A_1,
      label: '',
    },
    {
      id: `${APP_A}_${PAGE_A_2}`,
      source: APP_A,
      target: PAGE_A_2,
      label: '',
    },
    {
      id: `${APP_B}_${PAGE_B_1}`,
      source: APP_B,
      target: PAGE_B_1,
      label: '',
    },
  ],
}
