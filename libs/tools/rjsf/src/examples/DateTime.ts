import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Jsf({
  title: 'Alternative',
  description: 'These work on most platforms.',
})
class Alternative {
  @JsfProperty({
    type: 'string',
    format: 'date-time',
  })
  @RjsfUiSchema({
    'ui:widget': 'alt-datetime',
    'ui:options': {
      yearsRange: [1980, 2030],
    },
  })
  declare altDatetime: string

  @JsfProperty({
    type: 'string',
    format: 'date',
  })
  @RjsfUiSchema({
    'ui:widget': 'alt-date',
    'ui:options': {
      yearsRange: [1980, 2030],
    },
  })
  declare altDate: string
}

@Jsf({
  title: 'Native',
  description: 'May not work on some browsers, notably Firefox Desktop and IE.',
})
class Native {
  @JsfProperty({
    type: 'string',
    format: 'date-time',
  })
  declare dateTime: string

  @JsfProperty({
    type: 'string',
    format: 'date',
  })
  declare date: string
}

@Jsf({
  title: 'Date and time widgets',
})
export class DateTime {
  @JsfProperty({
    type: 'object',
    properties: Native
  })
  declare native: Native

  @JsfProperty({
    type: 'object',
    properties: Alternative
  })
  declare alternative: Alternative
}
