import { writeFileSync } from 'fs'

export const generateRootIndex = (filePath: string): void => {
  const indexFileContent = `
        // This file is generated and recreating on every json-schema generation
        export * from './generated'
    `

  writeFileSync(filePath, indexFileContent)
}
