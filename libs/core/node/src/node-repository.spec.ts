import axios from 'axios'
import { NodeRepository } from './node-repository'
import { NodeCreateDto } from '@codelab/shared/interface/node'

describe('Node repository', () => {
  const repo = new NodeRepository()

  it('can save a node given a create dto', () => {
    const spy = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: [] })

    const data: NodeCreateDto = {
      type: 'React.Button',
    }
    const results = repo.save<NodeCreateDto>(data)

    expect(spy).toHaveBeenCalled()
    expect(results).resolves.toEqual({ data: [] })
  })

  it('can get a node dto by ID', () => {
    const spy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] })

    const id = 'my-node'
    const results = repo.get(id)

    expect(spy).toHaveBeenCalled()
    expect(results).resolves.toEqual({ data: [] })
  })
})
