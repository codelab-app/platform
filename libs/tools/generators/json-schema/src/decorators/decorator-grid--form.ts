import { ExportData } from '../utils/utils'
import { getGridDecoratorDetails } from './decorator-grid'

type GetGridFormPropsReturn = ExportData & { formPropsName: string }

export const getGridFormProps = (
  symbol: string,
  cls: any,
  sourceFile: string,
): GetGridFormPropsReturn | null => {
  const decoratorDetails = getGridDecoratorDetails(cls)

  if (decoratorDetails === null) {
    return null
  }

  const formPropsName = `${symbol}GridFormProps`

  const DecoratorsDetailsName = `${symbol}Decorators`

  const DecoratorsExport = `const ${DecoratorsDetailsName}: DecoratorsMap = ${JSON.stringify(
    decoratorDetails,
    null,
    2,
  )}`
  const Props = `export const ${formPropsName} = { ObjectFieldTemplate: ObjectFieldGridTemplateFactory(${DecoratorsDetailsName}) }`

  const gridFormProps: ExportData = {
    content: [DecoratorsExport, Props],
    imports: [
      {
        source: '@codelab/alpha/ui/component',
        entities: ['ObjectFieldGridTemplateFactory'],
      },
      {
        source: '@codelab/tools/generators/json-schema',
        entities: ['DecoratorsMap'],
      },
      // It's more type-safe, but currently, it leads to errors due to types error in places where it is already used
      // for ex. UpdateVertexInput.
      // {
      //   source: convertFileToModule(sourceFile),
      //   entities: [symbol],
      // },
    ],
  }

  return { ...gridFormProps, formPropsName }
}
