import { Maybe } from '@codelab/shared/abstract/types'

export type BfsOptions<TNode> = {
  /**
   * Will be called for every node in breadth-first order
   * Return the children of a node that will get added to the queue
   */
  visit: (node: TNode, parentNode?: TNode) => Maybe<Array<TNode> | void>

  /** The root node(s), traversal will start from it */
  root: TNode | Array<TNode>
} & (
  | {
      /** If true, all nodes will be traversed exactly once, even if they appear more than once */
      allowDuplicates: true
      extractId?: never
    }
  | {
      /** If true, all nodes will be traversed exactly once, even if they appear more than once */
      allowDuplicates?: false
      /** Pass a hashing function that will extract a unique identifier out of the node. Most likely that is the node ID */
      extractId: (node: TNode) => string
    }
)

interface QueueItem<TNode> {
  node: TNode
  parentNode?: TNode
}

export const breadthFirstTraversal = <TNode>({
  visit,
  root,
  extractId,
  allowDuplicates,
}: BfsOptions<TNode>) => {
  const visitedIds = new Set()

  const queue: Array<QueueItem<TNode>> = Array.isArray(root)
    ? root.map((node) => ({ node }))
    : [{ node: root }]

  while (queue.length > 0) {
    const next = queue.shift()

    if (!next) {
      continue
    }

    const { node, parentNode } = next

    if (!allowDuplicates && extractId) {
      const id = extractId(node)

      if (!allowDuplicates && visitedIds.has(id)) {
        continue
      }

      visitedIds.add(id)
    }

    const children = visit(node, parentNode)

    if (!children || !children.length) {
      continue
    }

    queue.push(
      ...children.map<QueueItem<TNode>>((child) => ({
        node: child,
        parentNode: node,
      })),
    )
  }
}
