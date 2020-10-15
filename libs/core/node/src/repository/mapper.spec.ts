import { Mapper } from './mapper'

describe('Mapper', () => {
  it('maps from one shape to another', () => {
    const original = {
      data: {
        address: {
          street_1: '2600 Park Ave.',
          street_2: '',
          city: 'New York',
        },
      },
    }
    const expected = {
      address: {
        street: '2600 Park Ave.',
        city: 'New York',
      },
    }
    const map = [
      ['data.address.street_1', 'address.street'],
      ['data.address.city', 'address.city'],
    ]

    const mapper = new Mapper(original, map)

    expect(mapper.execute()).toStrictEqual(expected)
  })
})
