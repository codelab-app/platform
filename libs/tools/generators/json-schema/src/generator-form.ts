import * as path from 'path'
import { getGridDecoratorDetails } from './decorators/decorator-grid'

export const getFormProps = (
  sourceFilePath: string | undefined = '',
  symbol: string,
): Promise<string> => {
  return (
    import(path.resolve(sourceFilePath))
      // Module is a class here
      .then((module) => {
        const exportedClass = Object.entries(module).find(
          ([name]) => name === symbol,
        )

        if (!exportedClass) {
          return ''
        }

        const [name, cls] = exportedClass
        const decoratorDetails = getGridDecoratorDetails(cls)

        if (decoratorDetails === null) {
          return ''
        }

        const DecoratorsDetailsName = `${symbol}Decorators`

        const DecoratorsExport = `const ${DecoratorsDetailsName}: IDecoratorsMap = ${JSON.stringify(
          decoratorDetails,
          null,
          2,
        )}`
        const Props = `export const ${symbol}FormProps = {ObjectFieldTemplate: ObjectFieldTemplateFactory(${DecoratorsDetailsName})} \n\n`

        return `${DecoratorsExport} \n\n ${Props}`
      })
      .catch((err) => {
        console.log(err)

        return ''
      })
  )
}
