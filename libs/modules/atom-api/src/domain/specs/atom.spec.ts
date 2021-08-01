import { isLeft } from 'fp-ts/lib/Either'
import { AtomTypeEnum } from '../../infrastructure/atom-type.model'
import { AtomC } from '../codec/atom.codec'

describe('Atom', () => {
  it('hydrates into an entity', () => {
    const atom = AtomC.decode({
      id: '0x01',
      label: 'Button',
      type: AtomTypeEnum.AntDesignButton,
    })

    if (isLeft(atom)) {
      throw new Error('Incorrect')
    }

    const results = atom.right

    expect(results).toMatchObject({
      id: '0x01',
      label: 'Button',
      type: 'AntDesignButton',
    })
  })

  // it('serialized into JSON', () => {})
})
