import { JSONSchema7 } from 'json-schema'
import { DemoGridFormInputDecorators } from '../../../../libs/modules/demo-grid-form/src/useCases/DemoGridForm/DemoGridFormInput.decorators.generated'
import { DemoGridFormInputSchema } from '../../../../libs/modules/demo-grid-form/src/useCases/DemoGridForm/DemoGridFormInput.generated'
import { gridFormFactory } from '@codelab/frontend'

const GridFormsExamplePage = () => {
  const schema: JSONSchema7 = DemoGridFormInputSchema as JSONSchema7
  const gridDetails = DemoGridFormInputDecorators

  return gridFormFactory(schema, gridDetails)
}

export default GridFormsExamplePage
