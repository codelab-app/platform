import * as path from 'path'
import { getGridDecoratorDetails } from './decorators/gridDecorator'

export const getFormProps = (
  sourceFilePath: string,
  symbol: string,
): Promise<string> => {
  return import(path.resolve(sourceFilePath as string))
    .then((module) => {
      const exportedEntity = Object.entries(module).find(
        ([name]) => name === symbol,
      )

      if (exportedEntity === undefined) {
        return ''
      }

      const [name, ent] = exportedEntity

      const decoratorDetails = getGridDecoratorDetails(ent)

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
}
