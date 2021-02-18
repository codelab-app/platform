import { ImportDetails } from '../utils/utils'
import { getGridDecoratorDetails } from './decorator-grid'

export const getGridFormProps = (
  symbol: string,
  cls: any,
  sourceFile: string,
): {
  content: string
  formPropsName: string
  imports: Array<ImportDetails>
} | null => {
  const decoratorDetails = getGridDecoratorDetails(cls)

  if (decoratorDetails === null) {
    return null
  }

  const formPropsName = `${symbol}GridFormProps`
  const gridFormProps = {
    content: '',
    formPropsName,
    imports: [
      {
        source: '@codelab/tools/generators/json-schema',
        entities: ['ObjectFieldGridTemplateFactory', 'DecoratorsMap'],
      },
      // It's more type-safe, but currently, it leads to errors due to types error in places where it is already used
      // for ex. UpdateVertexInput.
      // {
      //   source: convertFileToModule(sourceFile),
      //   entities: [symbol],
      // },
    ],
  }

  const DecoratorsDetailsName = `${symbol}Decorators`

  // const DecoratorsExport = `const ${DecoratorsDetailsName}: DecoratorsMap<${symbol}> = ${JSON.stringify(
  const DecoratorsExport = `const ${DecoratorsDetailsName}: DecoratorsMap = ${JSON.stringify(
    decoratorDetails,
    null,
    2,
  )}`
  const Props = `export const ${formPropsName} = {ObjectFieldTemplate: ObjectFieldGridTemplateFactory(${DecoratorsDetailsName})} \n\n`

  gridFormProps.content = `${DecoratorsExport} \n\n ${Props}`

  return gridFormProps
}
