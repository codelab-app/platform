import objectMapper from 'object-mapper'

describe('Mapper', () => {
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
        ) =>
          sourceValue.map(({ key, value }) =>
            objectMapper.setKeyValue(destinationObject, key, value),
          ),
      },
    }

    const results = objectMapper(original, mapper)

    expect(results).toStrictEqual(expected)
  })
})
