import { Maybe, MaybePromise } from '@codelab/shared/abstract/types'

export interface BfsOptions<TNode> {
  /**
   * Will be called for every node in breadth-first order
   * Return the children of a node that will get added to the queue
   */
  visit: (
    node: TNode,
    parentNode?: TNode,
  ) => MaybePromise<Maybe<Array<TNode> | void>>

  /** The root node(s), traversal will start from it */
  root: TNode | Array<TNode>

  /** Pass a hashing function that will extract a unique identifier out of the node. Most likely that is the node ID */
  extractId: (node: TNode) => string
}

interface QueueItem<TNode> {
  node: TNode
  parentNode?: TNode
}

export const breadthFirstTraversal = async <TNode>({
  visit,
  root,
  extractId,
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
    const id = extractId(node)

    if (visitedIds.has(id)) {
      continue
    }

    const children = await visit(node, parentNode)
    visitedIds.add(id)

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
