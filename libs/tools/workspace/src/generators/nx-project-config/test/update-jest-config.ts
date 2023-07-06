import type { ProjectConfiguration, Tree } from '@nx/devkit'
import path from 'path'
import type { Expression, ObjectLiteralExpression } from 'ts-morph'
import tsMorph, { Project } from 'ts-morph'
import { addReportersToJestConfig } from './add-reporters'
import { migrateToSwc } from './migrate-to-swc'

export const updateJestConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const project = new Project()
  const filePath = path.join(projectConfig.root, 'jest.config.ts')
  const sourceFile = project.addSourceFileAtPath(filePath)

  const defaultExportAssignment = sourceFile.getExportAssignment(
    (exp) => !exp.isExportEquals(),
  )

  if (!defaultExportAssignment) {
    throw new Error('Could not find default export in jest.config.ts')
  }

  const configObject = defaultExportAssignment.getExpression()

  if (!tsMorph.Node.isObjectLiteralExpression(configObject)) {
    throw new Error('Default export is not an object literal')
  }

  addReportersToJestConfig(configObject, projectConfig)
  migrateToSwc(configObject, projectConfig)

  tree.write(filePath, sourceFile.getFullText())
}
