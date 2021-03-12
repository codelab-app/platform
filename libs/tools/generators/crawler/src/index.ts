import { reduce } from 'bluebird'
import * as TJS from 'typescript-json-schema'
import * as glob from 'glob'
import { buildImportString, generateSchemas, getSchemaString } from '@codelab/tools/generators/form-decorator'
import path from 'path';
import { CssPropsSchemaConverter } from './CssPropsSchemaConverter';

const npmLibraryTypesOutputFile = `${process.cwd()}/libs/generated/src/jsonSchema-artonio-grid.generated.ts`

const makeGenerator = (
    tsconfigFile: string,
    includeFilePatterns: Array<string>,
): TJS.JsonSchemaGenerator => {
    const program = TJS.programFromConfig(tsconfigFile, includeFilePatterns)

    const settings: TJS.PartialArgs = {
        ref: false,
        strictNullChecks: true,
    }

    const generator = TJS.buildGenerator(program, settings, includeFilePatterns)

    if (!generator) {
        throw new Error('missing generator')
    }

    return generator
}

const getCssSchemaString = (): string => {

    const tsconfigFile = path.resolve(
        process.cwd(),
        'libs/tools/generators/crawler/tsconfig.css.lib.json',
    )

    const cssProps = glob.sync(
        'libs/tools/generators/json-schema/src/types/*.ts',
        {
            cwd: process.cwd(),
        },
    )
    const cssPropsInputFiles = [...cssProps]
    const generator = makeGenerator(tsconfigFile, cssPropsInputFiles)
    const schema = generator.getSchemaForSymbols(['CSSProperties'], true)

    const schemaConverter = new CssPropsSchemaConverter()
    const convertedSchema = schemaConverter.processSchema(schema)
    const convertedSchemaString = JSON.stringify(convertedSchema, null, 2)
    return `export const CssPropsSchema = ${convertedSchemaString}`
}

const bootstrap = async () => {
    const files = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
    cwd: process.cwd(),
    })

    const res: {schema: any, uiSchema: any, name: string}[] = await reduce(
    files,
    async (acc: {schema: any, uiSchema: any, name: string}[] = [], file) => {
        const module = await import(file)

        const symbolPatterns = [/Props$/, /Input$/]

        const keys = Object.keys(module)
            .filter((name) =>
                // Get only types with *Props or *Input in the export name
                // /Props/.test(name) || /Input/.test(name),
                symbolPatterns.reduce<boolean>((acc, regExp) => {
                    return acc || regExp.test(name)
                }, false),
            )
            .reduce((_moreExportData: any[], symbol: string) => {
                // console.log(`Generating for symbol ${symbol}...`)
                try {
                    const result =  {name: symbol}
                    const schemas = generateSchemas(module[symbol])
                    _moreExportData.push({...result, ...schemas})
                } catch (e) {}
                return [...acc, ..._moreExportData]
            }, acc)

        return acc
    },
    [],
    )

    let schemasString = res.reduce((accu: string, val: {schema: any, uiSchema: any, name: string}) => {

        const schemaString = getSchemaString(val)

        return accu += schemaString
    }, '')

    schemasString += getCssSchemaString()
    const importJsonSchema7 = `import { JSONSchema7 } from 'json-schema';\n`
    schemasString = importJsonSchema7 + buildImportString(schemasString) + schemasString

    require('fs').writeFile(npmLibraryTypesOutputFile, schemasString, (err: any) => {
        if (err) throw err;
    });

}
bootstrap()
