import type { ProjectConfiguration, Tree } from '@nx/devkit'
import {
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'
import get from 'lodash/get'
import has from 'lodash/has'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import set from 'lodash/set'
import path from 'path'
import tsMorph, { Project } from 'ts-morph'

export const addReportersToJestConfig = (
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

  const reportersProperty = configObject.getProperty('reporters')

  const newInitializer = `
  [
    'default',
    [
      'jest-junit',
      {
        outputName: '${projectConfig.name}.xml',
        reportTestSuiteErrors: true,
      }
    ]
  ]`

  if (!reportersProperty) {
    // add the reporters property if it doesn't exist
    configObject.addPropertyAssignment({
      initializer: newInitializer,
      name: 'reporters',
    })
  } else if (tsMorph.Node.isPropertyAssignment(reportersProperty)) {
    // if the reporters property exists and is a PropertyAssignment, update it
    reportersProperty.setInitializer(newInitializer)
  }

  tree.write(filePath, sourceFile.getFullText())
}
