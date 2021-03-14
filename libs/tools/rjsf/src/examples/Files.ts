import { Jsf } from '../decorators/Jsf'
import { JsfProperty } from '../decorators/JsfProperty'
import { RjsfUiSchema } from '../decorators/RjsfUiSchema'

@Jsf({
  title: 'Files',
})
export class Files {
  @JsfProperty({
    type: 'string',
    format: 'data-url',
  })
  declare file: string

  @JsfProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'data-url',
    }
  })
  declare files: any

  @JsfProperty({
    type: 'string',
    format: 'data-url',
    title: 'Single File with Accept attribute',
  })
  @RjsfUiSchema({
    'ui:options': {
      accept: '.pdf',
    },
  })
  declare fileAccept: any
}
