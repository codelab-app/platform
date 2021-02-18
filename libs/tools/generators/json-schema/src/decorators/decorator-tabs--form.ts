import { ImportDetails, convertFileToModule } from '../utils/utils'
import { getTabsDecoratorDetails } from './decorator-tabs'

export const getTabsFormProps = (
  symbol: string,
  cls: any,
  sourceFile: string,
): {
  content: string
  formPropsName: string
  imports: Array<ImportDetails>
} | null => {
  const decoratorDetails = getTabsDecoratorDetails(cls)

  if (decoratorDetails === null) {
    return null
  }

  const formPropsName = `${symbol}TabsFormProps`
  const formProps = {
    content: '',
    formPropsName,
    imports: [
      {
        source: '@codelab/tools/generators/json-schema',
        entities: ['ObjectFieldTabsTemplate', 'GroupsUiSchema'],
      },
      {
        source: convertFileToModule(sourceFile),
        entities: [symbol],
      },
    ],
  }

  const UISchemaName = `${symbol}UISchema`

  const UISchemaExport = `const ${UISchemaName}: GroupsUiSchema<${symbol}> = ${JSON.stringify(
    decoratorDetails,
    null,
    2,
  )}`
  const Props = `export const ${formPropsName} = {ObjectFieldTemplate: ObjectFieldTabsTemplate, uiSchema: ${UISchemaName}} \n\n`

  formProps.content = `${UISchemaExport} \n\n ${Props}`

  return formProps
}
