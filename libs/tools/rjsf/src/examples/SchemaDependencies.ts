import { Jsf } from '../decorators/Jsf'
import { JsfDefinition } from '../decorators/JsfDefinition'
import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Jsf({
  title: 'Person',
  dependencies: {
    doYouHaveAnyPets: {
      oneOf: [
        {
          properties: {
            doYouHaveAnyPets: {
              enum: ['No'],
            },
          },
        },
        {
          properties: {
            doYouHaveAnyPets: {
              enum: ['Yes: One'],
            },
            'How old is your pet?': {
              type: 'number',
            },
          },
          required: ['How old is your pet?'],
        },
        {
          properties: {
            doYouHaveAnyPets: {
              enum: ['Yes: More than one'],
            },
            'Do you want to get rid of any?': {
              type: 'boolean',
            },
          },
          required: ['Do you want to get rid of any?'],
        },
      ],
    },
  },
})
@JsfDefinition({ name: 'person' })
class Person {
  @JsfProperty({
    type: 'string',
    required: true,
    enum: ['No', 'Yes: One', 'Yes: More than one'],
    default: 'No',
  })
  declare doYouHaveAnyPets: string
}

@Jsf({
  title: 'Simple',
  dependencies: {
    credit_card: {
      properties: {
        billing_address: {
          type: 'string',
        },
      },
      required: ['billing_address'],
    },
  },
})
class Simple {
  @JsfProperty({
    type: 'string',
    required: true,
  })
  declare name: string

  @JsfProperty({
    type: 'number',
  })
  @RjsfUiSchema({
    'ui:help':
      'If you enter anything here then billing_address will be dynamically added to the form.',
  })
  declare creditCard: number
}

@Jsf({
  title: 'Schema dependencies',
  description: 'These samples are best viewed without live validation.',
})
export class SchemaDependencies {
  @JsfProperty({
    type: 'object',
    properties: Simple,
  })
  @RjsfUiSchema()
  declare simple: Simple

  @JsfProperty({
    type: 'object',
    properties: Person,
  })
  @RjsfUiSchema()
  declare conditional: Person

  @JsfProperty({
    type: 'array',
    items: Person,
  })
  declare arrayOfConditionals: Array<Person>

  @JsfProperty({
    type: 'array',
    items: [
      {
        title: 'Primary person',
        $ref: Person,
      },
    ],
    additionalItems: {
      title: 'Additional person',
      $ref: Person,
    },
  })
  declare fixedArrayOfConditionals: any
}
