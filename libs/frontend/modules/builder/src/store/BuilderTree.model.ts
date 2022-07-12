import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { Key } from 'react'

@model('@codelab/BuilderTree')
export class BuilderTreeModel extends Model({
  expandedNodeIds: prop<Array<Key>>(() => []),
}) {
  @modelAction
  setExpandedNodeIds(expandedNodeIds: Array<Key>) {
    this.expandedNodeIds = expandedNodeIds
  }

  @computed
  get expandedNodesIds() {
    return this.expandedNodeIds
  }
}
