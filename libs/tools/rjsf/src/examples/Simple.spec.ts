import { generateSchema } from '../schemaGenerator'
import { Simple } from './Simple'

describe('Simple', () => {
  it('should generate simple example', () => {
    const obj = generateSchema(Simple)

    expect(obj).toMatchObject({
      title: 'A registration form',
      description: 'A simple form example.',
      type: 'object',
      required: ['firstName', 'lastName'],
      properties: {
        firstName: {
          type: 'string',
          title: 'First name',
          default: 'Chuck',
        },
        lastName: {
          type: 'string',
          title: 'Last name',
        },
        telephone: {
          type: 'string',
          title: 'Telephone',
          minLength: 10,
        },
      },
    })
  })
})
