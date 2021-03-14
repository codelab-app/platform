import { Rjsf } from '../decorators/Rjsf'
import { RjsfArrayObject } from '../decorators/RjsfArrayObject'
import { RjsfConditional } from '../decorators/RjsfConditional'
import { RjsfEnum } from '../decorators/RjsfEnum'
import { RjsfObject } from '../decorators/RjsfObject'
import { RjsfProperty } from '../decorators/RjsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Rjsf({
  title: 'Person',
})
class Person {
  @RjsfProperty({
    type: 'string',
    default: 'No',
    required: true,
  })
  @RjsfEnum({
    enum: ['No', 'Yes: One', 'Yes: More than one'],
    noChoiceValue: 'No',
  })
  declare doYouHaveAnyPets: string

  @RjsfProperty({
    type: 'number',
    title: 'How old is your pet?',
    required: true,
  })
  @RjsfConditional({
    key: 'doYouHaveAnyPets',
    value: 'Yes: One',
  })
  declare howOldIsYourPet: number

  @RjsfProperty({
    type: 'boolean',
    title: 'Do you want to get rid of any?',
    required: true,
  })
  @RjsfConditional({
    key: 'doYouHaveAnyPets',
    value: 'Yes: More than one',
  })
  @RjsfUiSchema({
    'ui:widget': 'radio',
  })
  declare doYouWantToGetRidOfAny: string
}

@Rjsf({
  title: 'Simple',
})
class Simple {
  @RjsfProperty({
    type: 'string',
    required: true,
  })
  declare name: string

  @RjsfProperty({
    type: 'number',
  })
  @RjsfUiSchema({
    'ui:help':
      'If you enter anything here then billing_address will be dynamically added to the form.',
  })
  declare creditCard: number

  @RjsfProperty({
    type: 'string',
    required: true,
  })
  @RjsfConditional({
    key: 'creditCard',
  })
  declare billing_address: string
}

@Rjsf({
  title: 'Schema dependencies',
  description: 'These samples are best viewed without live validation.',
})
export class SchemaDependencies {
  @RjsfProperty({
    type: 'object',
  })
  @RjsfObject(Simple)
  @RjsfUiSchema()
  declare simple: Simple

  @RjsfProperty({
    type: 'object',
  })
  @RjsfObject(Person)
  @RjsfUiSchema()
  declare conditional: Person

  @RjsfProperty({
    type: 'array',
  })
  @RjsfArrayObject({
    clazz: Person,
  })
  declare arrayOfConditionals: Array<Person>

  // 	@RjsfProperty({
  // 		type: 'array',
  // 	})
  // 	@RjsfArrayObject({
  // 		clazz: Person,
  // 		isFixedItem: true
  // 	})
  // 	declare fixedArrayOfConditionals: any
}
