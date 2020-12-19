import { writeFile } from 'fs'
import { join, resolve } from 'path'
import * as TJS from 'typescript-json-schema'

// NOTE: to run script you can use:
// `yarn generate-antd-json-schema`

enum ComponentTypeEnum {
  'button' = 'BaseButtonProps',
}

const outputRoot = resolve(
  `./libs/alpha/ui/component/src/form/graph/json-schemas/`,
)

const ComponentsTypes = Object.keys(ComponentTypeEnum)

const settings: TJS.PartialArgs = {
  required: true,
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
  const { properties, definitions, ...rest } = definition

  const propertiesWithoutReact = Object.keys(properties).reduce((acc, curr) => {
    const prop = properties[curr]

    if ((prop as any)?.$ref?.includes('React')) {
      return acc
    }

    return { ...acc, [curr]: prop }
  }, {})

  const definitionsWithoutReact = Object.keys(definitions).reduce(
    (acc, curr) => {
      if (curr.includes('React')) {
        return acc
      }

      return { ...acc, [curr]: definitions[curr] }
    },
    {},
  )

  return {
    ...rest,
    definitions: {
      ...definitionsWithoutReact,
    },
    properties: {
      ...propertiesWithoutReact,
    },
  }
}

ComponentsTypes.forEach((cType) => {
  const buttonPropsSchema = generator.getSchemaForSymbol(
    ComponentTypeEnum[cType],
  )

  const buttonPropsSchemaWithoutReact = cleanReactDependencies(
    buttonPropsSchema,
  )

  writeFile(
    join(outputRoot, `${cType}PropsSchema.json`),
    JSON.stringify(buttonPropsSchemaWithoutReact, null, 2),
    (err) => {
      if (err) {
        console.log(err)
      }
    },
  )
})
