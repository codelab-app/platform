import type { ProjectConfiguration } from '@nx/devkit'
import type { ObjectLiteralExpression } from 'ts-morph'
import tsMorph from 'ts-morph'

export const addReportersToJestConfig = (
  configObject: ObjectLiteralExpression,
  projectConfig: ProjectConfiguration,
) => {
  const reportersProperty = configObject.getProperty('reporters')

  const newInitializer = `
  [
    'default',
    [
      'jest-junit',
      {
        outputName: '${projectConfig.name}.xml',
        reportTestSuiteErrors: true,
        titleTemplate: '{classname} > {title}',
        ancestorSeparator: ' › ',
        classNameTemplate: '{displayName} > {filename}'
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
}
