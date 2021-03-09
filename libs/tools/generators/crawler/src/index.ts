// import P from 'bluebird'
import { reduce } from 'bluebird'
import * as glob from 'glob'
import * as path from 'path'

import { buildImportString, generateSchemas, getSchemaString } from '@codelab/tools/generators/form-decorator'
import { RjsfGridFieldTemplate } from '@codelab/tools/generators/form-templates'
import { UpdateVertexInput } from '../../../../modules/graph/src/core/application/useCases/updateVertex/UpdateVertexInput';


const bootstrap = async () => {
  const files = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
  // const files = glob.sync('libs/modules/**/useCases/**/UpdateVertexInput.ts', {
    cwd: process.cwd(),
  })

    const npmLibraryTypesOutputFile = `${process.cwd()}/libs/generated/src/jsonSchema-artonio-grid.generated.ts`



  // 1) Reduce exports to single file
  // 2) Should work for normal tsed decorators as well
  // 3) form-decorator should only generate schema, creating exports & merging into single file we'll do here
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
                    return [...acc, ..._moreExportData]
                    // console.log(schema)
                } catch (e) {}
                return [...acc, ..._moreExportData]
            }, acc)
        const aa = ''

    acc.length > 0 ? console.log('acc: ', acc): ''
    return acc
    },
    [],
  )

    let schemasString = res.reduce((accu: string, val: {schema: any, uiSchema: any, name: string}) => {

        const schemaString = getSchemaString({schema: val.schema, uiSchema: val.uiSchema}, val.name)

        return accu += schemaString
    }, '')

    schemasString = buildImportString(schemasString) + schemasString

    require('fs').writeFile(npmLibraryTypesOutputFile, schemasString, (err: any) => {
        if (err) throw err;
    });

    const aaa = ''
}

bootstrap()
