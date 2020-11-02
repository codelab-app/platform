import objectMapper from 'object-mapper'
import { MapData, Mapper } from './mapper-object'

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
    const map: Array<MapData> = [
      ['data.address.street_1', 'address.street'],
      ['data.address.city', 'address.city'],
    ]

    const mapper = new Mapper(original, map)

    expect(mapper.execute()).toStrictEqual(expected)
  })

  it('maps from one object to another', () => {
    const original = {
      company: {
        devs: [
          {
            firstname: 'Webber',
            lastname: 'Wang',
          },
          {
            firstname: 'Vien',
            lastname: 'Nguyen',
          },
        ],
      },
      info: [
        {
          key: 'user.address.number',
          value: '1200',
        },
        {
          key: 'user.address.street',
          value: 'Park ave.',
        },
      ],
    }

    const expected = {
      devs: [
        {
          firstname: 'Webber',
          lastname: 'Wang',
        },
        {
          firstname: 'Vien',
          lastname: 'Nguyen',
        },
      ],
      user: { address: { number: '1200', street: 'Park ave.' } },
    }

    const mapper = {
      'company.devs': 'devs',
      info: {
        transform: (
          sourceValue: Array<any>,
          sourceObject: any,
          destinationObject: any,
        ) => {
          sourceValue.map(({ key, value }) =>
            objectMapper.setKeyValue(destinationObject, key, value),
          )
        },
      },
    }

    const results = objectMapper(original, mapper)

    expect(results).toStrictEqual(expected)
  })
})
