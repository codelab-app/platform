import { NodeReactI, nodeTypeEntries } from '@codelab/shared/interface/node'
import { CodelabForm } from '@codelab/ui/antd'

export const nodeTypeSelect: NodeReactI = CodelabForm.createSelect({
  label: 'NodeType',
  name: 'nodeType',
  options: nodeTypeEntries,
})
