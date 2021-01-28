import * as path from 'path'
import * as glob from 'glob'
import { getOutputFile, writeFile } from './fileMngmtHelpers'
import { getGridDecoratorDetails } from './gridDecorator'
import { lintFiles } from './lintFiles'

const includeFilePatterns = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
  cwd: process.cwd(),
})

Promise.all(
  includeFilePatterns.map((filePath) =>
    import(path.resolve(filePath))
      .then((module) => {
        let savedFiles: Array<string> = []

        Object.entries(module).forEach(([name, ent]) => {
          const decoratorDetails = getGridDecoratorDetails(ent)

          if (decoratorDetails !== null) {
            // const symbolBasePath = getSymbolDirectory(name, includeFilePatterns)
            const outputFile = getOutputFile(path.dirname(filePath), name)

            const savedFile = writeFile(decoratorDetails, outputFile, name)

            savedFiles = [...savedFiles, savedFile]
          }
        })

        return savedFiles
      })
      .catch((err) => console.log(err)),
  ),
).then((savedFiles) => {
  lintFiles((savedFiles as Array<Array<string>>).flat())
})
