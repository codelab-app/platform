import type { ProjectConfiguration } from '@nx/devkit'
import type { ObjectLiteralExpression } from 'ts-morph'
import tsMorph, { Project } from 'ts-morph'

export const migrateToSwc = (
  configObject: ObjectLiteralExpression,
  projectConfig: ProjectConfiguration,
) => {
  const transformProperty = configObject.getProperty('transform')

  const newInitializer = `
  {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true, decorators: true },
          transform: {
            decoratorMetadata: true,
            react: { runtime: 'automatic' }
          },
        },
      },
    ],
  }
  `

  if (!transformProperty) {
    // add the reporters property if it doesn't exist
    configObject.addPropertyAssignment({
      initializer: newInitializer,
      name: 'transform',
    })
  } else if (tsMorph.Node.isPropertyAssignment(transformProperty)) {
    // if the reporters property exists and is a PropertyAssignment, update it
    transformProperty.setInitializer(newInitializer)
  }
}
