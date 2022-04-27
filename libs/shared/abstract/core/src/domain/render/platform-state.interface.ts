export interface IStateTreeNode {
  name: string
  key: string
  path: string
  type: string
  children: Array<IStateTreeNode>
  useModal: boolean
  content: any
}

export interface MobxStateKeyTemplate {
  start: string
  end: string
}
