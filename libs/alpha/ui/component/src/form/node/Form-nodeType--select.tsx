import { NodeReactI, nodeTypeEntries } from '@codelab/alpha/shared/interface/node'
import { CodelabForm } from '@codelab/alpha/ui/antd'

export const nodeTypeSelect: NodeReactI = CodelabForm.createSelect({
  label: 'NodeType',
  name: 'nodeType',
  options: nodeTypeEntries,
})
