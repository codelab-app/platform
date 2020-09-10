import { Edge } from './edge'

describe('Edge', () => {
  it('sets the edge ID from vertex ID', () => {
    const start = { id: 'A' }
    const end = { id: 'B' }
    const edge = new Edge(start, end)
    const edgeWithID = new Edge(start, end, 'myEdge')

    expect(edge.id).toBe('A_B')
    expect(edgeWithID.id).toBe('myEdge')
  })
})
