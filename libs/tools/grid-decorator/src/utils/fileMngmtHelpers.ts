import * as fs from 'fs'
import * as path from 'path'

export const writeFile = (
  decorators: any,
  outputPath: string,
  symbol: string,
): string => {
  const fileContents = `export const ${symbol}Decorators = ${JSON.stringify(
    decorators,
    null,
    2,
  )}`

  console.log(`Saving "${symbol}" to "${outputPath}"...`)

  fs.writeFileSync(outputPath, fileContents)

  return outputPath
}

export const getSymbolDirectory = (
  symbol: string,
  includeFilePatterns: Array<string>,
) => {
  const includeFilePattern = includeFilePatterns.find((pattern) => {
    return pattern.includes(symbol)
  })

  if (!includeFilePattern) {
    throw new Error(
      `${symbol} base directory not found! \nSymbol name must follow [useCase]Input.ts format`,
    )
  }

  return path.dirname(includeFilePattern)
}

export const getOutputFile = (baseDirectory: string, symbol: string) => {
  return path.resolve(baseDirectory, `${symbol}.decorators.generated.ts`)
}
