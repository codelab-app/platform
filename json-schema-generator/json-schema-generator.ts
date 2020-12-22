import { writeFile } from 'fs'
import { join, resolve } from 'path'
import { pipe } from 'ramda'
import { getAntdPropsNames } from './generate-props-names'
import * as TJS from 'typescript-json-schema'

// NOTE: to run script you can use:
// `yarn generate-antd-json-schema`

const outputRoot = resolve(
  `./libs/alpha/ui/component/src/form/graph/json-schemas/`,
)

const settings: TJS.PartialArgs = {
  required: true,
  ref: false,
}

const compilerOptions = {
  skipLibCheck: true,
}

const program = TJS.getProgramFromFiles(
  [resolve('./node_modules/antd/lib/index.d.ts')],
  compilerOptions,
)
const generator = TJS.buildGenerator(program, settings)

const cleanReactDependencies = (definition: TJS.Definition): TJS.Definition => {
  const { properties, required = [], ...rest } = definition

  const [nextRequired, nexProperties] = Object.keys(properties).reduce(
    (acc, curr) => {
      const prop = properties[curr]
      const [accRequired, accProperties] = acc

      if ((prop as any)?.$ref?.includes('React')) {
        // if we filter some props, we should be sure that they will be excluded from 'required'
        return [
          accRequired.filter((propName) => propName !== curr),
          accProperties,
        ]
      }

      return [accRequired, { ...accProperties, [curr]: prop }]
    },
    [required, {}],
  )

  return {
    ...rest,
    required: [...nextRequired],
    properties: {
      ...nexProperties,
    },
  }
}

const cleanStyleDependencies = (definition: TJS.Definition): TJS.Definition => {
  const { properties, ...rest } = definition
  const { style, ...restProperties } = properties
  return {
    ...rest,
    properties: {
      ...restProperties,
    },
  }
}

const componentsWithErrors = [
  'CarouselProps',
  'DatePickerProps',
  'DrawerProps',
  'DropdownProps',
  'FormProps',
  'GridProps',
  'IconProps',
  'ImageProps',
  'LayoutProps'
]

getAntdPropsNames().forEach((typeName) => {
  if (componentsWithErrors.includes(typeName)) {
    return
  }
  console.log(typeName)
  const propsSchema = pipe(
    (symbol: string) => generator.getSchemaForSymbol(symbol),
    cleanReactDependencies,
    cleanStyleDependencies,
  )(typeName)

  writeFile(
    join(outputRoot, `${typeName}Schema.json`),
    JSON.stringify(propsSchema, null, 2),
    (err) => {
      if (err) {
        console.log(err)
      }
    },
  )
})
