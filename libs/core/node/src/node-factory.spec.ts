import { NodeFactory } from './node-factory'
import { NodeCreateDto } from '@codelab/shared/interface/node'

describe('Node factory', () => {
  it('creates a Node entity from create dto', () => {
    const nodeDto: NodeCreateDto = {
      type: 'React.Button',
    }

    const factory = new NodeFactory()
    const entity = factory.fromDto(nodeDto)
  })
})
