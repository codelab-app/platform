import * as path from 'path'
import * as ts from 'typescript'

export const getTSProgram = (
  fileNames: Array<string>,
  options?: ts.CompilerOptions,
): ts.Program => {
  const configFileName = ts.findConfigFile(
    path.resolve(
      process.cwd(),
      path.resolve('libs/tools/generators/json-schema'),
    ),
    ts.sys.fileExists,
    'tsconfig.json',
  )

  if (!configFileName) {
    throw new Error('Tsconfig file not found!')
  }

  const configFile = ts.readConfigFile(configFileName, ts.sys.readFile)
  const compilerOptions = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    './',
  )

  const program = ts.createProgram(fileNames, compilerOptions.options)

  return program
}
