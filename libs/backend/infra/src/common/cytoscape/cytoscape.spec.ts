import { Test } from '@nestjs/testing'
import { CytoscapeService } from './cytoscape.service'

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [CytoscapeService],
  }).compile()
})

describe('CytoscapeService', () => {
  it('should initialize cytoscape from dgraph data', () => {
    const data = {}
  })
})
