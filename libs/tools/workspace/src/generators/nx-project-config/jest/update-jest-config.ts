import type { ProjectConfiguration, Tree } from '@nx/devkit'

import path from 'path'
import { Node, Project } from 'ts-morph'

import { addReportersToJestConfig } from './add-reporters'
import { jestConfig } from './jest-config'

export const updateJestConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const project = new Project()
  const filePath = path.join(projectConfig.root, 'jest.config.ts')

  // console.log(
  //   'Looking for jest.config.ts in',
  //   projectConfig,
  //   filePath,
  //   tree.exists(filePath),
  // )

  if (!tree.exists(filePath)) {
    return
  }

  // Ignore root project has no config
  if (projectConfig.name === 'codelab') {
    return
  }

  const sourceFile = project.addSourceFileAtPath(filePath)

  const defaultExportAssignment = sourceFile.getExportAssignment(
    (exp) => !exp.isExportEquals(),
  )

  if (!defaultExportAssignment) {
    throw new Error('Could not find default export in jest.config.ts')
  }

  const configObject = defaultExportAssignment.getExpression()

  if (!Node.isObjectLiteralExpression(configObject)) {
    throw new Error('Default export is not an object literal')
  }

  addReportersToJestConfig(configObject, projectConfig)

  jestConfig(configObject, projectConfig)

  tree.write(filePath, sourceFile.getFullText())
}
