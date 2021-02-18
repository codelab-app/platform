import { gridDecoratorMetaKey } from '../decorators/decorator-grid'
import { getGridFormProps } from '../decorators/decorator-grid--form'
import { getMetadataKey } from '../decorators/decorator-reflect--class'
import { tabsDecoratorMetaKey } from '../decorators/decorator-tabs'
import { getTabsFormProps } from '../decorators/decorator-tabs--form'
import { ExportData, ImportDetails } from '../utils/utils'

const listOfSupportedDecoratorsKeys = [
  getMetadataKey(gridDecoratorMetaKey),
  getMetadataKey(tabsDecoratorMetaKey),
]

const getListOfDecoratorsKeys = (cls: any): Array<string> => {
  return Reflect.getMetadataKeys(cls).filter((decoratorName) =>
    listOfSupportedDecoratorsKeys.includes(decoratorName),
  )
}

const getConflictedDecorators = (
  listOfDecorators: Array<string>,
): Array<Array<string>> => {
  const conflicts = []

  if (
    listOfDecorators.includes(getMetadataKey(gridDecoratorMetaKey)) &&
    listOfDecorators.includes(getMetadataKey(tabsDecoratorMetaKey))
  ) {
    conflicts.push([
      getMetadataKey(gridDecoratorMetaKey),
      getMetadataKey(tabsDecoratorMetaKey),
    ])
  }

  return conflicts
}

const getDecoratorsConflictErrorMsg = (
  conflicts: Array<Array<string>>,
): string =>
  `Decorators conflicts: ${conflicts
    .map((conflict) => `[${conflict.join(', ')}]`)
    .join('; ')}`

const combineFormProps = (symbol: string, formProps: Array<string>): string =>
  formProps.length > 0
    ? `export const ${symbol}FormProps = {${formProps
        .map((propsName) => `...${propsName}`)
        .join(',')}} \n\n`
    : ''

export const getFormProps = (
  symbol: string,
  cls: any,
  sourceFile: string,
): ExportData => {
  const listDecorators = getListOfDecoratorsKeys(cls)

  const conflictedDecorators = getConflictedDecorators(listDecorators)

  if (conflictedDecorators.length > 0) {
    console.log('------------------------------')
    console.log(
      `WARNING: ${getDecoratorsConflictErrorMsg(conflictedDecorators)}`,
    )
    console.log('------------------------------')
  }

  let content: Array<string> = []
  let imports: Array<ImportDetails> = []
  const formPropsToCombine = []

  if (listDecorators.includes(getMetadataKey(gridDecoratorMetaKey))) {
    const formsProps = getGridFormProps(symbol, cls, sourceFile)

    if (formsProps !== null) {
      formPropsToCombine.push(formsProps.formPropsName)
      content = [...content, formsProps.content]
      imports = [...imports, ...formsProps.imports]
    }
  }

  if (listDecorators.includes(getMetadataKey(tabsDecoratorMetaKey))) {
    const formsProps = getTabsFormProps(symbol, cls, sourceFile)

    if (formsProps !== null) {
      formPropsToCombine.push(formsProps.formPropsName)
      content = [...content, formsProps.content]
      imports = [...imports, ...formsProps.imports]
    }
  }

  return {
    content: [...content, combineFormProps(symbol, formPropsToCombine)],
    imports,
  }
}
