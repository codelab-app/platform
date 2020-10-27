import { set } from 'lodash'
import { MapData, Mapper } from './mapper-object'
import { cLog } from '@codelab/shared/utils'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const objectMapper = require('object-mapper')

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
      company: [
        {
          key: 'devs',
          transform: (
            sourceValue: any,
            sourceObject: any,
            destinationObject: any,
            destinationKey: any,
          ) => {
            // console.log('sourceValue', sourceValue)
            // console.log('sourceObject', sourceObject)
            // console.log('destinationObject', destinationObject)
            // console.log('destinationKey', destinationKey)

            return sourceValue.devs
          },
        },
      ],
      info: {
        key: 'user',
        transform: (
          sourceValue: any,
          sourceObject: any,
          destinationObject: any,
          destinationKey: any,
        ) => {
          // console.log('sourceValue', sourceValue)
          // console.log('sourceObject', sourceObject)
          // console.log('destinationObject', destinationObject)
          // console.log('destinationKey', destinationKey)

          const userObject = sourceValue.reduce((acc: object, curr: any) => {
            const { key } = curr
            const { value } = curr

            set(acc, key, value)

            return acc
          }, {})

          return userObject.user
        },
      },
    }

    const results = objectMapper(original, mapper)

    cLog(results)

    expect(results).toStrictEqual(expected)
  })
})
