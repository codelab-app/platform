export interface NodeLike<TChild extends NodeLike<TChild>> {
  children: Array<TChild>
}

export interface Node<TData> extends NodeLike<Node<TData>> {
  id: string
  children: Array<Node<TData>>
  data: TData
}
