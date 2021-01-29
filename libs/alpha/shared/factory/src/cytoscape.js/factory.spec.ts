import {
  e_A,
  e_B,
  e_C,
  e_D,
  input,
  v_0,
  v_1_0,
  v_1_1,
  v_2_0,
  v_2_1,
} from './demo-data'
import { makeCytoscape } from './factory'

describe.skip('Cytoscape factory', () => {
  const cy = makeCytoscape(input)

  it('creates a cytoscape object from input', () => {
    const vertices = cy.nodes().map((ele) => {
      return ele.id()
    })
    const edges = cy.edges().map((ele) => {
      return ele.id()
    })

    expect(vertices).toMatchObject([v_0, v_1_0, v_1_1, v_2_0, v_2_1])
    expect(edges).toMatchObject([e_A, e_B, e_C, e_D])
  })

  it('can traverse graph using BFS', () => {
    const root = cy.elements().roots().first()
    const queue: Array<string> = []
    const expected: Array<string> = [v_0, v_1_0, v_1_1, v_2_0, v_2_1]

    cy.elements().breadthFirstSearch({
      root: `#${root.id()}`,
      visit: (node) => {
        queue.push(node.id())
      },
    })

    expect(queue).toMatchObject(expected)
  })
})
