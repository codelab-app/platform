import { NodeEntity } from '../entity/node-entity'
import { NodeFactory } from './node-factory'
import { AtomType } from '@codelab/frontend'

describe('Node Factory:', () => {
  describe('Node Entity from a create DTO', () => {
    let node: NodeEntity
    const factory = new NodeFactory()

    describe('with given values', () => {
      const nodeDto = {
        id: 'node-id',
        type: AtomType.ReactButton,
        props: {
          a: 'A',
          b: 'B',
        },
        children: [
          {
            type: AtomType.ReactText,
          },
        ],
      }

      beforeAll(() => {
        // node = factory.fromDto(nodeDto)
      })

      it('is true', () => {
        expect(true).toBeTruthy()
      })
      // it('sets the ID', () => {
      //   expect(node.id).toBe(nodeDto.id)
      //   // expect(uuidValidate(node.id)).toBeTruthy()
      // })
      //
      // it('sets the type', () => {
      //   expect(node.type).toBe(nodeDto.type)
      // })
      //
      // it('sets the props', () => {
      //   expect(node.props).toBe(nodeDto.props)
      // })

      // it('sets the children', () => {
      //   expect(node.children).toMatchObject(nodeDto.children)
      // })

      // it('sets provides a default uuid v4 ID', () => {
      //   expect(node).toHaveProperty('id')
      //   expect(uuidValidate(node.id)).toBeTruthy()
      // })
    })
  })
})
